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
};

const SHOTS: Shot[] = [
  { src: "/products/mocha-room.jpg", caption: "Mocha panel in a wood-panelled living room", cat: "interiors" },
  { src: "/gallery/panel-icons.jpg", caption: "One-touch scene controls", cat: "panels" },
  { src: "/products/mocha-lamp.jpg", caption: "Warm corners, smarter switches", cat: "interiors" },
  { src: "/gallery/lock-keypad.jpg", caption: "Fingerprint, PIN & RFID access", cat: "locks" },
  { src: "/gallery/panel-plant.jpg", caption: "Living room dual-panel setup", cat: "panels" },
  { src: "/products/mocha-touch.jpg", caption: "One touch on the Mocha panel", cat: "interiors" },
  { src: "/gallery/panel-wood.jpg", caption: "Switches & sockets in one glass", cat: "panels" },
  { src: "/gallery/lock-handle.jpg", caption: "Premium matte-black lever", cat: "locks" },
  { src: "/products/mocha-wood.jpg", caption: "Flush fit in fluted wood", cat: "interiors" },
  { src: "/gallery/panel-8scene.jpg", caption: "8-scene glass touch panel", cat: "panels" },
  { src: "/gallery/lock-display.jpg", caption: "Smart display, one-touch open", cat: "locks" },
  { src: "/gallery/panel-7way.jpg", caption: "Seven-way touch switchboard", cat: "panels" },
  { src: "/products/mocha-shelf.jpg", caption: "Design that disappears into the decor", cat: "interiors" },
  { src: "/gallery/panel-socket.jpg", caption: "Smart socket with built-in USB", cat: "panels" },
  { src: "/gallery/lock-installed.jpg", caption: "Seamless on-door fit", cat: "locks" },
  { src: "/gallery/panel-bedside.jpg", caption: "Bedside touch panel", cat: "panels" },
  { src: "/gallery/panel-fan.jpg", caption: "Light & fan control panel", cat: "panels" },
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
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const row = [...QUOTES, ...QUOTES];

  const shots = useMemo(
    () => (cat === "all" ? SHOTS : SHOTS.filter((s) => s.cat === cat)),
    [cat]
  );
  const n = shots.length;

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + n) % n);

  // Auto-rotate the carousel; pause on hover or while the lightbox is open.
  useEffect(() => {
    if (paused || active !== null) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % n), 3600);
    return () => clearInterval(t);
  }, [paused, active, n]);

  // Keyboard navigation while the lightbox is open.
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((a) => (a === null ? a : (a + 1) % n));
      if (e.key === "ArrowLeft") setActive((a) => (a === null ? a : (a - 1 + n) % n));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active === null, n]); // eslint-disable-line react-hooks/exhaustive-deps

  // Signed distance from the centre card, wrapping around the ring.
  const offsetOf = (i: number) => {
    const raw = (i - index + n) % n;
    return raw > n / 2 ? raw - n : raw;
  };

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
                  setIndex(0);
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
      </div>

      {/* ── 3D coverflow carousel ─────────────────────────────── */}
      <Reveal delay={0.2}>
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative mt-10 h-[440px] w-full select-none sm:h-[500px] lg:h-[540px]"
          style={{ perspective: "1400px" }}
        >
          {shots.map((g, i) => {
            const off = offsetOf(i);
            const visible = Math.abs(off) <= 2;
            const isCenter = off === 0;
            return (
              <motion.div
                key={g.src}
                animate={{
                  x: `calc(-50% + ${off * 46}%)`,
                  scale: isCenter ? 1 : Math.abs(off) === 1 ? 0.82 : 0.68,
                  rotateY: off * -28,
                  opacity: visible ? (isCenter ? 1 : 0.75) : 0,
                  zIndex: 10 - Math.abs(off),
                  filter: isCenter
                    ? "brightness(1) saturate(1)"
                    : "brightness(0.72) saturate(0.75)",
                }}
                transition={{ type: "spring", bounce: 0.22, duration: 0.85 }}
                onClick={() => (isCenter ? setActive(i) : setIndex(i))}
                role="button"
                tabIndex={visible ? 0 : -1}
                aria-label={isCenter ? `Open ${g.caption}` : `Show ${g.caption}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") isCenter ? setActive(i) : setIndex(i);
                }}
                className={`absolute left-1/2 top-0 h-[82%] w-[240px] cursor-pointer overflow-hidden rounded-3xl border border-line bg-panel shadow-[0_30px_60px_-25px_rgba(15,21,43,0.45)] sm:w-[300px] lg:w-[340px] ${
                  visible ? "" : "pointer-events-none"
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Image
                  src={g.src}
                  alt={g.caption}
                  fill
                  sizes="340px"
                  className="object-cover"
                />
                {/* glass sheen on non-centre cards */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-white/10 transition-opacity duration-500 ${
                    isCenter ? "opacity-30" : "opacity-70"
                  }`}
                />
                {isCenter && (
                  <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </motion.div>
            );
          })}

          {/* drag/swipe layer behind the cards' click targets */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
            className="absolute inset-0 z-0"
          />

          {/* arrows */}
          <button
            aria-label="Previous photo"
            onClick={() => go(-1)}
            className="card-shadow absolute left-4 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-panel/90 text-text backdrop-blur transition hover:bg-panel sm:left-10 lg:left-16"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            aria-label="Next photo"
            onClick={() => go(1)}
            className="card-shadow absolute right-4 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-panel/90 text-text backdrop-blur transition hover:bg-panel sm:right-10 lg:right-16"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* caption + dots under the centre card */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${cat}-${index}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="text-center"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                  {FILTERS.find((f) => f.key === shots[index]?.cat)?.label}
                </p>
                <p className="mt-1 font-display text-base font-semibold text-text sm:text-lg">
                  {shots[index]?.caption}
                </p>
              </motion.div>
            </AnimatePresence>
            <div className="flex items-center gap-2">
              {shots.map((s, i) => (
                <button
                  key={s.src}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to photo ${i + 1}`}
                  className="relative h-2 overflow-hidden rounded-full bg-line transition-all duration-300"
                  style={{ width: index === i ? 34 : 8 }}
                >
                  {index === i && (
                    <motion.span
                      layoutId="gallery-dot"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-violet to-blue"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <div className="mx-auto max-w-7xl px-6">
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
                setActive((a) => (a === null ? a : (a - 1 + n) % n));
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
                setActive((a) => (a === null ? a : (a + 1) % n));
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
                  {active + 1} / {n}
                </span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
