"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import Reveal from "./Reveal";
import AnimatedHeading from "./AnimatedHeading";

// Curated, colour-corrected installation photography (public/gallery is
// the enhanced set — the rough phone originals stay out of the site).
type Category = "all" | "interiors" | "panels" | "locks";

type Shot = {
  src: string;
  caption: string;
  cat: Exclude<Category, "all">;
  w: number;
  h: number;
};

const SHOTS: Shot[] = [
  { src: "/products/mocha-room.jpg", caption: "Mocha panel in a wood-panelled living room", cat: "interiors", w: 1600, h: 1067 },
  { src: "/gallery/panel-icons.jpg", caption: "One-touch scene controls", cat: "panels", w: 1200, h: 1600 },
  { src: "/products/mocha-lamp.jpg", caption: "Warm corners, smarter switches", cat: "interiors", w: 1200, h: 1800 },
  { src: "/gallery/lock-keypad.jpg", caption: "Fingerprint, PIN & RFID access", cat: "locks", w: 720, h: 1280 },
  { src: "/gallery/panel-plant.jpg", caption: "Living room dual-panel setup", cat: "panels", w: 1200, h: 1600 },
  { src: "/products/mocha-touch.jpg", caption: "One touch on the Mocha panel", cat: "interiors", w: 1200, h: 1200 },
  { src: "/gallery/panel-wood.jpg", caption: "Switches & sockets in one glass", cat: "panels", w: 1200, h: 900 },
  { src: "/gallery/lock-handle.jpg", caption: "Premium matte-black lever", cat: "locks", w: 1200, h: 1600 },
  { src: "/products/mocha-wood.jpg", caption: "Flush fit in fluted wood", cat: "interiors", w: 1200, h: 1600 },
  { src: "/gallery/panel-8scene.jpg", caption: "8-scene glass touch panel", cat: "panels", w: 1200, h: 900 },
  { src: "/gallery/lock-display.jpg", caption: "Smart display, one-touch open", cat: "locks", w: 720, h: 1280 },
  { src: "/gallery/panel-7way.jpg", caption: "Seven-way touch switchboard", cat: "panels", w: 1200, h: 675 },
  { src: "/products/mocha-shelf.jpg", caption: "Design that disappears into the decor", cat: "interiors", w: 1200, h: 1800 },
  { src: "/gallery/panel-socket.jpg", caption: "Smart socket with built-in USB", cat: "panels", w: 1200, h: 900 },
  { src: "/gallery/lock-installed.jpg", caption: "Seamless on-door fit", cat: "locks", w: 1200, h: 1600 },
  { src: "/gallery/panel-bedside.jpg", caption: "Bedside touch panel", cat: "panels", w: 1061, h: 533 },
  { src: "/gallery/panel-fan.jpg", caption: "Light & fan control panel", cat: "panels", w: 1200, h: 675 },
];

const FILTERS: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "interiors", label: "Interiors" },
  { key: "panels", label: "Switch Panels" },
  { key: "locks", label: "Smart Locks" },
];

const QUOTES = [
  {
    q: "Using Whitelion has made daily life much more convenient. The touch panels look premium, the app control works smoothly, and the automation scenes are really useful. Integration with Alexa and Google Assistant is seamless. Overall, a great smart home experience with a modern feel.",
    n: "Vishal .D",
  },
  {
    q: "I’ve been using Whitelion System’s home automation products in my office, and the quality is truly impressive. The controls work flawlessly, and the luxury wall finish gives the space a premium, modern look.",
    n: "Kartik Kukadiya",
  },
  {
    q: "I never expected home automation will be this good, thanks a lot for the WHITELION and making our home secured and anesthetic. And thanks a lot Technical Consultant @ Mr. Vishal for good coordination.",
    n: "PRANAYSAI UPPU",
  },
  {
    q: "I’ve been using the Whitelion Touch Switch for a while, and I’m genuinely impressed by its performance and sleek design. The capacitive touch response is smooth and highly accurate, offering a premium feel every time. It works flawlessly with both IR remotes and smartphone control, making it ideal for modern smart homes.",
    n: "Prabhatkumar Yadav",
  },
];

export default function Gallery() {
  const [cat, setCat] = useState<Category>("all");
  const [expanded, setExpanded] = useState(0);
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const row = [...QUOTES, ...QUOTES];

  // Accordion works best with a handful of strips — show the best 7.
  const shots = useMemo(
    () =>
      (cat === "all" ? SHOTS : SHOTS.filter((s) => s.cat === cat)).slice(0, 7),
    [cat]
  );

  // Auto-cycle through the strips like a slow slideshow; pause on hover
  // or while the lightbox is open.
  useEffect(() => {
    if (paused || active !== null) return;
    const t = setInterval(
      () => setExpanded((e) => (e + 1) % shots.length),
      3800
    );
    return () => clearInterval(t);
  }, [paused, active, shots.length]);

  const step = (dir: 1 | -1) => {
    setActive((a) => (a === null ? a : (a + dir + shots.length) % shots.length));
  };

  // Keyboard navigation while the lightbox is open.
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active === null, shots.length]);

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

        {/* category filter */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => {
                  setCat(f.key);
                  setExpanded(0);
                  setActive(null);
                }}
                aria-pressed={cat === f.key}
                className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                  cat === f.key
                    ? "text-cta-fg"
                    : "border border-line bg-panel text-muted hover:text-text"
                }`}
              >
                {cat === f.key && (
                  <motion.span
                    layoutId="gallery-filter-pill"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.55 }}
                    className="absolute inset-0 rounded-full bg-cta"
                  />
                )}
                <span className="relative">{f.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* expanding-strips gallery — hover/tap a strip and it grows wide */}
        <motion.div
          key={cat}
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="mt-8 flex h-[560px] flex-col gap-3 md:h-[540px] md:flex-row lg:h-[600px] lg:gap-4"
        >
          {shots.map((g, i) => {
            const isOpen = expanded === i;
            return (
              <motion.div
                key={g.src}
                variants={{
                  hidden: { opacity: 0, y: 34 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                style={{ flexGrow: isOpen ? 7 : 1, flexBasis: 0 }}
                onMouseEnter={() => setExpanded(i)}
                onFocus={() => setExpanded(i)}
                onClick={() => (isOpen ? setActive(i) : setExpanded(i))}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                aria-label={g.caption}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (isOpen) setActive(i);
                    else setExpanded(i);
                  }
                }}
                className="group relative min-h-0 min-w-0 cursor-pointer overflow-hidden rounded-3xl border border-line bg-panel card-shadow transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              >
                {/* slow ken-burns drift while a strip is expanded */}
                <motion.div
                  className="absolute inset-0"
                  animate={
                    isOpen
                      ? { scale: [1.02, 1.09], x: [0, -8] }
                      : { scale: 1.14, x: 0 }
                  }
                  transition={
                    isOpen
                      ? { duration: 7, ease: "linear" }
                      : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
                  }
                >
                  <Image
                    src={g.src}
                    alt={g.caption}
                    fill
                    sizes="(max-width: 768px) 94vw, 1200px"
                    className={`object-cover transition-[filter] duration-700 ease-out ${
                      isOpen
                        ? "brightness-100 saturate-100"
                        : "brightness-[0.78] saturate-[0.75] group-hover:brightness-90"
                    }`}
                  />
                </motion.div>
                {/* legibility gradient */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/10 transition-opacity duration-500 ${
                    isOpen ? "opacity-100" : "opacity-40"
                  }`}
                />

                {/* expanded caption */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 26 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 14 }}
                      transition={{
                        type: "spring",
                        bounce: 0.3,
                        duration: 0.7,
                        delay: 0.18,
                      }}
                      className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 lg:p-6"
                    >
                      <div className="min-w-0">
                        <motion.p
                          initial={{ opacity: 0, x: -14 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3, duration: 0.45 }}
                          className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60"
                        >
                          {FILTERS.find((f) => f.key === g.cat)?.label}
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0, x: -14 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.38, duration: 0.45 }}
                          className="mt-1 truncate text-base font-semibold text-white lg:text-lg"
                        >
                          {g.caption}
                        </motion.p>
                      </div>
                      <motion.span
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", bounce: 0.5, delay: 0.35 }}
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* collapsed index chip */}
                <span
                  className={`absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-black/35 px-2.5 py-1 font-display text-[11px] font-bold text-white/85 backdrop-blur transition-opacity duration-300 md:top-auto md:bottom-4 ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* testimonials */}
        <div className="mt-20">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber">
              Loved at home
            </p>
          </Reveal>
          <AnimatedHeading
            text="Customer Reviews"
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
                <div className="text-sm font-semibold">{t.n}</div>
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
      {/* lightbox */}
      <AnimatePresence>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
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
          <button
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <motion.div
            key={shots[active].src}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[88vh] w-full max-w-4xl flex-col items-center"
          >
            <div className="relative h-[76vh] w-full">
              <Image
                src={shots[active].src}
                alt={shots[active].caption}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <p className="mt-4 text-center text-sm font-medium text-white/85">
              {shots[active].caption}
              <span className="ml-3 text-white/45">
                {active + 1} / {shots.length}
              </span>
            </p>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </section>
  );
}
