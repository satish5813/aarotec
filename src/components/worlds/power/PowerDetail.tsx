"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import type { PowerProduct } from "@/data/power";
import { SERIES } from "@/data/power";
import { EASE, Reveal, Words } from "@/components/worlds/shared/motion";

const fmt = (n: number) => n.toLocaleString("en-IN");

export default function PowerDetail({ product, related }: { product: PowerProduct; related: PowerProduct[] }) {
  const [idx, setIdx] = useState(0);
  const s = SERIES[product.series];

  const specs = [
    ["Capacity", `${fmt(product.capacityWh)} Wh`],
    ["AC output (rated)", `${fmt(product.outputW)} W`],
    ["X-Boost surge", `${fmt(product.surgeW)} W`],
    ["AC recharge", product.chargeNote],
    ["Solar input", `Up to ${fmt(product.solarW)} W`],
    ["Battery", product.cycles],
    ["Outlets", product.outlets],
    ["Weight", `${product.weightKg} kg`],
    ["Dimensions", `${product.dimensionsCm} cm`],
    ...(product.expandable ? [["Expansion", product.expandable]] : []),
  ];

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-[1400px] px-5 pt-28 sm:px-8 sm:pt-36">
        <nav className="flex items-center gap-2 text-xs text-muted">
          <Link href="/power" className="hover:text-text">Power</Link>
          <span>/</span>
          <span>{s.name} series</span>
          <span>/</span>
          <span className="text-text">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Gallery */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-line bg-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Image src={product.images[idx]} alt={`${product.name} — view ${idx + 1}`} fill preload={idx === 0} sizes="(max-width: 1024px) 100vw, 55vw" className={idx === 0 ? "cutout object-contain p-10" : "object-cover"} />
                </motion.div>
              </AnimatePresence>
              {product.badge && (
                <span className="absolute left-5 top-5 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-fg">{product.badge}</span>
              )}
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setIdx(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`relative aspect-square overflow-hidden rounded-2xl border bg-white transition-colors ${i === idx ? "border-text" : "border-line hover:border-muted"}`}
                >
                  <Image src={src} alt="" fill sizes="120px" className={i === 0 ? "cutout object-contain p-3" : "object-cover"} />
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:pt-6">
            <Reveal>
              <p className="label text-hi">{s.name} series · {product.tagline}</p>
            </Reveal>
            <Words text={product.name} as="h1" className="font-display mt-3 text-5xl font-extrabold leading-[0.98] tracking-[-0.04em] sm:text-6xl" />
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-muted">{product.intro}</p>
            </Reveal>

            <Reveal delay={0.15}>
              <dl className="mt-8 grid grid-cols-3 gap-4 rounded-[1.5rem] border border-line bg-panel p-5">
                <div>
                  <dt className="label text-muted">Capacity</dt>
                  <dd className="font-mono mt-1 text-2xl font-medium">{fmt(product.capacityWh)}<span className="text-sm text-muted"> Wh</span></dd>
                </div>
                <div>
                  <dt className="label text-muted">Output</dt>
                  <dd className="font-mono mt-1 text-2xl font-medium">{fmt(product.outputW)}<span className="text-sm text-muted"> W</span></dd>
                </div>
                <div>
                  <dt className="label text-muted">Recharge</dt>
                  <dd className="font-mono mt-1 text-2xl font-medium">{product.chargeMinutes}<span className="text-sm text-muted"> min</span></dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-6 flex flex-wrap gap-2">
                {product.bestFor.map((b) => (
                  <span key={b} className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted">{b}</span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-fg transition-transform hover:-translate-y-0.5">
                  Get a quote for {product.name}
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </a>
                <Link href="/power#runtime" className="inline-flex items-center rounded-full border border-line px-6 py-3.5 text-sm font-semibold transition-colors hover:border-text">
                  Estimate runtime
                </Link>
              </div>
              <p className="mt-4 text-xs text-muted">Prices are quoted on enquiry. Specifications indicative; confirmed at quotation.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Features + specs */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="label text-hi">What it does</p>
            </Reveal>
            <Words text="Every feature, plainly." className="font-display mt-4 text-3xl font-bold sm:text-4xl" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {product.features.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.05}>
                  <div className="h-full rounded-[1.5rem] border border-line bg-panel p-6">
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                    <h3 className="mt-2 font-semibold">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{f.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal>
              <p className="label text-hi">Specifications</p>
            </Reveal>
            <Words text="On paper." className="font-display mt-4 text-3xl font-bold sm:text-4xl" />
            <Reveal delay={0.1}>
              <dl className="mt-8 divide-y divide-line rounded-[1.5rem] border border-line bg-panel">
                {specs.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[0.8fr_1.2fr] gap-4 px-6 py-3.5 text-sm">
                    <dt className="text-muted">{k}</dt>
                    <dd className="font-mono text-right text-[13px]">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-5 pb-8 sm:px-8">
          <Reveal>
            <p className="label text-hi">Also in the {s.name} series</p>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/power/${r.slug}`} className="group flex items-center gap-4 rounded-[1.5rem] border border-line bg-panel p-4 transition-colors hover:border-text">
                <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white">
                  <Image src={r.images[0]} alt={r.name} fill sizes="80px" className="cutout object-contain p-2 transition-transform group-hover:scale-105" />
                </span>
                <span>
                  <span className="block font-semibold">{r.name}</span>
                  <span className="font-mono block text-xs text-muted">{fmt(r.capacityWh)} Wh · {fmt(r.outputW)} W</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
