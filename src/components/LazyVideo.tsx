"use client";

import { useEffect, useImperativeHandle, useRef, useState, type ComponentProps, type Ref } from "react";

type Props = ComponentProps<"video"> & {
  /** Distance from the viewport at which the file starts downloading. */
  margin?: string;
  ref?: Ref<HTMLVideoElement>;
};

/**
 * A <video> that costs nothing until it is about to be seen. The src is only
 * attached once the element is within `margin` of the viewport, so a page
 * with several clips never downloads them all on load. Autoplay is honoured
 * once the source is attached; everything else passes straight through.
 */
export default function LazyVideo({ src, margin = "400px", autoPlay, ref, ...rest }: Props) {
  const inner = useRef<HTMLVideoElement>(null);
  const [live, setLive] = useState(false);

  useImperativeHandle(ref, () => inner.current as HTMLVideoElement);

  useEffect(() => {
    const el = inner.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      const t = setTimeout(() => setLive(true), 0);
      return () => clearTimeout(t);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLive(true);
          io.disconnect();
        }
      },
      { rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  useEffect(() => {
    const el = inner.current;
    if (!live || !el || !autoPlay) return;
    const p = el.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, [live, autoPlay]);

  return <video ref={inner} src={live ? src : undefined} preload={live ? "auto" : "none"} autoPlay={live ? autoPlay : undefined} {...rest} />;
}
