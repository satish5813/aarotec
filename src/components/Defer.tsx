"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Renders its children only once the placeholder scrolls near the viewport.
 * Pair with a `next/dynamic` import so the section's JavaScript, images and
 * video stay out of the first load entirely.
 */
export default function Defer({
  children,
  minHeight = "60vh",
  margin = "600px",
  id,
}: {
  children: ReactNode;
  minHeight?: string;
  margin?: string;
  /** Anchor id the real section will carry, so in-page links resolve before it loads. */
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || show) return;
    if (!("IntersectionObserver" in window)) {
      // Very old browsers: load on the next tick rather than inside the effect body.
      const t = setTimeout(() => setShow(true), 0);
      return () => clearTimeout(t);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin, show]);

  return show ? <>{children}</> : <div ref={ref} id={id} style={{ minHeight }} aria-hidden="true" />;
}
