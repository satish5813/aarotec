"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import LogoMark from "@/components/Logo";
import { WORLDS } from "@/lib/site";

type World = keyof typeof WORLDS;

const SECTION_LINKS: Record<World, { label: string; href: string }[]> = {
  power: [
    { label: "Range", href: "/power#range" },
    { label: "Runtime", href: "/power#runtime" },
    { label: "Technology", href: "/power#technology" },
    { label: "Use cases", href: "/power#use-cases" },
    { label: "FAQ", href: "/power#faq" },
  ],
  furniture: [
    { label: "Collections", href: "/furniture#collections" },
    { label: "Pieces", href: "/furniture#pieces" },
    { label: "Craft", href: "/furniture#craft" },
    { label: "Reviews", href: "/furniture#reviews" },
    { label: "FAQ", href: "/furniture#faq" },
  ],
};

/** Navbar for the Power and Furniture worlds. Carries the Aaro Tec brand and
 *  a way back home, plus a switch between the two worlds and the sections of
 *  the current one. Styled entirely with tokens so it adapts to each world. */
export default function WorldNavbar({ world }: { world: World }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = SECTION_LINKS[world];
  const contactHref = `${WORLDS[world].href}#contact`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ${
        scrolled || open
          ? "border-b border-line bg-bg/80 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.35)] backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-3.5 sm:px-8">
        <Link href="/" aria-label="Aaro Tec — back to home" className="group flex items-center gap-2.5">
          <LogoMark className="h-10 w-10 transition-transform duration-300 group-hover:scale-105" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-bold tracking-[-0.02em]">
              Aaro <span className="amp">Tec</span>
            </span>
            <span className="label mt-1 hidden text-[9px] tracking-[0.18em] text-muted min-[380px]:block">
              {WORLDS[world].eyebrow}
            </span>
          </span>
        </Link>

        {/* World switcher */}
        <div className="hidden items-center rounded-full border border-line bg-panel/60 p-1 text-xs font-semibold backdrop-blur md:flex">
          {(Object.keys(WORLDS) as World[]).map((w) => {
            const active = world === w;
            return (
              <Link
                key={w}
                href={WORLDS[w].href}
                className={`relative rounded-full px-4 py-1.5 transition-colors ${
                  active ? "text-accent-fg" : "text-muted hover:text-text"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="world-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{WORLDS[w].label}</span>
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          <Link href="/" className="group relative text-[13px] font-medium text-muted transition-colors hover:text-text">
            Smart home
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent-2 transition-all duration-300 group-hover:w-full" />
          </Link>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-[13px] font-medium text-muted transition-colors hover:text-text"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent-2 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href={contactHref}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg shadow-[0_12px_30px_-14px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Get a quote
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`h-0.5 w-5 bg-text transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-5 bg-text transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-5 bg-text transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <div className="px-5 py-4">
              <div className="mb-3 grid grid-cols-2 gap-2">
                {(Object.keys(WORLDS) as World[]).map((w) => (
                  <Link
                    key={w}
                    href={WORLDS[w].href}
                    className={`rounded-2xl border px-4 py-3 text-center text-sm font-semibold ${
                      world === w ? "border-accent bg-accent text-accent-fg" : "border-line text-text"
                    }`}
                  >
                    {WORLDS[w].label}
                  </Link>
                ))}
              </div>
              <Link href="/" onClick={() => setOpen(false)} className="block py-2.5 text-muted">
                Smart home (Aaro Tec)
              </Link>
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-2.5 text-muted">
                  {l.label}
                </a>
              ))}
              <a
                href={contactHref}
                onClick={() => setOpen(false)}
                className="mt-3 block rounded-full bg-accent px-5 py-3 text-center text-sm font-semibold text-accent-fg"
              >
                Get a quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
