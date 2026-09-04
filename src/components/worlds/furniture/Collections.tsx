"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COLLECTIONS, FURNITURE_PRODUCTS, type Collection } from "@/data/furniture";
import { Reveal, Words } from "@/components/worlds/shared/motion";

gsap.registerPlugin(ScrollTrigger);

const ORDER: Collection[] = ["loop", "flow", "clutch", "nest", "wave", "wind"];

export default function Collections() {
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (reduce || !pin.current || !track.current) return;
      const distance = () => track.current!.scrollWidth - window.innerWidth;

      const tween = gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Parallax the images inside each panel against the track motion
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", track.current);
      panels.forEach((panel) => {
        const img = panel.querySelector<HTMLElement>("[data-img]");
        if (!img) return;
        gsap.fromTo(
          img,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });

      // Images load after mount; recalc once they're in
      const t = setTimeout(() => ScrollTrigger.refresh(), 600);
      return () => clearTimeout(t);
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="collections" className="relative">
      <div className="mx-auto max-w-[1400px] px-5 pt-24 sm:px-8 sm:pt-32">
        <Reveal>
          <p className="label text-hi">Six collections</p>
        </Reveal>
        <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Words text="Each one a single idea, carried through every piece." className="font-serif max-w-3xl text-4xl font-medium leading-[1] sm:text-5xl lg:text-6xl" />
          <p className="hidden text-xs uppercase tracking-[0.25em] text-muted lg:block">Scroll sideways →</p>
        </div>
      </div>

      {/* Pinned horizontal track on desktop; native horizontal scroll on touch */}
      <div ref={pin} className="mt-12 lg:h-screen lg:overflow-hidden">
        <div
          ref={track}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 sm:px-8 lg:h-full lg:snap-none lg:items-center lg:overflow-visible lg:pb-0 lg:pl-[max(2rem,calc((100vw-1400px)/2+2rem))]"
        >
          {ORDER.map((key, i) => {
            const c = COLLECTIONS[key];
            const count = FURNITURE_PRODUCTS.filter((p) => p.collection === key).length;
            return (
              <article
                key={key}
                data-panel
                className="group relative w-[84vw] shrink-0 snap-start overflow-hidden rounded-[2rem] border border-line bg-panel sm:w-[70vw] lg:h-[78vh] lg:w-[62vw] xl:w-[54vw]"
              >
                <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/11] lg:absolute lg:inset-0 lg:aspect-auto">
                  <div data-img className="absolute inset-[-10%]">
                    <Image src={c.hero} alt={`${c.name} collection`} fill sizes="(max-width: 1024px) 85vw, 60vw" className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
                </div>

                <div className="relative p-7 sm:p-9 lg:absolute lg:inset-x-0 lg:bottom-0 lg:flex lg:items-end lg:justify-between lg:gap-10 lg:p-12">
                  <div className="max-w-md">
                    <p className="font-mono text-xs text-muted">0{i + 1} / 0{ORDER.length}</p>
                    <h3 className="font-serif mt-2 text-5xl font-medium leading-none sm:text-6xl lg:text-7xl">
                      <span className="brass">{c.name}</span>
                    </h3>
                    <p className="mt-3 text-lg italic text-text/90">{c.idea}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{c.desc}</p>
                  </div>
                  <a
                    href={`#pieces`}
                    data-collection={key}
                    className="mt-6 inline-flex shrink-0 items-center gap-2 rounded-full border border-accent/50 px-5 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-fg lg:mt-0"
                  >
                    {count} {count === 1 ? "piece" : "pieces"}
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </a>
                </div>
              </article>
            );
          })}
          {/* end spacer so the last panel can centre */}
          <div className="hidden w-[8vw] shrink-0 lg:block" />
        </div>
      </div>
    </section>
  );
}
