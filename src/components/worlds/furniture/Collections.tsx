"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "motion/react";
import { COLLECTIONS, FURNITURE_PRODUCTS, type Collection } from "@/data/furniture";
import { EASE, Reveal, Words } from "@/components/worlds/shared/motion";

gsap.registerPlugin(ScrollTrigger);

const ORDER: Collection[] = ["loop", "flow", "clutch", "nest", "wave", "wind"];
const N = ORDER.length;
const count = (k: Collection) => FURNITURE_PRODUCTS.filter((p) => p.collection === k).length;

/**
 * Six collections as one scroll-driven showcase. On desktop the stage pins
 * for six "beats": the index on the left tracks the active collection while
 * each new slide wipes up over the last and the detail card swaps. On touch
 * it degrades to a clean vertical stack.
 */
export default function Collections() {
  const stage = useRef<HTMLDivElement>(null);
  const slides = useRef<(HTMLDivElement | null)[]>([]);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const ghost = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (reduce || !stage.current) return;

      // Initial state: first slide shown, the rest waiting below the frame.
      slides.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { clipPath: i === 0 ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)", scale: i === 0 ? 1 : 1.12 });
        const img = el.querySelector("img");
        if (img) gsap.set(img, { yPercent: 0 });
      });
      cards.current.forEach((el, i) => el && gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, y: i === 0 ? 0 : 30 }));

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage.current,
          start: "top top",
          end: () => `+=${(N - 1) * 90}%`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(N - 1, Math.round(self.progress * (N - 1)));
            setActive((a) => (a === idx ? a : idx));
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      for (let i = 1; i < N; i++) {
        const t = i - 1;
        // The previous slide drifts up and dims a little while the next wipes over it.
        tl.to(slides.current[i - 1], { scale: 0.96, filter: "brightness(0.9)", duration: 1 }, t);
        tl.to(slides.current[i], { clipPath: "inset(0% 0 0 0)", scale: 1, duration: 1, ease: "power2.inOut" }, t);
        tl.to(cards.current[i - 1], { autoAlpha: 0, y: -30, duration: 0.4 }, t + 0.1);
        tl.to(cards.current[i], { autoAlpha: 1, y: 0, duration: 0.5 }, t + 0.5);
        if (ghost.current) tl.to(ghost.current, { xPercent: -8 * i, duration: 1 }, t);
      }

      const refresh = setTimeout(() => ScrollTrigger.refresh(), 600);
      return () => clearTimeout(refresh);
    });

    return () => mm.revert();
  }, []);

  const key = ORDER[active];
  const c = COLLECTIONS[key];

  return (
    <section id="collections" className="relative">
      {/* Header */}
      <div className="mx-auto max-w-[1400px] px-5 pt-24 sm:px-8 sm:pt-32">
        <Reveal>
          <p className="label text-hi">Six collections</p>
        </Reveal>
        <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Words text="Each one a single idea, carried through every piece." className="font-serif max-w-3xl text-4xl font-medium leading-[1] sm:text-5xl lg:text-6xl" />
          <Reveal>
            <p className="max-w-xs text-sm text-muted">
              Keep scrolling — the stage holds while the six collections take turns.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ── Desktop: pinned stage ─────────────────────────────────────── */}
      <div ref={stage} className="relative hidden h-screen items-center overflow-hidden lg:flex">
        {/* Ghost title behind everything */}
        <div ref={ghost} className="pointer-events-none absolute left-[38%] top-1/2 -translate-y-1/2 select-none whitespace-nowrap font-serif text-[22rem] font-medium leading-none text-transparent [-webkit-text-stroke:1px_rgba(15,21,43,0.08)]">
          {c.name}
        </div>

        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-[0.42fr_0.58fr] items-center gap-12 px-8">
          {/* Index */}
          <div className="relative">
            <ol className="space-y-1">
              {ORDER.map((k, i) => {
                const on = i === active;
                return (
                  <li key={k} className="flex items-baseline gap-4">
                    <span className={`font-mono w-8 text-xs transition-colors duration-500 ${on ? "text-hi" : "text-muted/60"}`}>0{i + 1}</span>
                    <span
                      className={`font-serif transition-all duration-500 ${on ? "brass translate-x-2 text-6xl font-medium" : "text-3xl text-muted/50"}`}
                    >
                      {COLLECTIONS[k].name}
                    </span>
                  </li>
                );
              })}
            </ol>

            <div className="mt-8 h-px w-full overflow-hidden bg-line">
              <div ref={bar} className="h-full w-full origin-left bg-gradient-to-r from-blue to-sky" style={{ transform: "scaleX(0)" }} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="mt-6"
              >
                <p className="font-serif text-2xl italic leading-snug">{c.idea}</p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{c.desc}</p>
                <a
                  href="#pieces"
                  data-collection={key}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg transition-transform hover:-translate-y-0.5"
                >
                  See {count(key)} {count(key) === 1 ? "piece" : "pieces"}
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Frame with stacked slides */}
          <div className="relative">
            <div className="card-shadow relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-line bg-ink">
              {ORDER.map((k, i) => (
                <div
                  key={k}
                  ref={(el) => {
                    slides.current[i] = el;
                  }}
                  className="absolute inset-0 will-change-[clip-path,transform]"
                >
                  <Image src={COLLECTIONS[k].hero} alt={`${COLLECTIONS[k].name} collection`} fill sizes="60vw" className="object-cover object-[center_62%] [filter:brightness(1.45)_contrast(1.05)_saturate(1.08)]" />
                </div>
              ))}
              {/* corner counter */}
              <div className="absolute right-5 top-5 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[11px] text-white/85 backdrop-blur">
                0{active + 1} / 0{N}
              </div>
            </div>

            {/* Detail card that swaps per collection */}
            <div className="absolute -bottom-8 -left-10 z-10 w-[46%]">
              {ORDER.map((k, i) => (
                <div
                  key={k}
                  ref={(el) => {
                    cards.current[i] = el;
                  }}
                  className="card-shadow absolute bottom-0 left-0 w-full overflow-hidden rounded-[1.5rem] border border-line bg-panel"
                >
                  <div className="relative aspect-[16/10]">
                    <Image src={COLLECTIONS[k].wide ?? COLLECTIONS[k].hero} alt="" fill sizes="30vw" className="object-cover object-[center_60%] [filter:brightness(1.35)]" />
                  </div>
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="font-serif text-xl font-medium">{COLLECTIONS[k].name}</span>
                    <span className="text-xs text-muted">{count(k)} pieces</span>
                  </div>
                </div>
              ))}
              {/* spacer to give the absolute cards height */}
              <div className="invisible">
                <div className="aspect-[16/10]" />
                <div className="h-[52px]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Touch: vertical stack ─────────────────────────────────────── */}
      <div className="mx-auto mt-10 grid max-w-[1400px] gap-5 px-5 sm:grid-cols-2 sm:px-8 lg:hidden">
        {ORDER.map((k, i) => (
          <Reveal key={k} delay={i * 0.05}>
            <article className="card-shadow overflow-hidden rounded-[1.75rem] border border-line bg-panel">
              <div className="relative aspect-[4/3]">
                <Image src={COLLECTIONS[k].hero} alt={`${COLLECTIONS[k].name} collection`} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
                <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 font-mono text-[10px] text-white/85 backdrop-blur">0{i + 1}</span>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-4xl font-medium"><span className="brass">{COLLECTIONS[k].name}</span></h3>
                <p className="mt-2 font-serif text-lg italic">{COLLECTIONS[k].idea}</p>
                <p className="mt-2 text-sm text-muted">{COLLECTIONS[k].desc}</p>
                <a href="#pieces" data-collection={k} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-hi">
                  See {count(k)} {count(k) === 1 ? "piece" : "pieces"} →
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
