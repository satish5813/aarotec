"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Product } from "@/lib/products";
import { PRODUCTS } from "@/lib/products";
import Reveal from "./Reveal";
import AnimatedHeading from "./AnimatedHeading";

export default function ProductDetail({ product }: { product: Product }) {
  const [v, setV] = useState(0);
  const related = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none bloom-blue absolute left-1/2 top-[-10vmin] -z-10 h-[90vmin] w-[110vmin] -translate-x-1/2" />

      {/* breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 pt-28">
        <nav className="flex items-center gap-2 text-sm text-muted">
          <Link href="/" className="hover:text-text">
            Home
          </Link>
          <span>/</span>
          <Link href="/#products" className="hover:text-text">
            Products
          </Link>
          <span>/</span>
          <span className="text-text">{product.name}</span>
        </nav>
      </div>

      {/* hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-12 lg:grid-cols-2 lg:py-16">
        <Reveal>
          <div className="card-shadow relative flex aspect-square items-center justify-center overflow-hidden rounded-[2rem] border border-line bg-gradient-to-b from-bg-soft to-bg">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00d6e6]/10 blur-3xl" />
            <motion.div
              key={v}
              initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[78%] w-[78%]"
            >
              <Image
                src={product.variants[v].src}
                alt={`${product.name} smart device`}
                fill
                preload
                sizes="(max-width:1024px) 90vw, 600px"
                className="object-contain drop-shadow-[0_28px_45px_rgba(14,17,23,0.22)]"
              />
            </motion.div>

            {product.variants.length > 1 && (
              <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
                {product.variants.map((vr, i) => (
                  <button
                    key={vr.color}
                    onClick={() => setV(i)}
                    aria-label={`Colour ${i + 1}`}
                    className="relative grid h-7 w-7 place-items-center rounded-full"
                  >
                    {v === i && (
                      <span className="absolute inset-0 rounded-full ring-2 ring-[#2f6bff] ring-offset-2 ring-offset-bg-soft" />
                    )}
                    <span
                      className="h-5 w-5 rounded-full ring-1 ring-line"
                      style={{ backgroundColor: vr.color }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.2em] brand-text">
              {product.tagline}
            </p>
          </Reveal>
          <AnimatedHeading
            text={product.name}
            className="font-display mt-3 text-5xl font-bold sm:text-6xl"
          />
          <Reveal delay={0.05}>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
              {product.long}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {product.highlights.map((h) => (
                <span
                  key={h}
                  className="rounded-full border border-line bg-bg-soft px-4 py-1.5 text-xs font-medium text-muted"
                >
                  {h}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/#contact"
                className="brand-gradient rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                Enquire now
              </Link>
              <Link
                href="/#products"
                className="card-shadow rounded-full border border-line bg-panel px-7 py-3.5 text-sm font-semibold text-text transition-colors hover:bg-bg-soft"
              >
                ← All categories
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* features */}
      <section className="border-y border-line bg-bg-soft py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.2em] brand-text">
              Why {product.name}
            </p>
          </Reveal>
          <AnimatedHeading
            text="Designed down to the detail"
            className="font-display mt-3 max-w-2xl text-4xl font-bold sm:text-5xl"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {product.features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.05}>
                <div className="card-shadow group h-full rounded-2xl border border-line bg-panel p-7">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-bg-soft">
                    <span className="brand-gradient h-3 w-3 rounded-full" />
                  </div>
                  <h3 className="font-display mt-5 text-lg font-semibold">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {f.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* specs */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.2em] brand-text">
              Specifications
            </p>
            <h2 className="font-display mt-3 text-4xl font-bold sm:text-5xl">
              The technical side
            </h2>
            <p className="mt-4 max-w-sm text-muted">
              Engineered to global standards and built to last — backed by
              responsive local support.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="card-shadow divide-y divide-line overflow-hidden rounded-2xl border border-line bg-panel">
              {product.specs.map((s) => (
                <div
                  key={s.k}
                  className="flex items-center justify-between gap-6 px-6 py-5"
                >
                  <dt className="text-sm text-muted">{s.k}</dt>
                  <dd className="text-right text-sm font-semibold">{s.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* related */}
      <section className="border-t border-line bg-bg-soft py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Explore more categories
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <Link
                  href={`/products/${p.slug}`}
                  className="card-shadow group block rounded-3xl border border-line bg-panel p-6 transition hover:-translate-y-1.5"
                >
                  <div className="relative mx-auto h-40 w-full">
                    <Image
                      src={p.variants[0].src}
                      alt={p.name}
                      fill
                      sizes="280px"
                      className="object-contain drop-shadow-[0_14px_24px_rgba(14,17,23,0.18)]"
                    />
                  </div>
                  <p className="mt-4 text-xs font-medium brand-text">
                    {p.tagline}
                  </p>
                  <h3 className="font-display mt-1 text-xl font-bold">
                    {p.name}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold">
                    View
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
