"use client";

import { useEffect, useState } from "react";
import LogoMark from "./Logo";
import { selectProduct } from "./productStore";

const LINKS = [
  { label: "Products", href: "#products" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Smart Lock", href: "#smart-lock" },
  { label: "Gallery", href: "#gallery" },
  { label: "Why us", href: "#why" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Clicking the brand always returns to the top of the home page and resets
  // any in-page state (e.g. the selected product), so it behaves like "Home".
  const goHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.button !== 0) return;
    e.preventDefault();
    setOpen(false);
    selectProduct("posh");
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.pushState(null, "", "/");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav item for whichever section is currently in view.
  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => el != null
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-bg/75 shadow-[0_8px_30px_-18px_rgba(22,20,15,0.25)] backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a
          href="/"
          onClick={goHome}
          aria-label="Aaro Tec — back to home"
          className="group flex items-center gap-2.5"
        >
          <LogoMark className="h-10 w-10 transition-transform duration-300 group-hover:scale-105" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-bold tracking-[-0.02em] text-text">
              Aaro{" "}
              <span className="text-glow transition-all duration-500 group-hover:[filter:brightness(1.15)]">
                Tec
              </span>
            </span>
            <span className="text-shimmer mt-1 hidden whitespace-nowrap text-[10px] font-semibold tracking-tight min-[380px]:block">
              Transforming spaces &amp; enhancing lives
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => {
            const isActive = active === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive ? "true" : undefined}
                className={`group relative text-sm font-medium transition-colors duration-300 ${
                  isActive ? "text-text" : "text-muted hover:text-text"
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-gradient-to-r from-blue to-violet transition-all duration-300 ease-out ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            );
          })}
        </div>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="rounded-full bg-cta px-5 py-2.5 text-sm font-semibold text-cta-fg shadow-[0_10px_24px_-12px_rgba(22,20,15,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgba(22,20,15,0.55)]"
          >
            Book a demo
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-5 bg-text transition ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 bg-text transition ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-5 bg-text transition ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-bg/95 px-6 py-4 md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              aria-current={active === l.href ? "true" : undefined}
              className={`block py-3 transition-colors ${
                active === l.href
                  ? "font-medium text-text"
                  : "text-muted hover:text-text"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-cta px-5 py-2.5 text-center text-sm font-semibold text-cta-fg"
          >
            Book a demo
          </a>
        </div>
      )}
    </header>
  );
}
