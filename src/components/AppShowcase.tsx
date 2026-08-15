"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Reveal from "./Reveal";

export default function AppShowcase() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-bg-soft py-28">
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-80 w-80 rounded-full bg-blue/10 blur-[120px]" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue">
            One app for everything
          </p>
          <h2 className="font-display mt-3 text-4xl font-bold sm:text-5xl">
            Your whole home, in your pocket
          </h2>
          <p className="mt-5 max-w-md text-muted">
            Group rooms, build scenes, schedule routines and watch live energy
            usage — from anywhere. The app stays in sync with every wall panel
            in real time.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Voice control with Alexa & Google",
              "Family access with custom permissions",
              "Automations triggered by time, presence or weather",
              "Secure remote access over the cloud",
            ].map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
                <span className="text-muted">{f}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Real app screenshots — tablet behind, phone in front */}
        <Reveal delay={0.1}>
          <div className="relative mx-auto w-full max-w-[560px] pb-10 pl-6 sm:pl-10">
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-violet/15 to-blue/15 blur-[80px]" />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="ml-auto w-[86%]"
            >
              <Image
                src="/TAB.jpg"
                alt="Aaro Tec app on a tablet — Hall dashboard with switches, fans and scenes"
                width={1228}
                height={1600}
                className="h-auto w-full rounded-[1.9rem] shadow-[0_30px_70px_-30px_rgba(15,21,43,0.45)] ring-1 ring-line"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="absolute -bottom-2 left-0 w-[42%] sm:w-[40%]"
            >
              <Image
                src="/MOBILE.jpg"
                alt="Aaro Tec app on a phone — Living Room switches and dimmers"
                width={660}
                height={1346}
                className="h-auto w-full rounded-[2rem] shadow-[0_34px_70px_-28px_rgba(15,21,43,0.55)] ring-1 ring-line"
              />
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
