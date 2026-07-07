"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Reveal from "./Reveal";
import AnimatedHeading from "./AnimatedHeading";

const ITEMS = [
  {
    q: "Do I need to rewire my home?",
    a: "No. Our switches are designed to fit standard back-boxes and work with existing wiring, so most homes can be upgraded room by room without breaking walls.",
  },
  {
    q: "Will it keep working if the internet goes down?",
    a: "Yes. It will keep working with the IR remote and touch controls, so you can operate everything as usual even without internet. The app simply adds remote access back once you're online.",
  },
  {
    q: "Which voice assistants are supported?",
    a: "The ecosystem works with Amazon Alexa and Google Assistant for hands-free control of lights, fans, scenes and more.",
  },
  {
    q: "How long is the warranty?",
    a: "Every panel ships with a 7-year warranty as standard, backed by responsive local support.",
  },
  {
    q: "Is my data private?",
    a: "Control is local-first and remote connections are end-to-end encrypted. We never sell personal usage data.",
  },
  {
    q: "Can an electrician install it?",
    a: "Absolutely. Installation is straightforward for any qualified electrician, and our team provides setup guidance and onboarding.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-6 py-28">
      <Reveal>
        <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-violet">
          Questions
        </p>
      </Reveal>
      <AnimatedHeading
        text="Frequently asked"
        className="font-display mt-3 text-center text-4xl font-bold sm:text-5xl"
      />

      <div className="mt-12 space-y-3">
        {ITEMS.map((it, i) => {
          const active = open === i;
          return (
            <Reveal key={it.q} delay={i * 0.04}>
              <div className="card-shadow overflow-hidden rounded-2xl border border-line bg-panel">
                <button
                  onClick={() => setOpen(active ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-medium">{it.q}</span>
                  <motion.span
                    animate={{ rotate: active ? 45 : 0 }}
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-lg text-muted"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-muted">
                        {it.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
