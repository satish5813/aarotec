"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { POWER_PRODUCTS, SERIES, type Series } from "@/data/power";
import { EASE, Reveal, Words } from "@/components/worlds/shared/motion";

const fmt = (n: number) => n.toLocaleString("en-IN");

export default function Range() {
  const [series, setSeries] = useState<Series>("delta");
  const items = POWER_PRODUCTS.filter((p) => p.series === series);
  const s = SERIES[series];

  return (
    <section id="range" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <Reveal>
            <p className="label text-hi">The range</p>
          </Reveal>
          <Words text="Two families. One for the desk, one for the whole house." className="font-display mt-4 text-4xl font-bold leading-[1.02] sm:text-5xl lg:text-6xl" />
        </div>

        {/* Series switch */}
        <div className="flex rounded-full border border-line bg-panel p-1">
          {(["river", "delta"] as const).map((k) => {
            const active = series === k;
            return (
              <button
                key={k}
                onClick={() => setSeries(k)}
                className={`relative rounded-full px-6 py-3 text-sm font-semibold transition-colors ${active ? "text-accent-fg" : "text-muted hover:text-text"}`}
              >
                {active && (
                  <motion.span layoutId="series-pill" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className="relative flex items-center gap-2">
                  {SERIES[k].name}
                  <span className={`font-mono text-[11px] ${active ? "text-accent-2" : "text-muted"}`}>{SERIES[k].range}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={series}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="mt-6 max-w-xl text-muted"
        >
          <span className="font-semibold text-text">{s.strap}</span> {s.desc}
        </motion.p>
      </AnimatePresence>

      <motion.div layout className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((p, i) => {
            // A lone card on the last row stretches wide so the grid never ends on an orphan.
            const wide = i === items.length - 1 && items.length % 3 === 1;
            return (
            <motion.article
              layout
              key={p.slug}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
              className={`group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-line bg-panel transition-shadow duration-500 hover:shadow-[0_40px_70px_-40px_rgba(15,21,18,0.45)] ${wide ? "xl:col-span-2 xl:flex-row" : ""}`}
            >
              {p.badge && (
                <span className="absolute left-5 top-5 z-10 rounded-full bg-accent-2 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0f1512]">{p.badge}</span>
              )}
              <Link href={`/power/${p.slug}`} className={`relative block aspect-[4/3] overflow-hidden bg-white ${wide ? "xl:aspect-auto xl:w-1/2" : ""}`}>
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="cutout object-contain p-8 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-panel to-transparent" />
              </Link>

              <div className={`flex flex-1 flex-col p-6 pt-2 ${wide ? "xl:justify-center xl:p-10" : ""}`}>
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl font-bold">{p.name}</h3>
                  <span className="font-mono text-xs text-muted">{p.weightKg} kg</span>
                </div>
                <p className="mt-1 text-sm text-muted">{p.tagline}</p>

                <dl className="mt-5 grid grid-cols-3 gap-3 border-y border-line py-4">
                  <div>
                    <dt className="label text-muted">Capacity</dt>
                    <dd className="font-mono mt-1 text-lg font-medium">{fmt(p.capacityWh)}<span className="text-xs text-muted"> Wh</span></dd>
                  </div>
                  <div>
                    <dt className="label text-muted">Output</dt>
                    <dd className="font-mono mt-1 text-lg font-medium">{fmt(p.outputW)}<span className="text-xs text-muted"> W</span></dd>
                  </div>
                  <div>
                    <dt className="label text-muted">Charge</dt>
                    <dd className="font-mono mt-1 text-lg font-medium">{p.chargeMinutes}<span className="text-xs text-muted"> min</span></dd>
                  </div>
                </dl>

                <ul className="mt-4 space-y-1.5 text-sm text-muted">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-hi" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between">
                  <Link href={`/power/${p.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold">
                    Details
                    <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </Link>
                  <a href="#contact" className="rounded-full border border-line px-4 py-2 text-xs font-semibold transition-colors hover:bg-accent hover:text-accent-fg">
                    Get a quote
                  </a>
                </div>
              </div>
            </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <Reveal className="mt-10">
        <p className="text-center text-xs text-muted">
          Specifications are indicative and confirmed at the time of quotation. Expandable units accept extra batteries — ask us to size a system.
        </p>
      </Reveal>
    </section>
  );
}
