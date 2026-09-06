"use client";

import LazyVideo from "./LazyVideo";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const VIDEO =
  "https://whitelion-assets.blr1.cdn.digitaloceanspaces.com/website/home/bedroom_animation.mp4";
const POSTER =
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=55";

const SLIDES = [
  {
    label: "Lights Control",
    copy: "Walk in and the room lights up — no fumbling for switches in the dark.",
    align: "right",
  },
  {
    label: "Fan Control",
    copy: "Dial in the perfect breeze without ever leaving the bed.",
    align: "left",
  },
  {
    label: "Curtain Control",
    copy: "Wake to daylight — the curtains glide open right on schedule.",
    align: "right",
  },
  {
    label: "Climate Control",
    copy: "The room settles to your ideal temperature before you even ask.",
    align: "left",
  },
] as const;

const DURATION = 6000;

export default function FeatureReel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = (i: number) => {
    const next = (i + SLIDES.length) % SLIDES.length;
    const track = trackRef.current;
    if (track) {
      const child = track.children[next] as HTMLElement | undefined;
      if (child)
        track.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
    }
    setIndex(next);
  };

  // autoplay
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => goTo(index + 1), DURATION);
    return () => clearTimeout(t);
  }, [index, paused]);

  // keep index in sync with manual scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const center = track.scrollLeft + track.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        Array.from(track.children).forEach((c, i) => {
          const el = c as HTMLElement;
          const mid = el.offsetLeft + el.offsetWidth / 2;
          const d = Math.abs(mid - center);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        setIndex(best);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className="relative w-full bg-bg py-16 lg:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto mb-10 max-w-7xl px-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] brand-text">
          Experience it live
        </p>
        <h2 className="font-display mt-3 max-w-2xl text-4xl font-bold sm:text-5xl">
          One room. Total control.
        </h2>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-3 lg:px-[max(1.5rem,calc((100vw-84rem)/2))]"
      >
        {SLIDES.map((s, i) => (
          <div
            key={s.label}
            className="relative aspect-[4/5] w-[88vw] shrink-0 snap-center overflow-hidden rounded-3xl bg-black sm:aspect-[16/9] lg:w-[min(1180px,90vw)]"
          >
            <LazyVideo
              src={VIDEO}
              poster={POSTER}
              muted
              loop
              autoPlay
              playsInline
              className="h-full w-full object-cover"
            />
            {/* legibility vignette */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/30" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                index === i ? { opacity: 1, y: 0 } : { opacity: 0.35, y: 12 }
              }
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`absolute bottom-6 w-[78%] max-w-sm rounded-3xl border border-white/15 bg-white/10 p-6 text-center backdrop-blur-md sm:bottom-10 ${
                s.align === "left"
                  ? "left-4 sm:left-10"
                  : "right-4 sm:right-10"
              }`}
            >
              <p className="font-display text-2xl font-semibold text-white sm:text-3xl">
                {s.label}
              </p>
              <p className="mt-2 text-sm font-light italic leading-snug text-white/85 sm:text-base">
                {s.copy}
              </p>
            </motion.div>
          </div>
        ))}
      </div>

      {/* sticky pro control bar */}
      <div className="sticky bottom-6 z-20 mt-8 flex justify-center">
        <div className="card-shadow flex items-center gap-4 rounded-full border border-line bg-panel/90 p-2 backdrop-blur">
          <button
            onClick={() => goTo(0)}
            aria-label="Replay from start"
            className="grid h-12 w-12 place-items-center rounded-full bg-bg-soft transition hover:bg-bg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>

          <div className="flex items-center gap-2.5 px-4">
            {SLIDES.map((s, i) => (
              <button
                key={s.label}
                onClick={() => goTo(i)}
                aria-label={`Go to ${s.label}`}
                className="relative h-2.5 overflow-hidden rounded-full bg-line transition-all"
                style={{ width: index === i ? 44 : 10 }}
              >
                {index === i && (
                  <motion.span
                    key={`${index}-${paused}`}
                    className="brand-gradient absolute inset-0 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: paused ? 0 : 1 }}
                    transition={{
                      duration: paused ? 0 : DURATION / 1000,
                      ease: "linear",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
