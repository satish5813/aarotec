"use client";

import { motion } from "motion/react";
import Reveal from "./Reveal";
import AnimatedHeading from "./AnimatedHeading";

const CONTROLS = [
  { title: "Lighting", desc: "Dim, tune and schedule every fixture or scene." },
  { title: "Fans & air", desc: "Speed control and airflow that adapts to the room." },
  { title: "Curtains", desc: "Open to the morning, close at sunset — automatically." },
  { title: "Climate", desc: "AC and thermostats tuned to presence and weather." },
  { title: "Security", desc: "Locks, cameras and alerts in one secure timeline." },
  { title: "Energy", desc: "Live usage insights that quietly trim your bill." },
];

export default function Ecosystem() {
  return (
    <section
      id="ecosystem"
      className="relative overflow-hidden border-y border-line bg-bg-soft py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-violet/15 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue">
              One ecosystem
            </p>
          </Reveal>
          <AnimatedHeading
            text="Everything talks. Nothing fights."
            className="font-display mt-3 text-4xl font-bold sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-4 text-muted">
              Aaro Tec devices form a self-healing mesh that keeps
              working even when the internet doesn&apos;t. Set a scene once and
              your whole home responds.
            </p>
          </Reveal>
        </div>

        <div className="card-shadow mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {CONTROLS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <motion.div
                whileHover={{ backgroundColor: "rgba(109,75,255,0.04)" }}
                className="h-full bg-panel p-8"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-bg-soft">
                  <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-violet to-blue" />
                </div>
                <h3 className="font-display mt-5 text-xl font-semibold">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {c.desc}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
