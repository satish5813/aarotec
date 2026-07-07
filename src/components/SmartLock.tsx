"use client";

import { useRef, useState } from "react";
import Reveal from "./Reveal";
import AnimatedHeading from "./AnimatedHeading";
import {
  FingerprintIcon,
  KeypadIcon,
  CardIcon,
  KeyIcon,
  PhoneIcon,
  ShieldIcon,
} from "./icons";

// 5-in-1 unlocking — every way in, one smart lock.
const ACCESS_METHODS = [
  { label: "Fingerprint", desc: "Instant recognition, walk right in", Icon: FingerprintIcon },
  { label: "Passcode", desc: "Anti-peep PIN keeps codes private", Icon: KeypadIcon },
  { label: "RFID card", desc: "Tap-to-open cards for the family", Icon: CardIcon },
  { label: "Mechanical key", desc: "Classic backup, always works", Icon: KeyIcon },
  { label: "Mobile app", desc: "Unlock remotely from anywhere", Icon: PhoneIcon },
] as const;

const FEATURES = [
  {
    t: "Auto-lock & tamper alerts",
    d: "Secures itself the moment the door shuts, and warns you instantly if anyone tries to force or manipulate the lock.",
  },
  {
    t: "Never deadlocked",
    d: "Dual power keeps you covered — long-life battery plus an emergency power port, so an outage never locks you out.",
  },
  {
    t: "Passage mode",
    d: "Keep the door unlocked during busy hours — guests, kids, deliveries — while you stay in full control from the app.",
  },
  {
    t: "Industry-grade encryption",
    d: "Every access point is protected end-to-end, with real-time access history and notifications in the app.",
  },
] as const;

export default function SmartLock() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <section id="smart-lock" className="relative overflow-hidden bg-bg py-28">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-violet/10 blur-[150px]" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-[420px] w-[420px] rounded-full bg-blue/10 blur-[150px]" />

      <div className="mx-auto max-w-7xl px-6">
        {/* header */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div>
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber">
                AirLock · Smart Door Lock
              </p>
            </Reveal>
            <AnimatedHeading
              text="Smart security, seamless living"
              className="font-display mt-3 text-4xl font-bold sm:text-5xl"
            />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xl text-muted lg:pb-2">
              A 5-in-1 smart lock that welcomes, secures and elevates your
              homecoming. Fingerprint, passcode, RFID card, key or app — a bold
              blend of security and style that pairs seamlessly with the rest
              of your smart home.
            </p>
          </Reveal>
        </div>

        {/* 5-in-1 access methods */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
          {ACCESS_METHODS.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.05}>
              <div className="card-shadow h-full rounded-2xl border border-line bg-panel p-5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blue/15 to-violet/15 text-violet">
                  <m.Icon className="h-5 w-5" />
                </span>
                <h3 className="font-display mt-4 text-base font-semibold">
                  {m.label}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {m.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* security features */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:gap-5">
          {FEATURES.map((f, i) => (
            <Reveal key={f.t} delay={i * 0.05}>
              <div className="card-shadow flex h-full items-start gap-4 rounded-2xl border border-line bg-panel p-6">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet/10 text-violet">
                  <ShieldIcon className="h-4.5 w-4.5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{f.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {f.d}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* unified split card: description + clear portrait video in one card */}
      <div className="mx-auto mt-16 max-w-7xl px-6">
        <Reveal>
          <div className="card-shadow overflow-hidden rounded-[2.4rem] border border-line bg-panel">
            <div className="grid items-stretch md:grid-cols-2">
              {/* left — copy */}
              <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-violet/10 px-3.5 py-1.5 text-xs font-medium text-violet">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-violet" />
                  </span>
                  Live demo
                </span>
                <h3 className="font-display mt-5 text-3xl font-bold sm:text-4xl lg:text-[2.75rem]">
                  See it in action
                </h3>
                <p className="mt-4 max-w-md text-muted">
                  One touch, a fingerprint or the app — watch the smart lock
                  recognise you and open in real time. Smooth, silent and
                  secure, every single time.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Instant fingerprint recognition",
                    "Auto-locks the moment the door shuts",
                    "One-tap lock & unlock from anywhere",
                    "Battery status & access history in the app",
                  ].map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-3 text-sm font-medium text-text"
                    >
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gradient-to-r from-blue to-violet text-white">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="h-3 w-3"
                        >
                          <path
                            d="M20 6 9 17l-5-5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="mt-8 inline-flex w-fit rounded-full bg-cta px-7 py-3.5 text-sm font-semibold text-cta-fg transition-transform hover:scale-[1.03]"
                >
                  Book a demo
                </a>
              </div>

              {/* right — video stage built into the same card */}
              <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0c0b12] via-[#141225] to-[#241a3a] p-8 sm:p-10">
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/30 blur-[90px]" />
                <div
                  className="relative aspect-[9/16] h-[420px] max-h-[72vh] overflow-hidden rounded-[1.6rem] border border-white/10 shadow-2xl sm:h-[500px]"
                >
                  <video
                    ref={videoRef}
                    src="/1.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={toggleSound}
                    aria-label={muted ? "Unmute video" : "Mute video"}
                    className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur transition hover:bg-black/60"
                  >
                    {muted ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-5 w-5"
                      >
                        <path
                          d="M11 5 6 9H2v6h4l5 4V5z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="m23 9-6 6M17 9l6 6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-5 w-5"
                      >
                        <path
                          d="M11 5 6 9H2v6h4l5 4V5z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
