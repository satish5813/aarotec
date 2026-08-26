import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LEGAL_LAST_UPDATED } from "@/lib/site";

export type LegalSection = {
  /** Anchor id — kept stable so external links (e.g. Meta's data-deletion
   *  URL field) never break. */
  id: string;
  heading: string;
  body: ReactNode;
};

/* ---------- Typography primitives ---------------------------------------
   The project has no @tailwindcss/typography plugin, so legal prose gets a
   small set of shared building blocks instead of `prose` classes.        */

export function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-[15px] leading-7 text-muted">{children}</p>;
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-[15px] leading-7 text-muted">
          <span
            aria-hidden="true"
            className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-blue to-violet"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-8 text-base font-semibold text-text">{children}</h3>
  );
}

/** Callout for the things a reader most needs to act on. */
export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="card-shadow mt-6 rounded-2xl border border-line bg-panel p-5 text-[15px] leading-7 text-muted">
      {children}
    </div>
  );
}

export function Mail({ address }: { address: string }) {
  return (
    <a
      href={`mailto:${address}`}
      className="font-medium text-text underline decoration-violet/40 underline-offset-4 transition hover:decoration-violet"
    >
      {address}
    </a>
  );
}

export function Tel({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={`tel:${href}`}
      className="font-medium text-text underline decoration-violet/40 underline-offset-4 transition hover:decoration-violet"
    >
      {label}
    </a>
  );
}

export function InlineLink({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="font-medium text-text underline decoration-violet/40 underline-offset-4 transition hover:decoration-violet"
    >
      {children}
    </a>
  );
}

/* ---------- Page shell --------------------------------------------------- */

export default function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <main className="relative">
      <Navbar />

      {/* Hero */}
      <header className="relative overflow-hidden border-b border-line bg-bg-soft pb-16 pt-36 sm:pb-20 sm:pt-44">
        <div
          aria-hidden="true"
          className="aurora-modern pointer-events-none absolute inset-0 opacity-70"
        />
        <div
          aria-hidden="true"
          className="grid-fade pointer-events-none absolute inset-0"
        />
        <div className="relative mx-auto max-w-3xl px-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet">
            {eyebrow}
          </p>
          <h1 className="font-display mt-3 text-4xl font-bold sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-muted">
            Last updated {LEGAL_LAST_UPDATED}
          </p>
          <div className="mt-6 text-[15px] leading-7 text-muted">{intro}</div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
          {/* Document */}
          <article className="mx-auto max-w-3xl lg:mx-0">
            {sections.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                className={
                  i === 0 ? "" : "mt-12 border-t border-line pt-12"
                }
              >
                <h2 className="font-display text-2xl font-bold sm:text-[1.75rem]">
                  <span className="mr-3 text-base font-semibold text-violet">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.heading}
                </h2>
                {s.body}
              </section>
            ))}
          </article>

          {/* Table of contents — desktop only; the document above is the
              single source of truth on mobile. */}
          <nav
            aria-label="On this page"
            className="hidden lg:sticky lg:top-28 lg:block lg:self-start"
          >
            <p className="label font-semibold text-muted">On this page</p>
            <ol className="mt-4 space-y-2.5 border-l border-line">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-px block border-l border-transparent pl-4 text-sm text-muted transition hover:border-violet hover:text-text"
                  >
                    <span className="mr-2 tabular-nums text-xs text-violet/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      <Footer />
    </main>
  );
}
