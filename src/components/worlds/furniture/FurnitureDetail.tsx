"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { CATEGORIES, COLLECTIONS, FINISHES, type FurnitureProduct } from "@/data/furniture";
import { EASE, Reveal, Words } from "@/components/worlds/shared/motion";

export default function FurnitureDetail({ product, related }: { product: FurnitureProduct; related: FurnitureProduct[] }) {
  const [idx, setIdx] = useState(0);
  // Selected stain. null = as photographed. The preview tints the photo with
  // a colour-blend overlay: wood takes the hue, the dark studio backdrop
  // stays dark, so it reads as the same piece in a different finish.
  const [finish, setFinish] = useState<number | null>(null);
  const tint = finish === null ? null : FINISHES[finish];
  const isCharcoal = tint?.name === "Charcoal";
  const c = COLLECTIONS[product.collection];
  const cat = CATEGORIES.find((k) => k.key === product.category)?.label;

  return (
    <>
      <section className="mx-auto max-w-[1400px] px-5 pt-28 sm:px-8 sm:pt-36">
        <nav className="flex items-center gap-2 text-xs text-muted">
          <Link href="/furniture" className="hover:text-text">Furniture</Link>
          <span>/</span>
          <span>{c.name} collection</span>
          <span>/</span>
          <span className="text-text">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Gallery */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-line bg-panel sm:aspect-[5/4]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Image src={product.images[idx]} alt={`${product.name} — view ${idx + 1}`} fill preload={idx === 0} sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
              {/* Finish preview overlays */}
              <AnimatePresence>
                {tint && (
                  <motion.div
                    key={tint.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="pointer-events-none absolute inset-0"
                  >
                    <div className="absolute inset-0 mix-blend-color" style={{ background: tint.hex, opacity: isCharcoal ? 0.9 : 0.75 }} />
                    <div className="absolute inset-0 mix-blend-multiply" style={{ background: tint.hex, opacity: isCharcoal ? 0.55 : 0.28 }} />
                  </motion.div>
                )}
              </AnimatePresence>
              <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/80 backdrop-blur">
                {tint ? `Previewing in ${tint.name} · indicative` : `Shown in ${product.shownIn}`}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-5 gap-3">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setIdx(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`relative aspect-square overflow-hidden rounded-2xl border transition-colors ${i === idx ? "border-accent" : "border-line hover:border-muted"}`}
                >
                  <Image src={src} alt="" fill sizes="120px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:pt-4">
            <Reveal>
              <p className="label text-hi">{c.name} collection · {cat}</p>
            </Reveal>
            <Words text={product.name} as="h1" className="font-serif mt-3 text-5xl font-medium leading-[0.95] sm:text-6xl" />
            <Reveal delay={0.1}>
              <p className="font-serif mt-6 text-2xl italic leading-snug text-text/90">{product.story}</p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8">
                <p className="label text-muted">Sizes</p>
                <ul className="mt-2 space-y-1.5">
                  {product.sizes.map((s) => (
                    <li key={s} className="font-mono text-sm">{s}</li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="label text-muted">Finishes · tap to preview</p>
                  {tint && (
                    <button onClick={() => setFinish(null)} className="text-xs text-muted underline-offset-4 hover:text-text hover:underline">
                      Reset to photo
                    </button>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {FINISHES.map((f, i) => {
                    const active = finish === i;
                    return (
                      <button
                        key={f.name}
                        type="button"
                        onClick={() => setFinish(active ? null : i)}
                        aria-pressed={active}
                        className={`group flex items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-xs transition-all ${
                          active ? "border-accent bg-accent/10 text-text shadow-[0_0_0_3px_var(--glow)]" : "border-line text-muted hover:border-text hover:text-text"
                        }`}
                      >
                        <span
                          className="h-5 w-5 rounded-full ring-1 ring-black/10 transition-transform group-hover:scale-110"
                          style={{ background: `linear-gradient(135deg, ${f.hex}, color-mix(in srgb, ${f.hex} 70%, black))` }}
                        />
                        {f.name}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-[11px] text-muted">Colour preview is indicative. We send photographs of the real stain before you confirm.</p>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-fg transition-transform hover:-translate-y-0.5">
                  Quote the {product.name}
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </a>
                <Link href="/furniture#pieces" className="inline-flex items-center rounded-full border border-line px-6 py-3.5 text-sm font-semibold transition-colors hover:border-accent">
                  All pieces
                </Link>
              </div>
              <p className="mt-4 text-xs text-muted">{product.delivery}. Prices quoted on enquiry.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            { t: "Features", items: product.features },
            { t: "Materials", items: product.materials },
            { t: "Assembly & delivery", items: [product.assembly, product.delivery] },
          ].map((b, i) => (
            <Reveal key={b.t} delay={i * 0.06}>
              <div className="rule mb-5" />
              <h3 className="font-serif text-3xl font-medium">{b.t}</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {b.items.map((it) => (
                  <li key={it} className="flex gap-3">
                    <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-5 pb-8 sm:px-8">
          <Reveal>
            <p className="label text-hi">More from {c.name}</p>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/furniture/${r.slug}`} className="group relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-line">
                <Image src={r.images[0]} alt={r.name} fill sizes="33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-12">
                  <p className="font-serif text-2xl font-medium text-white">{r.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
