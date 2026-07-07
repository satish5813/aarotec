"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Reveal from "./Reveal";
import AnimatedHeading from "./AnimatedHeading";

// Real installation photos from homes across India, curated best-first.
const INSTALLS = [
  { src: "/lock-keypad.jpeg", caption: "Fingerprint, PIN & RFID access" },
  { src: "/lock-display.jpeg", caption: "Smart display, one-touch open" },
  { src: "/lock-handle.jpeg", caption: "Premium matte-black lever" },
  { src: "/lock-mechanism.jpeg", caption: "Multi-point mortise locking" },
  { src: "/lock-installed.jpeg", caption: "Seamless on-door fit" },
  { src: "/lock-box.jpeg", caption: "Keyless convenience, in the box" },
  { src: "/lock-fit.jpeg", caption: "Professional installation" },
  { src: "/lock-strike.jpeg", caption: "Precision strike plate" },
  { src: "/lock-onsite.jpeg", caption: "On-site fitting by our team" },
  { src: "/locs/install-2.jpeg", caption: "Entryway panel by the front door" },
  { src: "/locs/install-7.jpeg", caption: "One-touch scene controls" },
  { src: "/locs/install-10.jpeg", caption: "Living room dual-panel setup" },
  { src: "/locs/install-3.jpeg", caption: "8-scene glass touch panel" },
  { src: "/locs/install-4.jpeg", caption: "Bedside touch panel" },
  { src: "/locs/install-6.jpeg", caption: "Seven-way touch switchboard" },
  { src: "/locs/install-9.jpeg", caption: "Light & fan control panel" },
  { src: "/locs/install-8.jpeg", caption: "Switches & sockets in one glass" },
  { src: "/locs/install-1.jpeg", caption: "Smart socket with built-in USB" },
  { src: "/locs/install-5.jpeg", caption: "Panels in every room" },
] as const;

const QUOTES = [
  {
    q: "Retrofitting was painless — no rewiring, no mess. The goodnight scene alone is worth it.",
    n: "Vikram S.",
    r: "Villa · Visakhapatnam",
  },
  {
    q: "Energy insights helped us cut our monthly bill noticeably. Support has been excellent.",
    n: "Meera & Arjun",
    r: "Apartment · Khammam",
  },
  {
    q: "We automated the common areas across the block — lighting and security run themselves now.",
    n: "Lakshmi P.",
    r: "Gated community · Vijayawada",
  },
  {
    q: "Even when the Wi-Fi drops, the switches keep working. That reliability sold me.",
    n: "Suresh K.",
    r: "Individual house · Ongole",
  },
  {
    q: "Installed room by room over a weekend. The touch panels look stunning on the wall.",
    n: "Divya R.",
    r: "Apartment · Chilakaluripet (AP)",
  },
  {
    q: "Controlling fans, lights and the AC from one panel is so convenient. The whole family loves it.",
    n: "Naveen M.",
    r: "Apartment · Kakinada",
  },
  {
    q: "Both floors on a single app. Scenes for movie night and mornings are a game changer.",
    n: "Harika S.",
    r: "Duplex · Guntur",
  },
  {
    q: "Scheduling lights and ACs across the office cut our power costs significantly.",
    n: "Sai Teja",
    r: "Commercial office · Vijayawada",
  },
  {
    q: "Ambience presets for day and evening transformed the space. Setup was effortless.",
    n: "Coastal Brew Café",
    r: "Cafeteria · Visakhapatnam",
  },
];

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const row = [...QUOTES, ...QUOTES];

  return (
    <section id="gallery" className="relative overflow-hidden border-y border-line bg-bg-soft py-28">
      <div className="pointer-events-none absolute -left-32 top-24 h-[420px] w-[420px] rounded-full bg-blue/10 blur-[150px]" />
      <div className="pointer-events-none absolute -right-24 bottom-24 h-[420px] w-[420px] rounded-full bg-violet/10 blur-[150px]" />

      <div className="mx-auto max-w-7xl px-6">
        {/* header */}
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue">
              Gallery
            </p>
          </Reveal>
          <AnimatedHeading
            text="Real installations, real homes"
            className="font-display mt-3 text-4xl font-bold sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-4 text-muted">
              Every photo below is from an actual Aaro Tec installation —
              followed by what those customers had to say.
            </p>
          </Reveal>
        </div>

        {/* installation image grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-5">
          {INSTALLS.map((g, i) => (
            <Reveal key={g.src} delay={(i % 3) * 0.06}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl border border-line bg-panel card-shadow"
              >
                <Image
                  src={g.src}
                  alt={g.caption}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 380px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/0 to-black/0" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                  <p className="translate-y-1 text-sm font-semibold text-white opacity-90 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {g.caption}
                  </p>
                </div>
                <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        {/* testimonials */}
        <div className="mt-20">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber">
              Loved at home
            </p>
          </Reveal>
          <AnimatedHeading
            text="Hear from our customers"
            className="font-display mt-3 max-w-2xl text-4xl font-bold sm:text-5xl"
          />
        </div>
      </div>

      <div className="relative mt-12 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg-soft to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg-soft to-transparent" />
        <motion.div
          className="flex gap-5"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 36, ease: "linear" }}
        >
          {row.map((t, i) => (
            <figure
              key={i}
              className="card-shadow w-[340px] shrink-0 rounded-3xl border border-line bg-panel p-7"
            >
              <div className="text-amber">★★★★★</div>
              <blockquote className="mt-4 text-sm leading-relaxed text-text">
                “{t.q}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet to-blue text-sm font-semibold text-white">
                  {t.n[0]}
                </span>
                <div>
                  <div className="text-sm font-semibold">{t.n}</div>
                  <div className="text-xs text-muted">{t.r}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
      <p className="mt-6 text-center text-xs text-muted">
        Sample testimonials shown for demonstration.
      </p>

      {/* lightbox */}
      {active !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <button
            aria-label="Close"
            onClick={() => setActive(null)}
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[88vh] w-full max-w-3xl flex-col items-center"
          >
            <div className="relative h-[78vh] w-full">
              <Image
                src={INSTALLS[active].src}
                alt={INSTALLS[active].caption}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <p className="mt-4 text-center text-sm font-medium text-white/80">
              {INSTALLS[active].caption}
            </p>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
