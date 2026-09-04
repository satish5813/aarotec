"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { EASE, Reveal, Words } from "@/components/worlds/shared/motion";

const FEATURES = [
  {
    k: "X-Stream",
    title: "Full in about an hour.",
    desc: "X-Stream charging pulls up to 1,500 W from a normal wall socket. A DELTA 3 goes from empty to full in 56 minutes; most RIVER units in 60–70. Charge between cuts, not overnight.",
    stat: "56 min",
    statLabel: "0–100%",
    img: "/power/river-3-4.webp",
  },
  {
    k: "UPS",
    title: "Switches over before you notice.",
    desc: "Plug the router, PC or CPAP through the unit and it takes over in under 10 milliseconds when the mains drops. Nothing reboots. Nothing flickers.",
    stat: "<10 ms",
    statLabel: "switchover",
    img: "/power/delta-3-plus-4.webp",
  },
  {
    k: "X-Boost",
    title: "Runs the heavy stuff too.",
    desc: "X-Boost lets a 1,800 W unit drive appliances rated up to 2,600 W — mixers, kettles, irons, even a 1-ton AC — by intelligently trimming voltage under load.",
    stat: "99%",
    statLabel: "of home appliances",
    img: "/power/delta-3-1500-3.webp",
  },
  {
    k: "LFP",
    title: "Built for ten years, not two.",
    desc: "Lithium iron phosphate cells rated for 3,000–4,000 full cycles before dropping to 80% capacity, watched over by a BMS that monitors voltage, current and temperature every second.",
    stat: "4,000+",
    statLabel: "charge cycles",
    img: "/power/river-3-plus-3.webp",
  },
  {
    k: "Outlets",
    title: "Everything plugs in at once.",
    desc: "Up to 13 outlets on a DELTA: four universal AC sockets, 140 W USB-C, USB-A, DC barrel and a car port. The whole desk, the whole kitchen counter, on one unit.",
    stat: "13",
    statLabel: "outlets",
    img: "/power/delta-3-3.webp",
  },
  {
    k: "Solar",
    title: "Five ways to charge.",
    desc: "Wall, solar, car, generator — or wall and solar together for the fastest refill. Pair with a foldable 110–400 W panel and you're off-grid for the weekend.",
    stat: "5",
    statLabel: "charging routes",
    img: "/power/delta-3-4.webp",
  },
];

export default function Technology() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = refs.current.indexOf(visible.target as HTMLDivElement);
        if (idx >= 0) setActive(idx);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.5, 1] }
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="technology" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
      <div className="max-w-2xl">
        <Reveal>
          <p className="label text-hi">Technology</p>
        </Reveal>
        <Words text="Six reasons this isn't just a big power bank." className="font-display mt-4 text-4xl font-bold leading-[1.02] sm:text-5xl lg:text-6xl" />
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Sticky visual */}
        <div className="hidden lg:block">
          <div className="sticky top-28">
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-line bg-[#0d1210] shadow-[0_50px_90px_-50px_rgba(15,21,18,0.6)]">
              <AnimatePresence mode="sync">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Image src={FEATURES[active].img} alt={FEATURES[active].title} fill sizes="50vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-8 pt-24 text-white">
                <AnimatePresence mode="wait">
                  <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
                    <p className="font-mono text-5xl font-medium text-accent-2">{FEATURES[active].stat}</p>
                    <p className="label mt-1 text-white/70">{FEATURES[active].statLabel}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* progress */}
              <div className="absolute right-6 top-6 flex flex-col gap-1.5">
                {FEATURES.map((_, i) => (
                  <span key={i} className={`h-6 w-1 rounded-full transition-colors duration-500 ${i === active ? "bg-accent-2" : "bg-white/25"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-6 lg:space-y-0">
          {FEATURES.map((f, i) => (
            <div
              key={f.k}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="lg:flex lg:min-h-[70vh] lg:items-center"
            >
              <Reveal className="w-full">
                <div className={`rounded-[1.75rem] border p-7 transition-colors duration-500 sm:p-9 ${i === active ? "border-text/30 bg-panel" : "border-line bg-transparent"}`}>
                  <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl lg:hidden">
                    <Image src={f.img} alt={f.title} fill sizes="100vw" className="object-cover" />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                    <span className="h-px flex-1 bg-line" />
                    <span className="label text-hi">{f.k}</span>
                  </div>
                  <h3 className="font-display mt-4 text-2xl font-bold sm:text-3xl">{f.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{f.desc}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
