"use client";

import {
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
  type ComponentType,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import Reveal from "./Reveal";
import AnimatedHeading from "./AnimatedHeading";
import CanvasErrorBoundary from "./three/CanvasErrorBoundary";
import type { ProductId } from "./three/ProductModels";
import { useSelectedProduct, selectProduct } from "./productStore";

const Scene = lazy(
  () => import("./three/ProductGalleryScene")
) as ComponentType<{ id: ProductId }>;

const LOOP_MS = 4500;

const PRODUCTS: { id: ProductId; name: string; tag: string; desc: string }[] = [
  {
    id: "posh",
    name: "Posh",
    tag: "Smart touch panel",
    desc: "Graphite glass with a 2×2 ambient touch grid — the everyday flagship.",
  },
  {
    id: "quartz",
    name: "Quartz",
    tag: "Frameless glass",
    desc: "A tall, slim frameless panel with a bright face and a glow slider.",
  },
  {
    id: "airtouch",
    name: "AirTouch",
    tag: "Matte control panel",
    desc: "Wide anti-glare matte panel with a 6-zone amber touch grid.",
  },
  {
    id: "airglass",
    name: "AirGlass",
    tag: "Master controller",
    desc: "Champagne-bezel master panel with a large dial and scene keys.",
  },
  {
    id: "airsensor",
    name: "AirSensor",
    tag: "360° detection",
    desc: "Domed presence + lux sensor with a glowing detection ring.",
  },
  {
    id: "airblaster",
    name: "AirBlaster",
    tag: "Wi-Fi IR blaster",
    desc: "A 360° infrared puck that brings legacy appliances onto the app.",
  },
  {
    id: "airlock",
    name: "AirLock",
    tag: "5-in-1 smart lock",
    desc: "Fingerprint, PIN, card, key and app — security made effortless.",
  },
  {
    id: "airhome",
    name: "AirHome",
    tag: "All-in-one app",
    desc: "The control surface for the whole ecosystem, in your pocket.",
  },
  {
    id: "accessories",
    name: "Accessories",
    tag: "Modules & add-ons",
    desc: "Gang modules and add-ons that complete the automation setup.",
  },
];

function Loader() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-[#2f6bff]" />
    </div>
  );
}

function Fallback({ name }: { name: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="card-shadow flex aspect-[5/7] w-[220px] flex-col justify-between rounded-[26px] border border-line bg-card p-6">
        <span className="h-2 w-2 rounded-full bg-[#2f6bff]" />
        <div className="grid grid-cols-2 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="brand-gradient mx-auto h-8 w-8 rounded-full opacity-80"
            />
          ))}
        </div>
        <p className="text-center text-xs text-muted">{name}</p>
      </div>
    </div>
  );
}

export default function Product3D() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const selected = useSelectedProduct();
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setMounted(true), []);

  const holdLoop = () => {
    setPaused(true);
    if (resumeRef.current) clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(() => setPaused(false), 14000);
  };

  // external selection (clicking a product card) jumps to that model
  useEffect(() => {
    const idx = PRODUCTS.findIndex((p) => p.id === selected);
    if (idx >= 0) {
      setActive(idx);
      holdLoop();
    }
  }, [selected]);

  // branded auto-tour loop
  useEffect(() => {
    if (!mounted || paused) return;
    const t = setInterval(
      () => setActive((a) => (a + 1) % PRODUCTS.length),
      LOOP_MS
    );
    return () => clearInterval(t);
  }, [mounted, paused]);

  const pick = (i: number) => {
    setActive(i);
    selectProduct(PRODUCTS[i].id);
    holdLoop();
  };

  const p = PRODUCTS[active];

  return (
    <section
      id="explore-3d"
      className="relative overflow-hidden border-y border-line bg-bg-soft py-28"
    >
      <div className="pointer-events-none bloom-blue absolute left-1/2 top-[22%] -z-10 h-[90vmin] w-[90vmin] -translate-x-1/2" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] brand-text">
                Explore in 3D
              </p>
            </Reveal>
            <AnimatedHeading
              text="Spin every product in real time"
              className="font-display mt-3 max-w-2xl text-4xl font-bold sm:text-5xl"
            />
          </div>
          <button
            onClick={() => (paused ? setPaused(false) : holdLoop())}
            className="card-shadow inline-flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-2 text-xs font-semibold"
          >
            <span
              className={`h-2 w-2 rounded-full ${
                paused ? "bg-muted" : "brand-gradient animate-pulse"
              }`}
            />
            {paused ? "Resume auto-tour" : "Auto-tour on"}
          </button>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* 3D stage */}
          <div className="card-shadow relative h-[460px] overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-bg to-bg-soft sm:h-[560px]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00d6e6]/10 blur-3xl" />

            {mounted ? (
              <CanvasErrorBoundary fallback={<Fallback name={p.name} />}>
                <Suspense fallback={<Loader />}>
                  <Scene id={p.id} />
                </Suspense>
              </CanvasErrorBoundary>
            ) : (
              <Loader />
            )}

            {/* loop progress bar */}
            <div className="absolute inset-x-0 top-0 h-1 bg-line/40">
              <motion.div
                key={`${active}-${paused}`}
                initial={{ width: "0%" }}
                animate={{ width: paused ? "0%" : "100%" }}
                transition={{
                  duration: paused ? 0 : LOOP_MS / 1000,
                  ease: "linear",
                }}
                className="brand-gradient h-full"
              />
            </div>

            <div className="pointer-events-none absolute bottom-5 left-6 right-6 flex items-end justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-xs uppercase tracking-widest brand-text">
                    {p.tag}
                  </p>
                  <p className="font-display text-2xl font-bold">{p.name}</p>
                </motion.div>
              </AnimatePresence>
              <span className="text-[11px] text-muted">
                live · auto-rotating
              </span>
            </div>
          </div>

          {/* selector */}
          <div>
            <div className="grid grid-cols-2 gap-3">
              {PRODUCTS.map((pr, i) => (
                <button
                  key={pr.id}
                  onClick={() => pick(i)}
                  className={`card-shadow relative overflow-hidden rounded-2xl border p-4 text-left transition ${
                    active === i
                      ? "border-transparent text-white"
                      : "border-line bg-panel text-text hover:bg-bg-soft"
                  }`}
                >
                  {active === i && (
                    <span className="brand-gradient absolute inset-0 z-0" />
                  )}
                  <span className="relative font-display text-sm font-bold">
                    {pr.name}
                  </span>
                  <span
                    className={`relative mt-1 block text-[11px] ${
                      active === i ? "text-white/80" : "text-muted"
                    }`}
                  >
                    {pr.tag}
                  </span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="card-shadow mt-5 rounded-2xl border border-line bg-panel p-6"
              >
                <p className="text-xs uppercase tracking-widest brand-text">
                  {p.name}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {p.desc}
                </p>
                <a
                  href="#contact"
                  className="brand-gradient mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Enquire about {p.name}
                  <span>→</span>
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
