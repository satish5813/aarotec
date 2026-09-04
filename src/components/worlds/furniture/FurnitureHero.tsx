"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { EASE } from "@/components/worlds/shared/motion";

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function FurnitureHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="grain relative isolate min-h-screen overflow-hidden">
      {/* Image */}
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
          className="absolute inset-0"
        >
          <Image src="/furniture/loop-work-table-1.webp" alt="Loop work table in walnut" fill preload sizes="100vw" className="object-cover object-[65%_center]" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40" />
        <div className="vignette absolute inset-0" />
      </motion.div>

      <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col justify-end px-5 pb-16 pt-32 sm:px-8 sm:pb-24">
        <motion.div style={{ y: textY, opacity: fade }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="label flex items-center gap-3 text-hi"
          >
            <span className="h-px w-10 bg-hi" />
            Solid ash · Seven finishes · Made to order
          </motion.p>

          <h1 className="font-serif mt-6 text-[3.4rem] font-medium leading-[0.95] tracking-[-0.02em] sm:text-7xl lg:text-[7rem]">
            <Line delay={0.35}>Furniture that</Line>
            <Line delay={0.45}>
              moves like <em className="brass not-italic">architecture.</em>
            </Line>
          </h1>

          <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.9, ease: EASE }}
              className="max-w-lg text-lg leading-relaxed text-muted"
            >
              Six collections conceived by architects and hand-built by Indian artisans. Work tables, beds, storage and seating in stained ash — each piece made for you, in your finish, and delivered anywhere in India.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.9, ease: EASE }}
              className="flex flex-wrap gap-3"
            >
              <a href="#collections" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-fg transition-transform hover:-translate-y-0.5">
                The collections
              </a>
              <a href="#pieces" className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-semibold backdrop-blur transition-colors hover:border-accent">
                All 22 pieces
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="pointer-events-none absolute bottom-6 right-6 hidden items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-muted sm:flex"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute left-0 top-0 h-4 w-px bg-accent"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
