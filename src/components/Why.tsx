"use client";

import Reveal from "./Reveal";
import AnimatedHeading from "./AnimatedHeading";

const POINTS = [
  {
    k: "No rewiring",
    t: "Retrofit in minutes",
    d: "Works with your existing wiring — no breaking walls, no mess, no electrician marathons.",
  },
  {
    k: "Up to 25%",
    t: "Energy efficient",
    d: "Smart scheduling and automation trim wasteful usage, cutting your energy bills by as much as 25%.",
  },
  {
    k: "Optimal",
    t: "Solutions, tailored",
    d: "Right-sized automation for every room — the perfect balance of comfort, control and cost.",
  },
  {
    k: "24/7",
    t: "Security & safety",
    d: "End-to-end encrypted, local-first control with always-on monitoring so your home stays safe.",
  },
];

export default function Why() {
  return (
    <section id="why" className="mx-auto max-w-7xl px-6 py-28">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber">
              Why Aaro Tec
            </p>
          </Reveal>
          <AnimatedHeading
            text="Engineered to disappear into your home"
            className="font-display mt-3 text-4xl font-bold sm:text-5xl"
          />
          <p className="mt-5 max-w-md text-muted">
            Great technology is the kind you stop noticing. Aaro Tec
            blends premium materials, fast local intelligence and a calm
            interface so the home just works — for years.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-flex rounded-full bg-cta px-7 py-3.5 text-sm font-semibold text-cta-fg transition-transform hover:scale-[1.03]"
          >
            Talk to our team
          </a>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {POINTS.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.07}>
              <div className="card-shadow h-full rounded-2xl border border-line bg-panel p-7">
                <div className="font-display text-3xl font-bold text-gradient">
                  {p.k}
                </div>
                <h3 className="mt-4 font-semibold">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {p.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
