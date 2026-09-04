"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { EASE, Reveal, Words } from "@/components/worlds/shared/motion";

const CASES = [
  {
    title: "Home backup",
    desc: "Fridge, fans, lights and the TV through a two-hour cut or an eight-hour one. Silent, indoors, no fumes.",
    img: "/power/life-fridge.webp",
    pick: "DELTA 3 · DELTA 3 1500",
    href: "/power/delta-3",
  },
  {
    title: "Work from home",
    desc: "Laptop, monitor, router and NAS — a sub-10 ms UPS that keeps the meeting alive and the drives spinning.",
    img: "/power/life-desk-fan.webp",
    pick: "RIVER 3 Plus · RIVER 3 Max",
    href: "/power/river-3-plus",
  },
  {
    title: "Kids, study, sleep",
    desc: "A bedside lamp, a study fan and every phone in the house — quiet enough to sit next to a sleeping child.",
    img: "/power/life-bedside-lamp.webp",
    pick: "RIVER 3 · RIVER 2",
    href: "/power/river-3",
  },
  {
    title: "Outdoors & travel",
    desc: "Farmhouse weekends, campsites, the boot of the car. Solar-charged by day, powering the evening by night.",
    img: "/power/life-camp-van.webp",
    pick: "RIVER 2 Pro · DELTA 2",
    href: "/power/river-2-pro",
  },
];

export default function UseCases() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section id="use-cases" ref={ref} className="relative isolate overflow-hidden bg-[#0b0f0d] py-24 text-white sm:py-32">
      {/* Cinematic backdrop */}
      <motion.div style={{ y: videoY }} className="absolute inset-[-12%_0] -z-10">
        <video
          className="h-full w-full object-cover opacity-60"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/power/hero-poster.webp"
        >
          <source src="/power/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#0b0f0d] via-[#0b0f0d]/60 to-[#0b0f0d]" />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="label text-accent-2">Where it lives</p>
          </Reveal>
          <Words text="Power for the way you actually live." className="font-display mt-4 text-4xl font-bold leading-[1.02] sm:text-5xl lg:text-6xl" />
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {CASES.map((c, i) => (
            <motion.a
              key={c.title}
              href={c.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              className="group relative block aspect-[3/4] overflow-hidden rounded-[1.75rem] border border-white/10"
            >
              <Image src={c.img} alt={c.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw" className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="label text-accent-2">{c.pick}</p>
                <h3 className="font-display mt-2 text-2xl font-bold">{c.title}</h3>
                <p className="mt-2 max-h-0 overflow-hidden text-sm text-white/75 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">{c.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
