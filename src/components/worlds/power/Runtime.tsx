"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { APPLIANCES, POWER_PRODUCTS } from "@/data/power";
import { EASE, Reveal, Words } from "@/components/worlds/shared/motion";

/** Inverter losses and BMS reserve — real-world usable energy is ~85%. */
const EFFICIENCY = 0.85;

function hoursLabel(h: number) {
  if (!isFinite(h)) return "—";
  if (h >= 48) return `${Math.round(h / 24)} days`;
  if (h >= 1) return `${h.toFixed(h >= 10 ? 0 : 1)} h`;
  return `${Math.round(h * 60)} min`;
}

export default function Runtime() {
  const [slug, setSlug] = useState("delta-3");
  const [on, setOn] = useState<Set<string>>(new Set(["Wi-Fi router", "Ceiling fan", "43\" LED TV"]));
  const product = POWER_PRODUCTS.find((p) => p.slug === slug)!;

  const load = useMemo(() => APPLIANCES.filter((a) => on.has(a.name)).reduce((s, a) => s + a.w, 0), [on]);
  const hours = load > 0 ? (product.capacityWh * EFFICIENCY) / load : Infinity;
  const overload = load > product.surgeW;
  const heavy = load > product.outputW && !overload;
  const fill = load === 0 ? 0 : Math.min(1, load / product.surgeW);

  const toggle = (name: string) =>
    setOn((s) => {
      const n = new Set(s);
      if (n.has(name)) n.delete(name);
      else n.add(name);
      return n;
    });

  return (
    <section id="runtime" className="relative overflow-hidden bg-bg-soft py-24 sm:py-32">
      <div className="grid-paper pointer-events-none absolute inset-0 opacity-80" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[40rem] w-[40rem] rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(closest-side, var(--glow), transparent)" }} />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="label text-hi">Runtime estimator</p>
          </Reveal>
          <Words text="How long will it actually run?" className="font-display mt-4 text-4xl font-bold leading-[1.02] sm:text-5xl lg:text-6xl" />
          <Reveal delay={0.1}>
            <p className="mt-5 text-muted">
              Pick a unit, switch on what you&apos;d plug in. We factor in an 85% real-world efficiency so the estimate is honest, not optimistic.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* Unit picker */}
          <div className="card-shadow rounded-[1.75rem] border border-line bg-panel p-6 sm:p-8">
            <p className="label text-muted">1 · Choose a unit</p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {POWER_PRODUCTS.map((p) => (
                <button
                  key={p.slug}
                  onClick={() => setSlug(p.slug)}
                  className={`rounded-xl border px-3 py-2.5 text-left text-xs transition-colors ${
                    slug === p.slug ? "border-accent bg-accent text-accent-fg" : "border-line text-muted hover:border-text hover:text-text"
                  }`}
                >
                  <span className="block font-semibold">{p.name}</span>
                  <span className="font-mono opacity-70">{p.capacityWh.toLocaleString("en-IN")} Wh</span>
                </button>
              ))}
            </div>

            <p className="label mt-8 text-muted">2 · Switch on appliances</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {APPLIANCES.map((a) => {
                const active = on.has(a.name);
                return (
                  <button
                    key={a.name}
                    onClick={() => toggle(a.name)}
                    aria-pressed={active}
                    className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs transition-colors ${
                      active ? "border-accent/50 bg-accent/10 text-text" : "border-line text-muted hover:border-text"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-accent" : "bg-line"}`} />
                    {a.name}
                    <span className="font-mono opacity-60">{a.w} W</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Read-out */}
          <div className="card-shadow relative overflow-hidden rounded-[1.75rem] border border-line bg-panel p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="label text-muted">Estimated runtime</p>
                <AnimatePresence mode="popLayout">
                  <motion.p
                    key={`${slug}-${load}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="font-mono mt-2 text-5xl font-medium tracking-tight sm:text-6xl"
                  >
                    {overload ? "—" : hoursLabel(hours)}
                  </motion.p>
                </AnimatePresence>
                <p className="mt-2 text-sm text-muted">
                  {load === 0
                    ? "Switch on an appliance to begin."
                    : overload
                      ? `Over the ${product.surgeW.toLocaleString("en-IN")} W limit — choose a DELTA or remove a heavy load.`
                      : heavy
                        ? `Running on X-Boost (${load.toLocaleString("en-IN")} W). Fine for short bursts.`
                        : `${load.toLocaleString("en-IN")} W total load on ${product.name}.`}
                </p>
              </div>
              <div className="cutout relative h-24 w-24 shrink-0 sm:h-32 sm:w-32">
                <Image src={product.images[0]} alt={product.name} fill sizes="128px" className="object-contain" />
              </div>
            </div>

            {/* Load bar */}
            <div className="mt-8">
              <div className="flex justify-between font-mono text-[11px] text-muted">
                <span>0 W</span>
                <span>{product.outputW.toLocaleString("en-IN")} W rated</span>
                <span>{product.surgeW.toLocaleString("en-IN")} W boost</span>
              </div>
              <div className="relative mt-2 h-3 overflow-hidden rounded-full bg-bg-soft">
                <motion.div
                  className={`h-full rounded-full ${overload ? "bg-red-500" : heavy ? "bg-amber" : "bg-gradient-to-r from-blue to-sky"}`}
                  animate={{ width: `${fill * 100}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                />
                <span className="absolute top-0 h-full w-px bg-text/40" style={{ left: `${(product.outputW / product.surgeW) * 100}%` }} />
              </div>
            </div>

            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6 text-sm">
              <div>
                <dt className="text-muted">Capacity</dt>
                <dd className="font-mono mt-1">{product.capacityWh.toLocaleString("en-IN")} Wh</dd>
              </div>
              <div>
                <dt className="text-muted">Recharge</dt>
                <dd className="font-mono mt-1">{product.chargeMinutes} min</dd>
              </div>
              <div>
                <dt className="text-muted">Weight</dt>
                <dd className="font-mono mt-1">{product.weightKg} kg</dd>
              </div>
            </dl>

            <a href="#contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-fg transition-transform hover:-translate-y-0.5">
              Get this sized for my home
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
