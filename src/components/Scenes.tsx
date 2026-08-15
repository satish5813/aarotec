"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Reveal from "./Reveal";
import AnimatedHeading from "./AnimatedHeading";
import {
  LightsIcon,
  FanIcon,
  CurtainsIcon,
  ClimateIcon,
  SecurityIcon,
} from "./icons";

// Full-width interactive room: /living-room.mp4 plays in four equal
// segments — one per scene. The scene controls sit on the image itself,
// and live device state floats over the room as glass chips.
type Scene = {
  id: string;
  label: string;
  icon: string;
  caption: string;
  stats: { lights: string; curtain: string; fan: string; climate: string; security: string };
};

const SCENES: Scene[] = [
  {
    id: "morning",
    label: "Morning",
    icon: "☀",
    caption: "Curtains glide open and lights fade up — the room eases you into the day.",
    stats: { lights: "60%", curtain: "Open", fan: "Low", climate: "23°C", security: "Disarmed" },
  },
  {
    id: "movie",
    label: "Movie Night",
    icon: "🎬",
    caption: "Lights dim, curtains close, the sound bar wakes — instant cinema.",
    stats: { lights: "15%", curtain: "Closed", fan: "Silent", climate: "22°C", security: "Disarmed" },
  },
  {
    id: "goodnight",
    label: "Goodnight",
    icon: "🌙",
    caption: "One tap locks the doors and puts the whole home to sleep.",
    stats: { lights: "Off", curtain: "Closed", fan: "Off", climate: "Sleep", security: "Armed" },
  },
  {
    id: "away",
    label: "Away",
    icon: "🏃",
    caption: "Everything powers down and the house keeps watch while you're out.",
    stats: { lights: "Off", curtain: "Half", fan: "Off", climate: "Eco", security: "Armed" },
  },
];

// Device chips anchored to spots in the room (percent-based positions).
const DEVICES = [
  {
    key: "lights" as const,
    label: "Lights",
    Icon: LightsIcon,
    pos: { left: "14%", top: "24%" },
    hideOnMobile: false,
  },
  {
    key: "fan" as const,
    label: "Fan",
    Icon: FanIcon,
    pos: { left: "46%", top: "12%" },
    hideOnMobile: true,
  },
  {
    key: "curtain" as const,
    label: "Curtains",
    Icon: CurtainsIcon,
    pos: { left: "84%", top: "26%" },
    hideOnMobile: false,
  },
  {
    key: "climate" as const,
    label: "Climate",
    Icon: ClimateIcon,
    pos: { left: "12%", top: "62%" },
    hideOnMobile: true,
  },
  {
    key: "security" as const,
    label: "Security",
    Icon: SecurityIcon,
    pos: { left: "86%", top: "64%" },
    hideOnMobile: false,
  },
];

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
    <section className="w-full py-28">
      <div className="mx-auto mb-12 max-w-7xl px-6">
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
            A scene is one tap that moves your whole home together. Tap a scene
            on the room below — every device answers, and its live state floats
            right on the picture.
          </p>
        </Reveal>
      </div>

      {/* ── Full-width interactive room stage ─────────────────── */}
      <div className="mx-auto w-[94vw] lg:w-[min(1240px,92vw)]">
        <div className="card-shadow relative h-[440px] overflow-hidden rounded-3xl border border-line bg-black sm:h-[540px] lg:h-[620px]">
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
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/25" />

          {/* top labels */}
          <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
            <span>{s.icon}</span>
            <span>Living room · {s.label}</span>
          </div>
          <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#1fd18a]" />
            Live preview
          </div>

          {/* device state chips pinned on the room */}
          {DEVICES.map((d, i) => (
            <motion.div
              key={d.key}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 ${
                d.hideOnMobile ? "hidden sm:block" : ""
              }`}
              style={d.pos}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3.6 + i * 0.5,
                  ease: "easeInOut",
                }}
                className="group flex items-center gap-2.5 rounded-full border border-white/20 bg-white/12 py-1.5 pl-1.5 pr-3.5 backdrop-blur-md transition hover:bg-white/20"
              >
                <span className="relative grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white">
                  <span className="absolute inset-0 rounded-full bg-white/20 opacity-60 [animation:ping_2.6s_cubic-bezier(0,0,0.2,1)_infinite]" />
                  <d.Icon className="relative h-4.5 w-4.5" />
                </span>
                <span className="leading-tight">
                  <span className="block text-[9px] font-medium uppercase tracking-wider text-white/70">
                    {d.label}
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={s.stats[d.key]}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.25 }}
                      className="block text-xs font-bold text-white"
                    >
                      {s.stats[d.key]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </motion.div>
            </motion.div>
          ))}

          {/* animated caption card */}
          <div className="pointer-events-none absolute inset-x-5 bottom-24 flex justify-center sm:bottom-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-md rounded-2xl border border-white/15 bg-white/10 px-6 py-4 text-center backdrop-blur-md"
              >
                <p className="text-sm font-light italic leading-snug text-white/90 sm:text-base">
                  {s.caption}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* scene controls on the image */}
          <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-2 px-4 sm:gap-3">
            <button
              onClick={() => seekTo(active)}
              aria-label="Replay this scene"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 bg-white/12 text-white backdrop-blur-md transition hover:bg-white/25"
            >
              <svg
                width="16"
                height="16"
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

            <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/35 p-1.5 backdrop-blur-md sm:gap-2">
              {SCENES.map((sc, i) => (
                <button
                  key={sc.id}
                  onClick={() => seekTo(i)}
                  aria-pressed={active === i}
                  aria-label={`Play ${sc.label} scene`}
                  className={`relative flex items-center gap-2 overflow-hidden rounded-full px-3 py-2 text-sm transition-all duration-300 sm:px-4 ${
                    active === i
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="text-base">{sc.icon}</span>
                  <span
                    className={`whitespace-nowrap text-xs font-semibold sm:text-sm ${
                      active === i ? "" : "hidden md:inline"
                    }`}
                  >
                    {sc.label}
                  </span>
                  {active === i && (
                    <span className="absolute inset-x-2 bottom-0.5 h-0.5 overflow-hidden rounded-full bg-white/25">
                      <span
                        className="block h-full rounded-full bg-gradient-to-r from-violet to-blue"
                        style={{ width: `${progress * 100}%` }}
                      />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
