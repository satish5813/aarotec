"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { FINISHES } from "@/data/furniture";
import { Reveal, Words } from "@/components/worlds/shared/motion";

const PROCESS = [
  { n: "01", t: "Choose", d: "Pick the piece, the size and one of seven stains. Send us a fabric if you'd like your own upholstery." },
  { n: "02", t: "Craft", d: "Built by hand in solid ash and ash veneer, stained and sealed with an open-grain matte polish so the wood stays tactile." },
  { n: "03", t: "Deliver", d: "About 50 days from confirmation, free anywhere in India. Larger pieces arrive flat-packed with a guide and tools." },
];

const MATERIALS = [
  { t: "Ash wood & veneer", d: "Straight, strong grain that takes a stain evenly and shows through the matte polish." },
  { t: "Soft-close drawers", d: "Upholstered inside, on bottom-mount channels that glide shut without a sound." },
  { t: "Self-closing hinges", d: "Shutters that pull themselves the last inch and never slam." },
  { t: "Damped lift mechanisms", d: "Coffee-table tops that rise on a damper and settle without a thud." },
];

export default function Craft() {
  const [finish, setFinish] = useState(2);
  const f = FINISHES[finish];

  return (
    <section id="craft" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[50rem] w-[80rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl transition-colors duration-700" style={{ background: `radial-gradient(closest-side, ${f.hex}55, transparent)` }} />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          {/* Image + finish picker */}
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-line">
              <Image src="/furniture/detail-pencils.webp" alt="Ash wood grain and stationery organiser detail" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              <motion.div
                key={finish}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.35 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 mix-blend-color"
                style={{ background: f.hex }}
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-6 pt-20">
                <div>
                  <p className="label text-white/70">Finish</p>
                  <p className="font-serif text-3xl font-medium text-white">{f.name}</p>
                </div>
                <p className="text-xs text-white/60">Preview is indicative</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {FINISHES.map((fin, i) => (
                <button
                  key={fin.name}
                  onClick={() => setFinish(i)}
                  aria-label={fin.name}
                  aria-pressed={i === finish}
                  className="group flex items-center gap-2.5 rounded-full border border-line py-1.5 pl-1.5 pr-4 text-xs transition-colors hover:border-accent/60 aria-pressed:border-accent"
                >
                  <span className="h-7 w-7 rounded-full border border-white/10 shadow-inner transition-transform group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${fin.hex}, color-mix(in srgb, ${fin.hex} 70%, black))` }} />
                  {fin.name}
                </button>
              ))}
            </div>
          </div>

          {/* Copy */}
          <div>
            <Reveal>
              <p className="label text-hi">Materials &amp; craft</p>
            </Reveal>
            <Words text="Solid ash, stained seven ways, finished so you can still feel the grain." className="font-serif mt-4 text-4xl font-medium leading-[1] sm:text-5xl" />
            <Reveal delay={0.1}>
              <p className="mt-6 text-muted">
                Designed by architects, built by Indian artisans. The philosophy is simple: improve daily human function, express it in a visual language of simplicity and intrigue, and let the material do the talking.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {MATERIALS.map((m, i) => (
                <Reveal key={m.t} delay={i * 0.05}>
                  <div className="rule mb-4" />
                  <p className="font-semibold">{m.t}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{m.d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="mt-24 grid gap-6 md:grid-cols-3">
          {PROCESS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="h-full rounded-[1.75rem] border border-line bg-panel p-8">
                <p className="font-mono text-xs text-hi">{s.n}</p>
                <h3 className="font-serif mt-3 text-4xl font-medium">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
