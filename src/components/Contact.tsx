"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Reveal from "./Reveal";

const CITIES = [
  "Mumbai",
  "Delhi NCR",
  "Bengaluru",
  "Hyderabad",
  "Pune",
  "Surat",
  "Chennai",
  "Dubai",
  "Other",
];

type Form = { name: string; email: string; phone: string; city: string };

const EMPTY: Form = { name: "", email: "", phone: "", city: "" };

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState<Form>(EMPTY);
  const [company, setCompany] = useState(""); // honeypot
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (key: keyof Form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, company }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong.");
      }
      setSent(true);
      setForm(EMPTY);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not submit. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-28">
      <div className="card-shadow grid overflow-hidden rounded-[2rem] border border-line bg-panel lg:grid-cols-2">
        <div className="relative p-10 sm:p-14">
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-violet/20 blur-3xl" />
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet">
              Your contact · Pradeep
            </p>
            <h2 className="font-display mt-3 text-4xl font-bold sm:text-5xl">
              Bring Aaro Tec home
            </h2>
            <p className="mt-5 max-w-sm text-muted">
              Tell us about your space and a specialist will design a
              personalised automation plan — no obligation.
            </p>
            <div className="mt-10 space-y-3.5 text-sm">
              {/* Contact person */}
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-bg-soft text-blue">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                  </svg>
                </span>
                <span>
                  <span className="block text-xs text-muted">Your contact</span>
                  <span className="font-medium text-text">Pradeep</span>
                </span>
              </div>

              {/* Phone (clickable) */}
              <a
                href="tel:+918309047843"
                className="group flex items-center gap-3"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-bg-soft text-blue transition-colors group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-violet group-hover:to-blue group-hover:text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92Z" />
                  </svg>
                </span>
                <span>
                  <span className="block text-xs text-muted">Call us</span>
                  <span className="font-medium text-text transition-colors group-hover:text-blue">
                    +91 83090 47843
                  </span>
                </span>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-bg-soft text-blue">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span>
                  <span className="block text-xs text-muted">Visit us</span>
                  <span className="font-medium text-text">Hyderabad, Telangana</span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="border-t border-line bg-bg-soft p-10 sm:p-14 lg:border-l lg:border-t-0">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex h-full flex-col items-center justify-center text-center"
            >
              <div className="grid h-14 w-14 place-items-center rounded-full bg-[#1fd18a]/15 text-2xl text-[#13a86d]">
                ✓
              </div>
              <h3 className="font-display mt-5 text-2xl font-bold">
                Thank you!
              </h3>
              <p className="mt-2 text-sm text-muted">
                We&apos;ll reach out within one business day.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {(
                [
                  { key: "name", label: "Full name", type: "text", ph: "Your name" },
                  { key: "email", label: "Email", type: "email", ph: "you@email.com" },
                  { key: "phone", label: "Phone", type: "tel", ph: "+91 ..." },
                ] as const
              ).map((f) => (
                <div key={f.key}>
                  <label className="mb-1.5 block text-xs text-muted">
                    {f.label}
                  </label>
                  <input
                    required
                    type={f.type}
                    placeholder={f.ph}
                    value={form[f.key]}
                    onChange={(e) => update(f.key, e.target.value)}
                    className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm outline-none transition focus:border-violet"
                  />
                </div>
              ))}
              <div>
                <label className="mb-1.5 block text-xs text-muted">City</label>
                <select
                  required
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm outline-none transition focus:border-violet"
                >
                  <option value="" disabled>
                    Select your city
                  </option>
                  {CITIES.map((c) => (
                    <option key={c} value={c} className="bg-bg-soft">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Honeypot — hidden from real users, catches bots */}
              <div
                className="absolute"
                style={{ left: "-9999px" }}
                aria-hidden="true"
              >
                <label>
                  Company
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </label>
              </div>

              {error && (
                <p className="text-sm text-red-500">
                  {error} You can also call us at{" "}
                  <a href="tel:+918309047843" className="font-medium underline">
                    +91 83090 47843
                  </a>
                  .
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-cta py-3.5 text-sm font-semibold text-cta-fg transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending…" : "Request my plan"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
