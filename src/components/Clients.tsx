"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import AnimatedHeading from "./AnimatedHeading";

// Real client logos (self-hosted in /public/clients).
const CLIENTS = [
  { name: "Madhav Associates", src: "/clients/madhav.webp", w: 50, h: 54 },
  { name: "Nirman Greens", src: "/clients/nirmangreens.webp", w: 138, h: 54 },
  { name: "Sobha Realty", src: "/clients/sobharealty.webp", w: 150, h: 54 },
  { name: "Sonani Jewels", src: "/clients/sonanijewels.webp", w: 285, h: 54 },
  { name: "Veer Group", src: "/clients/veergroup.webp", w: 57, h: 54 },
  { name: "Venus", src: "/clients/venus.webp", w: 54, h: 54 },
  { name: "McKinsey & Company", src: "/clients/mckinseyblack.webp", w: 176, h: 55 },
];

export default function Clients() {
  // Row is doubled so the -50% marquee loops seamlessly.
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <section className="relative overflow-hidden border-y border-line bg-bg-soft py-20">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-violet/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue">
              Trusted partnerships
            </p>
          </Reveal>
          <AnimatedHeading
            text="Our Esteemed Clients"
            className="font-display mt-3 text-4xl font-bold sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Builders, developers and brands that trust us to make their
              spaces smarter.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-12 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg-soft to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg-soft to-transparent" />
          <div className="flex w-max animate-marquee items-center gap-5 py-2 hover:[animation-play-state:paused]">
            {row.map((c, i) => (
              <div
                key={i}
                title={c.name}
                className="flex h-24 w-56 shrink-0 items-center justify-center rounded-2xl border border-line bg-white px-7 shadow-[0_10px_30px_-18px_rgba(15,21,43,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(15,21,43,0.28)]"
              >
                <Image
                  src={c.src}
                  alt={c.name}
                  width={c.w}
                  height={c.h}
                  className="h-10 w-auto max-w-[11rem] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
