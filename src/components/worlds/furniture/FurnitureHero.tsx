"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { EASE, Counter } from "@/components/worlds/shared/motion";
import { FINISHES } from "@/data/furniture";
import Mosaic from "./Mosaic";

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
      <motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1, delay, ease: EASE }}>
        {children}
      </motion.span>
    </span>
  );
}

export default function FurnitureHero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const copyO = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const stageY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-bg pt-28 sm:pt-32">
      {/* Backdrop: drafting grid + brand glow, same language as the smart-home hero */}
      <div
        className="arch-grid pointer-events-none absolute inset-0 -z-10 opacity-80"
      />
      <div className="pointer-events-none absolute right-[-15%] top-[5%] -z-10 h-[75vh] w-[65vw] rounded-full blur-3xl" style={{ background: "radial-gradient(closest-side, rgba(99,102,241,0.18), transparent 70%)" }} />
      <div className="pointer-events-none absolute left-[-10%] bottom-[-10%] -z-10 h-[50vh] w-[40vw] rounded-full blur-3xl" style={{ background: "radial-gradient(closest-side, rgba(6,182,212,0.14), transparent 70%)" }} />

      <div className="mx-auto grid max-w-[1400px] items-center gap-8 px-5 pb-16 sm:px-8 lg:min-h-[calc(100dvh-8rem)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:pb-20">
        {/* Copy */}
        <motion.div style={{ y: copyY, opacity: copyO }} className="relative z-10">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }} className="label flex items-center gap-3 text-hi">
            <span className="h-px w-10 bg-hi" />
            Solid ash · Seven finishes · Made to order
          </motion.p>

          <h1 className="font-serif mt-6 text-[3.2rem] font-medium leading-[0.95] tracking-[-0.02em] sm:text-6xl lg:text-[5.6rem]">
            <Line delay={0.35}>Furniture that</Line>
            <Line delay={0.45}>
              moves like <em className="brass not-italic">architecture.</em>
            </Line>
          </h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.9, ease: EASE }} className="mt-7 max-w-lg text-lg leading-relaxed text-muted">
            Six collections conceived by architects and hand-built by Indian artisans. Work tables, beds, storage and seating in stained ash — each piece made for you, in your finish, delivered anywhere in India.
          </motion.p>

          {/* Seven finishes, previewed live further down the page */}
          <motion.a
            href="#craft"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.9, ease: EASE }}
            className="group mt-8 inline-flex items-center gap-4 rounded-full border border-line bg-panel/70 py-2 pl-2 pr-4 backdrop-blur transition-colors hover:border-text"
          >
            <span className="flex -space-x-1.5">
              {FINISHES.map((f) => (
                <span key={f.name} className="h-6 w-6 rounded-full ring-2 ring-panel" style={{ background: `linear-gradient(135deg, ${f.hex}, color-mix(in srgb, ${f.hex} 70%, black))` }} />
              ))}
            </span>
            <span className="text-xs font-semibold">Seven stains · preview any piece</span>
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </motion.a>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.9, ease: EASE }} className="mt-8 flex flex-wrap gap-3">
            <a href="#collections" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-fg shadow-[0_18px_40px_-18px_rgba(79,70,229,0.7)] transition-transform hover:-translate-y-0.5">
              The collections
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
            </a>
            <a href="#pieces" className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/70 px-6 py-3.5 text-sm font-semibold backdrop-blur transition-colors hover:border-text">
              All 22 pieces
            </a>
          </motion.div>

          <motion.dl initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.9, ease: EASE }} className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6">
            {[
              { v: 6, s: "", l: "collections" },
              { v: 22, s: "", l: "pieces, made to order" },
              { v: 50, s: " days", l: "from order to your door" },
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

        {/* Living mosaic of the pieces */}
        <motion.div style={{ y: stageY }} className="relative">
          <Mosaic />
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }} className="pointer-events-none absolute bottom-6 right-6 hidden items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-muted lg:flex">
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span className="absolute left-0 top-0 h-4 w-px bg-accent" animate={{ y: [-16, 40] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />
        </span>
      </motion.div>
    </section>
  );
}
