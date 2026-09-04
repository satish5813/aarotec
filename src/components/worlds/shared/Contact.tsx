"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal, Words } from "@/components/worlds/shared/motion";
import { BUSINESS } from "@/lib/site";

type Interest = "power" | "furniture" | "both";
type Form = { name: string; phone: string; email: string; city: string; message: string };
const EMPTY: Form = { name: "", phone: "", email: "", city: "", message: "" };

export default function Contact({
  interest: initial = "both",
  heading,
  intro,
  productName,
}: {
  interest?: Interest;
  heading?: string;
  intro?: string;
  /** Pre-fills the message when the form lives on a product page. */
  productName?: string;
}) {
  const [interest, setInterest] = useState<Interest>(initial);
  const [form, setForm] = useState<Form>({
    ...EMPTY,
    message: productName ? `I'm interested in the ${productName}.` : "",
  });
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const update = (k: keyof Form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, interest, product: productName, company }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not send. Please call us instead.");
    }
  }

  const field =
    "w-full rounded-2xl border border-line bg-bg px-4 py-3.5 text-sm text-text outline-none transition-[border-color,box-shadow] placeholder:text-muted/70 focus:border-accent-2 focus:shadow-[0_0_0_4px_var(--glow)]";

  return (
    <section id="contact" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid overflow-hidden rounded-[2rem] border border-line bg-panel shadow-[0_40px_80px_-50px_rgba(0,0,0,0.5)] lg:grid-cols-[1.05fr_1fr]">
        {/* Left: the pitch and direct lines */}
        <div className="relative p-8 sm:p-12 lg:p-14">
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-70 blur-3xl" style={{ background: "var(--glow)" }} />
          <Reveal>
            <p className="label text-hi">Your contact · {BUSINESS.contactPerson}</p>
            <Words
              text={heading ?? "Tell us what you need. We'll quote it."}
              className={`mt-4 text-4xl leading-[1.02] sm:text-5xl ${initial === "furniture" ? "font-serif font-medium" : "font-display font-bold"}`}
            />
            <p className="mt-5 max-w-md text-muted">
              {intro ??
                "No prices on the site, on purpose — every home is different. Share a few details and Pradeep will come back with a considered recommendation and a quote, usually within a working day."}
            </p>

            <div className="mt-10 space-y-4 text-sm">
              <a href={`tel:${BUSINESS.phoneHref}`} className="group flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-line bg-bg transition-colors group-hover:bg-accent group-hover:text-accent-fg">
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92Z" />
                  </svg>
                </span>
                <span>
                  <span className="block text-xs text-muted">Call</span>
                  <span className="font-semibold">{BUSINESS.phone}</span>
                </span>
              </a>
              <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-line bg-bg transition-colors group-hover:bg-accent group-hover:text-accent-fg">
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor">
                    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 0 1 0 16.4 8.1 8.1 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8Zm-3.2 4.3c-.2 0-.5 0-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.2 5 4.4 2.5 1 3 .8 3.5.7.5 0 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4l-.5-.3-1.9-.9c-.3-.1-.4-.1-.6.1l-.9 1.1c-.2.2-.3.2-.6.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.5l-.9-2c-.2-.6-.4-.5-.6-.5h-.5Z" />
                  </svg>
                </span>
                <span>
                  <span className="block text-xs text-muted">WhatsApp</span>
                  <span className="font-semibold">Message {BUSINESS.contactPerson}</span>
                </span>
              </a>
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-line bg-bg">
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span>
                  <span className="block text-xs text-muted">Based in</span>
                  <span className="font-semibold">{BUSINESS.city}, {BUSINESS.region} · pan-India delivery</span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right: the form */}
        <div className="border-t border-line bg-bg-2/60 p-8 sm:p-12 lg:border-l lg:border-t-0 lg:p-14">
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex h-full min-h-[320px] flex-col items-center justify-center text-center"
              >
                <span className="grid h-16 w-16 place-items-center rounded-full bg-accent text-accent-fg">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                </span>
                <h3 className="font-display mt-6 text-2xl font-bold">Received — thank you.</h3>
                <p className="mt-2 max-w-xs text-sm text-muted">
                  {BUSINESS.contactPerson} will call or message you shortly. For anything urgent, ring {BUSINESS.phone}.
                </p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} className="space-y-4" exit={{ opacity: 0 }}>
                <div>
                  <p className="label mb-2 text-muted">I&apos;m interested in</p>
                  <div className="grid grid-cols-3 gap-2">
                    {(["power", "furniture", "both"] as const).map((i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => setInterest(i)}
                        className={`rounded-2xl border px-3 py-2.5 text-sm font-medium capitalize transition-colors ${
                          interest === i ? "border-accent bg-accent text-accent-fg" : "border-line bg-bg text-muted hover:text-text"
                        }`}
                      >
                        {i}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input required placeholder="Your name" value={form.name} onChange={(e) => update("name", e.target.value)} className={field} autoComplete="name" />
                  <input required placeholder="Phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={field} autoComplete="tel" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input placeholder="Email (optional)" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={field} autoComplete="email" />
                  <input required placeholder="City" value={form.city} onChange={(e) => update("city", e.target.value)} className={field} autoComplete="address-level2" />
                </div>
                <textarea
                  rows={4}
                  placeholder={interest === "furniture" ? "Which piece, finish and size are you thinking of?" : "What do you want to keep running, and for how long?"}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className={`${field} resize-none`}
                />
                {/* honeypot */}
                <input tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} className="hidden" name="company" aria-hidden="true" />

                {error && <p className="text-sm text-red-500">{error}</p>}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-semibold text-accent-fg transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {status === "loading" ? "Sending…" : "Request a quote"}
                  <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </button>
                <p className="text-center text-[11px] text-muted">No spam, no sharing. Your details go straight to {BUSINESS.contactPerson}.</p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
