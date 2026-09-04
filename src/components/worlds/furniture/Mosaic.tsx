"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { COLLECTIONS, FURNITURE_PRODUCTS } from "@/data/furniture";
import { EASE } from "@/components/worlds/shared/motion";

/** Nine pieces arranged as one composition. `area` maps to the CSS grid
 *  below; `z` is the tile's depth so the cursor tilt parallaxes each one
 *  differently; `pos` nudges the crop so the piece stays in frame. */
const TILES = [
  { slug: "wave-storage", img: "/furniture/wave-storage-2.webp", area: "a", z: 40, pos: "50% 45%" },
  { slug: "loop-chair", img: "/furniture/loop-chair-2.webp", area: "b", z: -20, pos: "50% 55%" },
  { slug: "nest-storage", img: "/furniture/nest-storage-2.webp", area: "c", z: 30, pos: "50% 50%" },
  { slug: "flow-media-console", img: "/furniture/flow-media-console-1.webp", area: "d", z: -30, pos: "50% 62%" },
  { slug: "clutch-storage", img: "/furniture/clutch-storage-2.webp", area: "e", z: 55, pos: "50% 50%" },
  { slug: "wind-work-table", img: "/furniture/wind-work-table-4.webp", area: "f", z: -10, pos: "50% 58%" },
  { slug: "flow-bed", img: "/furniture/flow-bed-2.webp", area: "g", z: 20, pos: "50% 60%" },
  { slug: "loop-work-table", img: "/furniture/loop-work-table-1.webp", area: "h", z: -40, pos: "50% 62%" },
  { slug: "clutch-coffee-table", img: "/furniture/clutch-coffee-table-2.webp", area: "i", z: 10, pos: "50% 58%" },
];

const HOLD_MS = 3200;

export default function Mosaic() {
  const ref = useRef<HTMLDivElement>(null);
  const [featured, setFeatured] = useState(0);
  const [paused, setPaused] = useState(false);

  // Cursor tilt on the whole composition, springy so it feels weighty.
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const spring = { stiffness: 50, damping: 16, mass: 0.8 };
  const rotY = useSpring(useTransform(mx, [0, 1], [-9, 9]), spring);
  const rotX = useSpring(useTransform(my, [0, 1], [7, -7]), spring);
  const shiftX = useSpring(useTransform(mx, [0, 1], [10, -10]), spring);
  const shiftY = useSpring(useTransform(my, [0, 1], [8, -8]), spring);

  // Spotlight walks across the pieces; hovering a tile takes over.
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setFeatured((i) => (i + 1) % TILES.length), HOLD_MS);
    return () => clearInterval(t);
  }, [paused]);

  const current = TILES[featured];
  const product = FURNITURE_PRODUCTS.find((p) => p.slug === current.slug)!;

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
        setPaused(false);
      }}
      className="relative [perspective:1600px]"
    >
      {/* Depth shadow under the whole composition */}
      <div className="pointer-events-none absolute inset-x-[6%] bottom-[-6%] h-[30%] rounded-[50%] bg-ink/25 blur-3xl" />

      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, x: shiftX, y: shiftY, transformStyle: "preserve-3d" }}
        className="mosaic relative grid gap-2.5 sm:gap-3"
      >
        {TILES.map((t, i) => {
          const on = i === featured;
          const p = FURNITURE_PRODUCTS.find((x) => x.slug === t.slug)!;
          return (
            <motion.div
              key={t.slug}
              style={{ gridArea: t.area, transform: `translateZ(${t.z}px)`, transformStyle: "preserve-3d" }}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.25 + i * 0.08, ease: EASE }}
              className="relative min-h-0"
            >
              <Link
                href={`/furniture/${t.slug}`}
                onMouseEnter={() => {
                  setFeatured(i);
                  setPaused(true);
                }}
                aria-label={p.name}
                className={`float group relative block h-full w-full overflow-hidden rounded-[1.1rem] bg-ink ring-1 ring-black/10 transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(.22,1,.36,1)] sm:rounded-[1.4rem] ${
                  on ? "z-10 scale-[1.05] shadow-[0_30px_60px_-24px_rgba(15,21,43,0.55)] ring-2 ring-accent" : "shadow-[0_18px_40px_-28px_rgba(15,21,43,0.5)]"
                }`}
                style={{ animationDelay: `${-i * 0.9}s`, animationDuration: `${6 + (i % 3)}s` }}
              >
                <Image
                  src={t.img}
                  alt={p.name}
                  fill
                  preload={i < 3}
                  sizes="(max-width: 640px) 33vw, 22vw"
                  style={{ objectPosition: t.pos }}
                  className={`object-cover transition-[filter,transform] duration-700 ${on ? "[filter:brightness(1.55)_saturate(1.08)] scale-105" : "[filter:brightness(1.28)] group-hover:[filter:brightness(1.5)]"}`}
                />
                {/* Label on the featured tile */}
                <AnimatePresence>
                  {on && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 pt-10 text-white"
                    >
                      <p className="label text-[9px] text-white/70">{COLLECTIONS[p.collection].name} collection</p>
                      <p className="font-serif mt-0.5 text-lg font-medium leading-none sm:text-xl">{p.name}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Now showing */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8, ease: EASE }} className="mt-5 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-hi" />
          </span>
          <AnimatePresence mode="wait">
            <motion.p key={current.slug} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }} className="truncate text-sm">
              <span className="font-semibold">{product.name}</span>
              <span className="text-muted"> · shown in {product.shownIn}</span>
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden gap-1 sm:flex">
            {TILES.map((_, i) => (
              <button
                key={i}
                aria-label={`Show piece ${i + 1}`}
                onClick={() => {
                  setFeatured(i);
                  setPaused(true);
                }}
                className={`h-1.5 rounded-full transition-all ${i === featured ? "w-5 bg-accent" : "w-1.5 bg-line hover:bg-muted"}`}
              />
            ))}
          </div>
          <Link href={`/furniture/${current.slug}`} className="text-sm font-semibold text-hi underline-offset-4 hover:underline">
            View piece →
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
