"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { EASE, Counter } from "@/components/worlds/shared/motion";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});

function Word({ children, delay }: { children: string; delay: number }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function PowerHero() {
  const ref = useRef<HTMLElement>(null);

  // Cursor parallax
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const spring = { stiffness: 60, damping: 18, mass: 0.7 };
  const px = useSpring(useTransform(mx, [0, 1], [18, -18]), spring);
  const py = useSpring(useTransform(my, [0, 1], [12, -12]), spring);
  const rx = useSpring(useTransform(my, [0, 1], [4, -4]), spring);
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), spring);
  const chipX = useSpring(useTransform(mx, [0, 1], [-14, 14]), spring);
  const chipY = useSpring(useTransform(my, [0, 1], [-10, 10]), spring);

  // Scroll parallax: the product drifts up and the copy fades as you leave
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const prodY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  // Live "charge" read-out that climbs to 100 then holds
  const [pct, setPct] = useState(12);
  useEffect(() => {
    let raf = 0;
    const start = performance.now() + 1200;
    const tick = (t: number) => {
      const p = Math.min(1, Math.max(0, (t - start) / 3200));
      const eased = 1 - Math.pow(1 - p, 3);
      setPct(Math.round(12 + 88 * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      className="relative isolate overflow-hidden pt-28 sm:pt-32"
    >
      {/* Engineering grid that fades toward the edges */}
      <div
        className="grid-paper pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{ maskImage: "radial-gradient(ellipse 70% 60% at 65% 45%, #000 20%, transparent 75%)", WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 65% 45%, #000 20%, transparent 75%)" }}
      />
      {/* Volt glow behind the product */}
      <div className="pointer-events-none absolute right-[-10%] top-[10%] -z-10 h-[70vh] w-[60vw] rounded-full blur-3xl" style={{ background: "radial-gradient(closest-side, var(--glow), transparent 70%)" }} />

      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 pb-16 sm:px-8 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pb-24">
        {/* Copy */}
        <motion.div style={{ opacity: copyOpacity, y: copyY }} className="relative z-10">
          <motion.p {...rise(0.1)} className="label flex items-center gap-3 text-hi">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-hi" />
            </span>
            Portable power stations · Hyderabad &amp; pan-India
          </motion.p>

          <h1 className="font-display mt-6 text-[2.9rem] font-extrabold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-[5.4rem]">
            <Word delay={0.2}>The</Word> <Word delay={0.27}>power</Word> <Word delay={0.34}>cut</Word>
            <br />
            <span className="volt"><Word delay={0.45}>ends</Word> <Word delay={0.52}>here.</Word></span>
          </h1>

          <motion.p {...rise(0.7)} className="mt-7 max-w-lg text-lg leading-relaxed text-muted">
            Silent, fume-free battery backup that lives on a shelf, recharges from any socket in about an hour and takes over in under ten milliseconds. No wiring, no installer, no generator.
          </motion.p>

          <motion.div {...rise(0.85)} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#range" className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-fg shadow-[0_18px_40px_-18px_rgba(15,21,18,0.7)] transition-transform hover:-translate-y-0.5">
              Explore the range
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
            </a>
            <a href="#runtime" className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/70 px-6 py-3.5 text-sm font-semibold backdrop-blur transition-colors hover:border-text">
              How long will it run?
            </a>
          </motion.div>

          <motion.dl {...rise(1)} className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6">
            {[
              { v: 56, s: " min", l: "to a full charge" },
              { v: 4000, s: "+", l: "charge cycles" },
              { v: 10, s: " ms", l: "UPS switchover" },
            ].map((s) => (
              <div key={s.l}>
                <dt className="font-mono text-2xl font-medium tracking-tight sm:text-3xl">
                  <Counter to={s.v} suffix={s.s} />
                </dt>
                <dd className="mt-1 text-xs text-muted">{s.l}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Stage */}
        <motion.div style={{ y: prodY }} className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.35, ease: EASE }}
            style={{ x: px, y: py, rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
            className="cutout relative aspect-square"
          >
            <Image
              src="/power/delta-3-1.webp"
              alt="DELTA 3 portable power station"
              fill
              preload
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-contain"
            />
          </motion.div>

          {/* Floating chips */}
          <motion.div style={{ x: chipX, y: chipY }} className="pointer-events-none absolute inset-0">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.7, ease: EASE }} className="float absolute left-[2%] top-[14%] rounded-2xl border border-line bg-panel/85 px-4 py-3 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.5)] backdrop-blur">
              <p className="label text-muted">Output</p>
              <p className="font-mono mt-1 text-xl font-medium">1,800 W</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25, duration: 0.7, ease: EASE }} className="float absolute right-[0%] top-[30%] rounded-2xl border border-line bg-panel/85 px-4 py-3 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.5)] backdrop-blur [animation-delay:-2s]">
              <p className="label text-muted">Noise</p>
              <p className="font-mono mt-1 text-xl font-medium">30 dB</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.7, ease: EASE }} className="float absolute bottom-[8%] left-[8%] w-56 rounded-2xl border border-line bg-panel/90 px-4 py-3 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.5)] backdrop-blur [animation-delay:-4s]">
              <div className="flex items-center justify-between">
                <p className="label text-muted">Charging</p>
                <p className="font-mono text-sm font-medium">{pct}%</p>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-bg-2">
                <div className="h-full rounded-full bg-accent-2 transition-[width] duration-200" style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-1.5 text-[11px] text-muted">{pct >= 100 ? "Ready for the next outage" : "X-Stream fast charge"}</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
