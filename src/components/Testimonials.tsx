"use client";

import { motion } from "motion/react";
import Reveal from "./Reveal";
import AnimatedHeading from "./AnimatedHeading";
import { TESTIMONIALS, type Testimonial } from "@/lib/testimonials";

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5 text-amber"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} aria-hidden="true" className={i <= rating ? "" : "opacity-25"}>
          ★
        </span>
      ))}
    </div>
  );
}

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="card-shadow w-[340px] shrink-0 rounded-3xl border border-line bg-panel p-7">
      <Stars rating={t.rating} />
      <blockquote className="mt-4 text-sm leading-relaxed text-text">
        “{t.text}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet to-blue text-sm font-semibold text-white">
          {t.name.charAt(0)}
        </span>
        <div>
          <div className="text-sm font-semibold">{t.name}</div>
          <div className="text-xs text-muted">{t.city}</div>
        </div>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  // Duplicated once so the marquee loops seamlessly at -50%.
  const row = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="bg-bg-soft">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber">
            Loved at home
          </p>
        </Reveal>
        <AnimatedHeading
          text="Customer Reviews"
          className="font-display mt-3 max-w-2xl text-4xl font-bold sm:text-5xl"
        />
      </div>

      <div className="relative mt-12 overflow-hidden pb-28">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg-soft to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg-soft to-transparent" />
        <motion.div
          className="flex gap-5"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 36, ease: "linear" }}
        >
          {row.map((t, i) => (
            <Card key={`${t.name}-${i}`} t={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
