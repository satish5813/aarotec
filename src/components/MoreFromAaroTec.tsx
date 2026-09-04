"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import Reveal from "./Reveal";
import AnimatedHeading from "./AnimatedHeading";
import { WORLDS } from "@/lib/site";
import { POWER_PRODUCTS } from "@/data/power";
import { FURNITURE_PRODUCTS } from "@/data/furniture";

const EASE = [0.22, 1, 0.36, 1] as const;

const powerPicks = ["delta-3", "river-3-plus", "delta-2-pro"].map(
  (s) => POWER_PRODUCTS.find((p) => p.slug === s)!
);
const furniturePicks = ["loop-work-table", "wave-storage", "flow-bed"].map(
  (s) => FURNITURE_PRODUCTS.find((p) => p.slug === s)!
);

/** Home-page gateway to the two dedicated product worlds. Each card is
 *  rendered inside its own [data-world] so it previews that page's identity. */
export default function MoreFromAaroTec() {
  return (
    <section id="more" className="mx-auto max-w-7xl px-6 py-28">
      <div className="max-w-2xl">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber">
            Also from Aaro Tec
          </p>
        </Reveal>
        <AnimatedHeading
          text="Two more things a well-run home needs"
          className="font-display mt-3 text-4xl font-bold sm:text-5xl"
        />
        <Reveal delay={0.1}>
          <p className="mt-5 text-muted">
            Backup power that never lets the lights go out, and furniture made
            to order in solid ash. Both under the same roof, from the same
            person you already talk to.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        {/* Power */}
        <motion.div
          data-world="power"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="group relative isolate overflow-hidden rounded-[2rem] border border-line"
        >
          <div
            className="grid-paper pointer-events-none absolute inset-0 -z-10 opacity-70"
            style={{
              maskImage: "radial-gradient(ellipse 70% 70% at 70% 50%, #000 20%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 70% 50%, #000 20%, transparent 75%)",
            }}
          />
          <div
            className="pointer-events-none absolute -right-20 top-1/2 -z-10 h-80 w-80 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: "radial-gradient(closest-side, var(--glow), transparent 70%)" }}
          />
          <Link href={WORLDS.power.href} className="grid gap-6 p-7 sm:grid-cols-[1.1fr_1fr] sm:p-9">
            <div className="flex flex-col">
              <p className="label text-hi">{WORLDS.power.eyebrow}</p>
              <h3 className="font-display mt-3 text-4xl font-extrabold leading-[0.95] tracking-[-0.04em] sm:text-5xl">
                Never lose
                <br />
                <span className="volt">power.</span>
              </h3>
              <p className="mt-4 max-w-xs text-sm text-muted">{WORLDS.power.blurb}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {powerPicks.map((p) => (
                  <span key={p.slug} className="rounded-full border border-line bg-panel/70 px-3 py-1 text-xs font-medium">
                    {p.name}
                  </span>
                ))}
              </div>
              <span className="mt-auto inline-flex w-fit items-center gap-2 pt-8 text-sm font-semibold">
                Explore power backup
                <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </div>
            <div className="cutout relative aspect-square">
              <Image
                src="/power/river-3-max-plus-1.webp"
                alt="RIVER 3 Max Plus portable power station"
                fill
                sizes="(max-width: 640px) 90vw, 30vw"
                className="object-contain transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
              />
            </div>
          </Link>
        </motion.div>

        {/* Furniture */}
        <motion.div
          data-world="furniture"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="group relative isolate overflow-hidden rounded-[2rem] border border-line bg-ink text-white"
        >
          <div className="absolute inset-0 -z-10">
            <Image
              src="/furniture/nest-work-table-1.webp"
              alt="Nest work table"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/10" />
            <div className="vignette absolute inset-0" />
          </div>
          <Link href={WORLDS.furniture.href} className="flex min-h-[380px] flex-col p-7 sm:p-9">
            <p className="label text-sky">{WORLDS.furniture.eyebrow}</p>
            <h3 className="font-serif mt-3 text-5xl font-medium leading-[0.95] sm:text-6xl">
              Live with
              <br />
              <em className="brand-text not-italic">sculpture.</em>
            </h3>
            <p className="mt-4 max-w-xs text-sm text-white/70">{WORLDS.furniture.blurb}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {furniturePicks.map((p) => (
                <span key={p.slug} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium">
                  {p.name}
                </span>
              ))}
            </div>
            <span className="mt-auto inline-flex w-fit items-center gap-2 pt-8 text-sm font-semibold text-white">
              Explore the collections
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
