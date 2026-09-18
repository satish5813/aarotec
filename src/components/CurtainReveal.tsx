"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

export default function CurtainReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // theatre curtains slide apart, image settles, copy rises
  const leftX = useTransform(scrollYProgress, [0, 0.55], ["0%", "-102%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.55], ["0%", "102%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.6], [1.25, 1]);
  const copyOpacity = useTransform(scrollYProgress, [0.35, 0.62], [0, 1]);
  const copyY = useTransform(scrollYProgress, [0.35, 0.62], [40, 0]);
  const labelOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <section ref={ref} className="relative h-[230vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* revealed scene */}
        <motion.div style={{ scale: imgScale }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80"
            alt="A smart home interior at dusk"
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/40" />
        </motion.div>

        {/* overlay copy */}
        <motion.div
          style={{ opacity: copyOpacity, y: copyY }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        >
          <span className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md">
            Experience it live
          </span>
          <h2 className="font-display mt-6 max-w-4xl text-4xl font-bold text-white sm:text-6xl lg:text-7xl">
            Your home, unveiled
          </h2>
          <p className="mt-5 max-w-xl text-base text-white/75 sm:text-lg">
            As the curtains part, so does the line between technology and
            comfort. One tap sets the entire scene.
          </p>
          <a
            href="#products"
            className="mt-9 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.04]"
          >
            Step inside
          </a>
        </motion.div>

        {/* the curtains */}
        <motion.div
          style={{ x: leftX }}
          className="absolute inset-y-0 left-0 z-20 w-1/2 bg-bg"
        >
          <div className="absolute inset-0 grid-fade opacity-60" />
          <div className="absolute right-0 top-0 h-full w-px bg-line" />
        </motion.div>
        <motion.div
          style={{ x: rightX }}
          className="absolute inset-y-0 right-0 z-20 w-1/2 bg-bg"
        >
          <div className="absolute inset-0 grid-fade opacity-60" />
          <div className="absolute left-0 top-0 h-full w-px bg-line" />
        </motion.div>

        {/* label shown before reveal */}
        <motion.div
          style={{ opacity: labelOpacity }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center"
        >
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted">
            Keep scrolling
          </p>
          <p className="font-display mt-3 text-3xl font-bold sm:text-5xl">
            Pull back the curtain
          </p>
        </motion.div>
      </div>
    </section>
  );
}
