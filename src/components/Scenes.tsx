"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Reveal from "./Reveal";
import AnimatedHeading from "./AnimatedHeading";

// The stage plays /living-room.mp4 (real room animation) in four equal
// segments — one per scene. Picking a scene seeks its segment; playback
// auto-advances through scenes like a guided tour.
type Scene = {
  id: string;
  label: string;
  icon: string;
  caption: string;
  stats: { lights: string; curtain: string; climate: string; security: string };
  actions: string[];
};

const SCENES: Scene[] = [
  {
    id: "morning",
    label: "Morning",
    icon: "☀",
    caption: "Curtains glide open and lights fade up — the room eases you into the day.",
    stats: { lights: "60%", curtain: "Open", climate: "23°C", security: "Disarmed" },
    actions: [
      "Curtains drawn fully open",
      "Bedroom lights fade up to 60%",
      "Geyser & coffee maker on",
      "Climate set to 23°C",
    ],
  },
  {
    id: "movie",
    label: "Movie Night",
    icon: "🎬",
    caption: "Lights dim, curtains close, the sound bar wakes — instant cinema.",
    stats: { lights: "15%", curtain: "Closed", climate: "22°C", security: "Disarmed" },
    actions: [
      "Curtains drawn closed",
      "Ceiling lights off, cove lights 15%",
      "TV & sound bar powered on",
      "Do-not-disturb enabled",
    ],
  },
  {
    id: "goodnight",
    label: "Goodnight",
    icon: "🌙",
    caption: "One tap locks the doors and puts the whole home to sleep.",
    stats: { lights: "Off", curtain: "Closed", climate: "Sleep", security: "Armed" },
    actions: [
      "All lights off except pathway",
      "Doors locked, alarm armed",
      "Climate to sleep curve",
      "Energy-saver mode on",
    ],
  },
  {
    id: "away",
    label: "Away",
    icon: "🏃",
    caption: "Everything powers down and the house keeps watch while you're out.",
    stats: { lights: "Off", curtain: "Half", climate: "Eco", security: "Armed" },
    actions: [
      "Everything powered down",
      "Security cameras armed",
      "Presence simulation enabled",
      "Leak & smoke alerts active",
    ],
  },
];

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-bg-soft px-3 py-2.5">
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
        {label}
      </p>
      <AnimatePresence mode="wait">
        <motion.p
          key={value}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.22 }}
          className="font-display mt-0.5 text-sm font-bold"
        >
          {value}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export default function Scenes() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0); // 0..1 inside the active segment
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeRef = useRef(0);
  activeRef.current = active;

  const s = SCENES[active];

  const seekTo = (i: number) => {
    setActive(i);
    setProgress(0);
    const v = videoRef.current;
    if (!v || !isFinite(v.duration) || v.duration === 0) return;
    v.currentTime = (i * v.duration) / SCENES.length;
    v.play().catch(() => {});
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !isFinite(v.duration) || v.duration === 0) return;
    const seg = v.duration / SCENES.length;
    const i = activeRef.current;
    setProgress(Math.min(1, Math.max(0, (v.currentTime - i * seg) / seg)));
    // auto-advance to the next scene as its segment begins
    if (v.currentTime >= (i + 1) * seg - 0.05 && i < SCENES.length - 1) {
      setActive(i + 1);
      setProgress(0);
    }
  };

  const onEnded = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    setActive(0);
    setProgress(0);
    v.play().catch(() => {});
  };

  // Play while the stage is on screen, pause when it scrolls away.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet">
          One tap, whole-home
        </p>
      </Reveal>
      <AnimatedHeading
        text="Scenes that set the moment"
        className="font-display mt-3 max-w-2xl text-4xl font-bold sm:text-5xl"
      />
      <Reveal delay={0.1}>
        <p className="mt-4 max-w-2xl text-muted">
          A scene is one tap that moves your whole home together — lights,
          curtains, climate and security. Pick a scene below and watch the living
          room respond in real time.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* ── Left: live room video stage ───────────────────── */}
        <div>
          <div className="card-shadow group relative h-[420px] overflow-hidden rounded-3xl border border-line bg-black">
            <video
              ref={videoRef}
              src="/living-room.mp4"
              muted
              playsInline
              preload="metadata"
              onTimeUpdate={onTimeUpdate}
              onEnded={onEnded}
              className="h-full w-full object-cover"
            />
            {/* legibility vignette */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-black/25" />

            {/* labels */}
            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
              <span>{s.icon}</span>
              <span>Living room · {s.label}</span>
            </div>
            <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#1fd18a]" />
              Live preview
            </div>

            {/* animated caption card */}
            <div className="absolute inset-x-5 bottom-16 sm:inset-x-auto sm:right-8 sm:bottom-16 sm:w-80">
              <AnimatePresence mode="wait">
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl border border-white/15 bg-white/10 p-5 text-center backdrop-blur-md"
                >
                  <p className="font-display text-xl font-semibold text-white">
                    {s.icon} {s.label}
                  </p>
                  <p className="mt-1.5 text-sm font-light italic leading-snug text-white/85">
                    {s.caption}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* segment progress + replay */}
            <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-3">
              <button
                onClick={() => seekTo(active)}
                aria-label="Replay this scene"
                className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
              <div className="flex items-center gap-2 rounded-full bg-black/35 px-3 py-2 backdrop-blur">
                {SCENES.map((sc, i) => (
                  <button
                    key={sc.id}
                    onClick={() => seekTo(i)}
                    aria-label={`Play ${sc.label} scene`}
                    className="relative h-2 overflow-hidden rounded-full bg-white/25 transition-all duration-300"
                    style={{ width: active === i ? 40 : 8 }}
                  >
                    {active === i && (
                      <span
                        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet to-blue"
                        style={{ width: `${progress * 100}%` }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* live home state */}
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatChip label="Lights" value={s.stats.lights} />
            <StatChip label="Curtains" value={s.stats.curtain} />
            <StatChip label="Climate" value={s.stats.climate} />
            <StatChip label="Security" value={s.stats.security} />
          </div>
        </div>

        {/* ── Right: scene picker + what happens ─────────────── */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">
            Tap a scene
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {SCENES.map((sc, i) => (
              <button
                key={sc.id}
                onClick={() => seekTo(i)}
                aria-pressed={active === i}
                className={`card-shadow flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
                  active === i
                    ? "border-transparent bg-cta text-cta-fg"
                    : "border-line bg-panel text-text hover:bg-bg-soft"
                }`}
              >
                <span className="text-xl">{sc.icon}</span>
                <span className="text-sm font-semibold">{sc.label}</span>
              </button>
            ))}
          </div>

          <div className="card-shadow mt-5 rounded-2xl border border-line bg-panel p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              What happens when you tap “{s.label}”
            </p>
            <ul className="mt-4 space-y-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {s.actions.map((a, i) => (
                    <motion.li
                      key={a}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-3 text-sm"
                    >
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-violet/12 text-[11px] text-violet">
                        ✓
                      </span>
                      <span className="text-muted">{a}</span>
                    </motion.li>
                  ))}
                </motion.div>
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
