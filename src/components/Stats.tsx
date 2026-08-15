"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import Reveal from "./Reveal";

type Stat = {
  value: number;
  suffix: string;
  label: string;
  sub: string;
  accent: string;
  icon: ReactNode;
};

const STATS: Stat[] = [
  {
    value: 45,
    suffix: "+",
    label: "Cities connected",
    sub: "Across the country",
    accent: "var(--blue)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
        <path d="M3 21h18M5 21V7l5-3 5 3v14M9 9h2m-2 4h2m-2 4h2m4-8h2m-2 4h2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: 120,
    suffix: "k+",
    label: "Happy customers",
    sub: "Homes running daily",
    accent: "var(--violet)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 10v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: 9,
    suffix: "+",
    label: "Years of innovation",
    sub: "Shipping since 2017",
    accent: "var(--amber)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
        <path d="M12 2v4m0 12v4m10-10h-4M6 12H2m15.07-5.07-2.83 2.83M9.76 14.24l-2.83 2.83m10.14 0-2.83-2.83M9.76 9.76 6.93 6.93M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: 99.9,
    suffix: "%",
    label: "Network uptime",
    sub: "Always-on cloud",
    accent: "var(--blue)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
        <path d="M5 12.5 9 16l10-9.5M2 13a10 10 0 0 1 17-7M22 11a10 10 0 0 1-17 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const dur = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  const display = Number.isInteger(value) ? Math.round(n) : n.toFixed(1);

  return (
    <span ref={ref} className="font-display text-4xl font-bold sm:text-5xl">
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section id="about" className="relative overflow-hidden border-y border-line bg-bg-soft py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-240 -translate-x-1/2 rounded-full bg-violet/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue">
              By the numbers
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold sm:text-4xl">
              Trusted in homes everywhere
            </h2>
            <p className="mt-4 text-muted">
              A decade of building reliable, connected living — measured in the
              homes, cities and uptime our customers count on every day.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="card-shadow group relative h-full overflow-hidden rounded-3xl border border-line bg-panel p-6"
              >
                <span
                  className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: s.accent }}
                  aria-hidden
                />
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-bg-soft [&_svg]:h-5 [&_svg]:w-5"
                  style={{ color: s.accent }}
                >
                  {s.icon}
                </div>

                <div className="mt-6 text-gradient">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>

                <p className="mt-2 text-sm font-semibold">{s.label}</p>
                <p className="mt-0.5 text-xs text-muted">{s.sub}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
