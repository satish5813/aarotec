"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { CATEGORIES, COLLECTIONS, FURNITURE_PRODUCTS, type Category, type Collection } from "@/data/furniture";
import { EASE, Reveal, Words } from "@/components/worlds/shared/motion";

type Filter = { kind: "all" } | { kind: "category"; key: Category } | { kind: "collection"; key: Collection };

export default function Pieces() {
  const [filter, setFilter] = useState<Filter>({ kind: "all" });

  // Collection cards link here with data-collection; pick it up on click.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[data-collection]");
      if (!a) return;
      setFilter({ kind: "collection", key: a.dataset.collection as Collection });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const items = useMemo(() => {
    if (filter.kind === "all") return FURNITURE_PRODUCTS;
    if (filter.kind === "category") return FURNITURE_PRODUCTS.filter((p) => p.category === filter.key);
    return FURNITURE_PRODUCTS.filter((p) => p.collection === filter.key);
  }, [filter]);

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-2 text-xs font-medium transition-colors ${active ? "border-accent bg-accent text-accent-fg" : "border-line text-muted hover:border-accent/60 hover:text-text"}`;

  return (
    <section id="pieces" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <Reveal>
            <p className="label text-hi">Every piece</p>
          </Reveal>
          <Words text="Twenty-two pieces. Your finish, your size." className="font-serif mt-4 text-4xl font-medium leading-[1] sm:text-5xl lg:text-6xl" />
        </div>
      </div>

      <div className="mt-10 space-y-3">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setFilter({ kind: "all" })} className={chip(filter.kind === "all")}>All</button>
          {CATEGORIES.map((c) => (
            <button key={c.key} onClick={() => setFilter({ kind: "category", key: c.key })} className={chip(filter.kind === "category" && filter.key === c.key)}>
              {c.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[11px] uppercase tracking-[0.2em] text-muted">Collection</span>
          {(Object.keys(COLLECTIONS) as Collection[]).map((k) => (
            <button key={k} onClick={() => setFilter({ kind: "collection", key: k })} className={chip(filter.kind === "collection" && filter.key === k)}>
              {COLLECTIONS[k].name}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {items.map((p, i) => (
            <motion.article
              layout
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, delay: Math.min(i, 8) * 0.04, ease: EASE }}
              className={`group ${p.tall ? "sm:row-span-2" : ""}`}
            >
              <Link href={`/furniture/${p.slug}`} className="block">
                <div className={`relative overflow-hidden rounded-[1.5rem] border border-line bg-panel ${p.tall ? "aspect-[3/4] sm:aspect-auto sm:h-full sm:min-h-[560px]" : "aspect-[4/4]"}`}>
                  <Image src={p.images[0]} alt={p.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-[opacity,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105 group-hover:opacity-0" />
                  <Image src={p.images[1] ?? p.images[0]} alt="" aria-hidden fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-16">
                    <p className="label text-white/70">{COLLECTIONS[p.collection].name} · {CATEGORIES.find((c) => c.key === p.category)?.label}</p>
                    <h3 className="font-serif mt-1 text-2xl font-medium text-white">{p.name}</h3>
                  </div>
                  <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white/80 backdrop-blur">
                    Shown in {p.shownIn}
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <Reveal className="mt-10">
        <p className="text-center text-xs text-muted">Every piece is quoted on enquiry in your chosen finish and size. Free delivery pan-India.</p>
      </Reveal>
    </section>
  );
}
