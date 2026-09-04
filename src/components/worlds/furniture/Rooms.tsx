"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal, Words } from "@/components/worlds/shared/motion";

const ROOMS = [
  { img: "/furniture/room-bed.webp", label: "The bedroom", piece: "Flow bed · Flow end table", href: "/furniture/flow-bed" },
  { img: "/furniture/room-chair-bed.webp", label: "The corner", piece: "Loop chair", href: "/furniture/loop-chair" },
  { img: "/furniture/room-console.webp", label: "The living room", piece: "Nest media console", href: "/furniture/nest-media-console" },
];

function Panel({ r, i }: { r: (typeof ROOMS)[number]; i: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  return (
    <Link
      ref={ref}
      href={r.href}
      className={`group relative block overflow-hidden rounded-[2rem] border border-line ${i === 0 ? "aspect-[4/5] md:col-span-2 md:aspect-[16/9]" : "aspect-[4/5]"}`}
    >
      <motion.div style={{ y }} className="absolute inset-[-10%_0]">
        <Image src={r.img} alt={r.label} fill sizes={i === 0 ? "100vw" : "50vw"} className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7 sm:p-9">
        <div>
          <p className="label text-hi">{r.label}</p>
          <p className="font-serif mt-1 text-3xl font-medium">{r.piece}</p>
        </div>
        <span className="grid h-11 w-11 place-items-center rounded-full border border-accent/50 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-fg">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
        </span>
      </div>
    </Link>
  );
}

export default function Rooms() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8">
      <div className="max-w-2xl">
        <Reveal>
          <p className="label text-hi">In the room</p>
        </Reveal>
        <Words text="Quiet pieces that anchor a space." className="font-serif mt-4 text-4xl font-medium leading-[1] sm:text-5xl lg:text-6xl" />
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {ROOMS.map((r, i) => (
          <Panel key={r.img} r={r} i={i} />
        ))}
      </div>
    </section>
  );
}
