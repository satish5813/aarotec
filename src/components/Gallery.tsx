"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

const SLIDE_MS = 5200;

export default function Gallery() {
  const [cat, setCat] = useState<Category>("all");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const shots = useMemo(
    () => (cat === "all" ? SHOTS : SHOTS.filter((s) => s.cat === cat)),
    [cat]
  );
  const n = shots.length;
  const shot = shots[index] ?? shots[0];

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + n) % n);

  // Only run the show while the stage is actually on screen.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto-advance in sync with the progress bar; pause when off-screen,
  // hovered, or while the lightbox is open.
  useEffect(() => {
    if (!inView || paused || active !== null) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % n), SLIDE_MS);
    return () => clearInterval(t);
  }, [inView, paused, active, n]);

  // Keep the active thumbnail centred by scrolling ONLY the filmstrip —
  // scrollIntoView would scroll the whole page to the gallery.
  useEffect(() => {
    const strip = stripRef.current;
    const thumb = thumbRefs.current[index];
    if (!strip || !thumb) return;
    strip.scrollTo({
      left: thumb.offsetLeft - (strip.clientWidth - thumb.clientWidth) / 2,
      behavior: "smooth",
    });
  }, [index]);

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

  return (
    <section id="gallery" className="relative border-y border-line bg-bg-soft pt-28">
      <div className="mx-auto max-w-7xl px-6 pb-12">
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
      </div>

      {/* ── Cinematic full-bleed stage ────────────────────────── */}
      <div
        ref={stageRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative w-full overflow-hidden bg-[#07090f]"
      >
        {/* filters, floating on the dark stage */}
        <div className="absolute left-1/2 top-6 z-30 flex -translate-x-1/2 flex-wrap items-center justify-center gap-2 px-4">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => {
                setCat(f.key);
                setIndex(0);
                setActive(null);
              }}
              aria-pressed={cat === f.key}
              className={`relative rounded-full px-4 py-2 text-xs font-semibold backdrop-blur transition-colors duration-300 sm:text-sm ${
                cat === f.key
                  ? "text-[#0b0e18]"
                  : "border border-white/15 bg-white/5 text-white/70 hover:text-white"
              }`}
            >
              {cat === f.key && (
                <motion.span
                  layoutId="gallery-filter-pill"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.55 }}
                  className="absolute inset-0 rounded-full bg-white"
                />
              )}
              <span className="relative">{f.label}</span>
            </button>
          ))}
        </div>

        <div className="relative h-[62vh] min-h-[440px] w-full lg:h-[72vh]">
          {/* film crossfade + slow cinematic drift */}
          <AnimatePresence mode="sync">
            <motion.div
              key={`${cat}-${index}`}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.02, x: 0 }}
                animate={{
                  scale: 1.14,
                  x: index % 2 === 0 ? -26 : 26,
                }}
                transition={{ duration: SLIDE_MS / 1000 + 1.5, ease: "linear" }}
              >
                <Image
                  src={shot.src}
                  alt={shot.caption}
                  fill
                  priority={false}
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* cinematic vignette + letterbox gradients */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/55" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,transparent_55%,rgba(0,0,0,0.55)_100%)]" />

          {/* ghost slide numeral */}
          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 0.14, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
              className="pointer-events-none absolute right-6 top-14 font-display text-[7rem] font-bold leading-none text-white sm:right-12 sm:text-[10rem]"
            >
              {String(index + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>

          {/* caption — staggered word reveal */}
          <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-28 sm:px-12 sm:pb-30 lg:px-20">
            <AnimatePresence mode="wait">
              <motion.div key={`${cat}-${index}`} exit={{ opacity: 0, y: -14 }}>
                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                  className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60"
                >
                  {FILTERS.find((f) => f.key === shot.cat)?.label} ·{" "}
                  {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                </motion.p>
                <h3 className="mt-3 max-w-3xl overflow-hidden font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
                  {shot.caption.split(" ").map((w, wi) => (
                    <span key={wi} className="inline-block overflow-hidden pb-1 align-top">
                      <motion.span
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        transition={{
                          delay: 0.4 + wi * 0.055,
                          duration: 0.65,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="inline-block"
                      >
                        {w}&nbsp;
                      </motion.span>
                    </span>
                  ))}
                </h3>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* open-lightbox hit area + drag/swipe */}
          <motion.button
            aria-label="Open photo full screen"
            onClick={() => setActive(index)}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.14}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70) go(1);
              else if (info.offset.x > 70) go(-1);
            }}
            className="absolute inset-0 z-10 cursor-zoom-in"
          />

          {/* arrows */}
          <button
            aria-label="Previous photo"
            onClick={() => go(-1)}
            className="absolute left-4 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/8 text-white backdrop-blur transition hover:bg-white/20 sm:left-8"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            aria-label="Next photo"
            onClick={() => go(1)}
            className="absolute right-4 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/8 text-white backdrop-blur transition hover:bg-white/20 sm:right-8"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* slide progress bar */}
          <div className="absolute inset-x-0 bottom-[88px] z-20 px-6 sm:px-12 lg:px-20">
            <div className="h-px w-full overflow-hidden bg-white/15">
              {inView && !paused && active === null ? (
                <motion.div
                  key={`${cat}-${index}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
                  className="h-full origin-left bg-gradient-to-r from-violet to-sky"
                />
              ) : (
                <div className="h-full w-full origin-left scale-x-0 bg-white/40" />
              )}
            </div>
          </div>

          {/* filmstrip */}
          <div
            ref={stripRef}
            className="no-scrollbar absolute inset-x-0 bottom-0 z-20 flex gap-2.5 overflow-x-auto px-6 pb-5 pt-2 sm:px-12 lg:px-20"
          >
            {shots.map((s, i) => (
              <button
                key={s.src}
                ref={(el) => {
                  thumbRefs.current[i] = el;
                }}
                onClick={() => setIndex(i)}
                aria-label={`Go to ${s.caption}`}
                aria-current={index === i}
                className={`relative h-12 w-19 shrink-0 overflow-hidden rounded-lg transition-all duration-300 sm:h-14 sm:w-22 ${
                  index === i
                    ? "ring-2 ring-white"
                    : "opacity-45 hover:opacity-80"
                }`}
              >
                <Image src={s.src} alt="" fill sizes="96px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
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
