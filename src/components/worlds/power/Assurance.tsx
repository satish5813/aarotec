import Image from "next/image";
import { Counter, Reveal, Words } from "@/components/worlds/shared/motion";

const STATS = [
  { v: 5, s: " yr", l: "manufacturer warranty on flagship units" },
  { v: 10, s: " yr", l: "battery lifecycle at daily use" },
  { v: 30, s: " dB", l: "operating noise — quieter than a library" },
  { v: 100, s: "%", l: "pan-India service coverage" },
];

const STEPS = [
  { t: "Tell us what you run", d: "Appliances, hours, rooms. Or use the estimator above." },
  { t: "We size it", d: "The right unit — and extra batteries or solar if they earn their keep." },
  { t: "Delivered, registered", d: "Warranty registered in your name. Set-up help over a call." },
  { t: "Service for life", d: "One number to call. We handle claims with the manufacturer." },
];

export default function Assurance() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="label text-hi">Why buy from us</p>
          </Reveal>
          <Words text="Sized right, backed for years." className="font-display mt-4 text-4xl font-bold leading-[1.02] sm:text-5xl" />
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-lg text-muted">
              A power station is a ten-year purchase. We&apos;d rather sell you the right one than the biggest one — and stay reachable long after delivery.
            </p>
          </Reveal>

          <ol className="mt-10 space-y-5">
            {STEPS.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.06}>
                <li className="flex gap-5">
                  <span className="font-mono grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-sm">{i + 1}</span>
                  <div>
                    <p className="font-semibold">{s.t}</p>
                    <p className="mt-1 text-sm text-muted">{s.d}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {STATS.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.06}>
              <div className="rounded-[1.5rem] border border-line bg-panel p-7">
                <p className="font-mono text-5xl font-medium tracking-tight">
                  <Counter to={s.v} suffix={s.s} />
                </p>
                <p className="mt-3 text-sm text-muted">{s.l}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.25} className="sm:col-span-2">
            <div className="relative aspect-[21/9] overflow-hidden rounded-[1.5rem] border border-line">
              <Image src="/power/banner-10-years-wide.webp" alt="Ten-year battery lifecycle" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
