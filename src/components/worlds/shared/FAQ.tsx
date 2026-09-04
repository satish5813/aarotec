"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal, Words } from "@/components/worlds/shared/motion";

export default function FAQ({
  items,
  eyebrow = "Questions",
  heading = "Things people ask us",
  serif = false,
}: {
  items: { q: string; a: string }[];
  eyebrow?: string;
  heading?: string;
  /** Furniture world uses the serif display face. */
  serif?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };

  return (
    <section id="faq" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Reveal>
            <p className="label text-hi">{eyebrow}</p>
          </Reveal>
          <Words
            text={heading}
            className={`mt-4 text-4xl font-bold leading-[1.02] sm:text-5xl ${serif ? "font-serif font-medium" : "font-display"}`}
          />
        </div>
        <div className="divide-y divide-line border-y border-line">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-6 py-5 text-left"
                >
                  <span className={`text-lg font-semibold ${serif ? "font-serif text-2xl font-medium" : ""}`}>{item.q}</span>
                  <span
                    className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line transition-transform duration-300 ${
                      isOpen ? "rotate-45 bg-accent text-accent-fg" : ""
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 leading-relaxed text-muted">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
