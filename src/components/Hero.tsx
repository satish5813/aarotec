"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import {
  LightsIcon,
  ClimateIcon,
  SecurityIcon,
  EnergyIcon,
  CurtainsIcon,
  FanIcon,
} from "./icons";

const APPLIANCES = [
  { label: "Lights", Icon: LightsIcon },
  { label: "Climate", Icon: ClimateIcon },
  { label: "Curtains", Icon: CurtainsIcon },
  { label: "Fans", Icon: FanIcon },
  { label: "Security", Icon: SecurityIcon },
  { label: "Energy", Icon: EnergyIcon },
];

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as const },
});

function FloatCard({
  className,
  delay,
  children,
}: {
  className: string;
  delay: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={`pointer-events-none absolute z-20 ${className}`}
    >
      <div className={`float-slow ${delay}`}>
        <div className="glass card-shadow rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  // Live "Controls" rail — auto-cycles through appliances, pauses on hover,
  // and reacts to clicks so it feels like a running smart home.
  const [activeCtrl, setActiveCtrl] = useState(0);
  const [ctrlPaused, setCtrlPaused] = useState(false);

  useEffect(() => {
    if (ctrlPaused) return;
    const t = setInterval(
      () => setActiveCtrl((i) => (i + 1) % APPLIANCES.length),
      2000
    );
    return () => clearInterval(t);
  }, [ctrlPaused]);

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-paper pb-16 pt-24 sm:pb-20 sm:pt-28">
      {/* layered vibrant backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-30 aurora-modern opacity-90" />
      <div className="pointer-events-none absolute inset-0 -z-20 grid-fade opacity-[0.32]" />
      {/* top spotlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[60vh] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(124,58,237,0.12),transparent_70%)]" />
      {/* drifting glow orbs */}
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <div className="orb absolute -left-24 top-10 h-[380px] w-[380px] rounded-full bg-blue/25 blur-[130px] sm:h-[460px] sm:w-[460px]" />
        <div className="orb absolute right-[-12%] top-[26%] h-[400px] w-[400px] rounded-full bg-violet/25 blur-[140px] sm:h-[480px] sm:w-[480px]" />
        <div className="orb absolute bottom-[-10%] left-1/3 h-[320px] w-[320px] rounded-full bg-sky/15 blur-[130px]" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        {/* ───────────── copy ───────────── */}
        <div className="text-center lg:text-left">
          <motion.span
            {...fade(0)}
            className="glass card-shadow inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[11px] font-medium text-text sm:text-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky" />
            </span>
            Now shipping across India
            <span className="h-3 w-px bg-line" />
            <span className="font-semibold text-glow">7-year warranty</span>
          </motion.span>

          <motion.h1
            {...fade(0.08)}
            className="font-display mt-5 text-[2.6rem] font-bold leading-[1.02] tracking-[-0.03em] text-text sm:mt-6 sm:text-6xl lg:text-[5.1rem]"
          >
            Welcome Home,
            <br />
            <span className="text-glow">Smarter Than Ever.</span>
          </motion.h1>

          <motion.p
            {...fade(0.16)}
            className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted sm:mt-7 sm:text-lg lg:mx-0"
          >
            At Aaro Tec, we transform ordinary spaces into intelligent living
            environments with smart automation solutions tailored to your needs
            — without rewiring and without complexity.
          </motion.p>

          <motion.div
            {...fade(0.24)}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 lg:justify-start"
          >
            <a
              href="#products"
              className="btn-grad group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 sm:w-auto"
            >
              <span
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                aria-hidden
              />
              Explore the range
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#ecosystem"
              className="glass card-shadow group inline-flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold text-text transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full btn-grad text-white">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-0.5 h-3 w-3"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              See it in action
            </a>
          </motion.div>

          <motion.div
            {...fade(0.27)}
            className="mt-7 flex justify-center lg:justify-start"
          >
            <div className="glass card-shadow inline-flex flex-col items-center gap-x-5 gap-y-1.5 rounded-2xl px-6 py-4 sm:flex-row">
              <span className="text-sm text-muted">
                Transform your home with Aaro Tec smart solutions
              </span>
              <span className="hidden h-8 w-px bg-line sm:block" />
              <span className="flex items-baseline gap-2 whitespace-nowrap">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Starting at
                </span>
                <span className="font-display text-3xl font-bold leading-none text-glow sm:text-4xl">
                  ₹39,999
                </span>
              </span>
            </div>
          </motion.div>

          <motion.div
            {...fade(0.3)}
            className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
              Controls
            </span>
            <div
              className="flex items-center gap-2"
              onMouseEnter={() => setCtrlPaused(true)}
              onMouseLeave={() => setCtrlPaused(false)}
            >
              {APPLIANCES.map(({ label, Icon }, i) => {
                const on = i === activeCtrl;
                return (
                  <button
                    key={label}
                    type="button"
                    title={label}
                    aria-pressed={on}
                    aria-label={`${label} control`}
                    onClick={() => setActiveCtrl(i)}
                    className={`relative grid h-9 w-9 place-items-center rounded-xl transition-all duration-300 ${
                      on
                        ? "btn-grad scale-110 text-white shadow-[0_10px_24px_-8px_rgba(124,95,247,0.7)]"
                        : "glass text-muted hover:-translate-y-0.5 hover:text-text"
                    }`}
                  >
                    {on && (
                      <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-sky" />
                      </span>
                    )}
                    <Icon className="h-4.5 w-4.5" />
                  </button>
                );
              })}
            </div>
            <motion.span
              key={activeCtrl}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="text-xs font-semibold text-glow"
            >
              {APPLIANCES[activeCtrl].label} · live
            </motion.span>
          </motion.div>

          <motion.div
            {...fade(0.42)}
            className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-4 lg:justify-start"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {[
                  { i: "AR", c: "bg-[#5b7cfa]" },
                  { i: "VK", c: "bg-[#22d3ee]" },
                  { i: "MA", c: "bg-[#a855f7]" },
                  { i: "RT", c: "bg-[#6366f1]" },
                ].map((a) => (
                  <span
                    key={a.i}
                    className={`grid h-9 w-9 place-items-center rounded-full border-2 border-bg ${a.c} text-[10px] font-semibold text-white shadow-sm`}
                  >
                    {a.i}
                  </span>
                ))}
              </div>
              <div className="text-left text-sm">
                <div className="flex items-center gap-1 text-amber" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-3.5 w-3.5"
                    >
                      <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.1l-4.94 2.6.94-5.49-4-3.9 5.53-.8L10 1.5z" />
                    </svg>
                  ))}
                </div>
                <div className="mt-0.5 text-xs text-muted">
                  4.9/5 · loved by 120k+ homes
                </div>
              </div>
            </div>
            <div className="hidden h-10 w-px bg-line sm:block" />
            <div className="flex gap-6 sm:gap-8">
              {[
                ["45+", "Cities"],
                ["9+", "Years"],
                ["99.9%", "Uptime"],
              ].map(([n, l]) => (
                <div key={l} className="text-left">
                  <div className="font-display text-xl font-bold text-glow">
                    {n}
                  </div>
                  <div className="text-xs text-muted">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ───────────── premium product stage ───────────── */}
        <div className="relative mx-auto h-[54vh] min-h-[360px] w-full max-w-xl sm:h-[58vh] sm:min-h-[440px] lg:h-[66vh] lg:min-h-[540px] lg:max-w-none">
          {/* ambient brand glow behind the devices */}
          <div className="glow-ring glow-pulse pointer-events-none absolute left-1/2 top-1/2 -z-20 h-[78%] w-[84%] rounded-full opacity-55 blur-[48px]" />
          {/* soft ground shadow so the devices feel placed, not pasted */}
          <div className="pointer-events-none absolute bottom-[15%] left-1/2 -z-10 h-9 w-[62%] -translate-x-1/2 rounded-[50%] bg-ink/25 blur-2xl" />

          {/* transparent products float directly on the hero — no card, no box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="group relative h-full w-full"
          >
            <Image
              src="/hero_bg.png"
              alt="Aaro Tec smart-home product family — touch panels, hub, smart lock, sensors and the companion app"
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 50vw"
              className="object-contain object-center drop-shadow-[0_26px_36px_rgba(15,23,42,0.22)] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </motion.div>

          {/* floating live widget cards — tucked into the empty bands */}
          <FloatCard className="left-0 top-[1%] sm:-left-4" delay="">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue/15 text-blue">
                <ClimateIcon className="h-4.5 w-4.5" />
              </span>
              <div className="text-left">
                <div className="text-[11px] text-muted">Living · Climate</div>
                <div className="font-display text-lg font-bold leading-none text-text">
                  24°C
                </div>
              </div>
            </div>
          </FloatCard>

          <FloatCard className="right-0 top-[1%] sm:-right-5" delay="delay-2">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber/15 text-amber">
                <LightsIcon className="h-4.5 w-4.5" />
              </span>
              <div className="text-left">
                <div className="text-[11px] text-muted">Lights · 72%</div>
                <div className="mt-1.5 h-1.5 w-20 rounded-full bg-line">
                  <div className="h-1.5 w-[72%] rounded-full bg-gradient-to-r from-amber to-[#f4b860]" />
                </div>
              </div>
            </div>
          </FloatCard>

          <FloatCard className="bottom-[1%] left-0 sm:-left-5" delay="delay-1">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-sky/15 text-sky">
                <EnergyIcon className="h-4.5 w-4.5" />
              </span>
              <div className="text-left">
                <div className="text-[11px] text-muted">Energy saved</div>
                <div className="font-display text-lg font-bold leading-none text-text">
                  up to 25%
                </div>
              </div>
            </div>
          </FloatCard>

          <FloatCard className="bottom-[1%] right-0 sm:-right-4" delay="delay-3">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet/15 text-violet">
                <SecurityIcon className="h-4.5 w-4.5" />
              </span>
              <div className="text-left">
                <div className="text-[11px] text-muted">Front door</div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-text">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky" />
                  </span>
                  Secured
                </div>
              </div>
            </div>
          </FloatCard>
        </div>
      </div>

      {/* animated scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted">
          Scroll
        </span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-line p-1.5">
          <span className="scroll-dot h-1.5 w-1.5 rounded-full bg-violet" />
        </span>
      </motion.div>
    </section>
  );
}
