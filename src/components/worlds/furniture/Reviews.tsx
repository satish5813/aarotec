import { FURNITURE_REVIEWS } from "@/data/furniture";
import { Reveal, Words } from "@/components/worlds/shared/motion";

export default function Reviews() {
  return (
    <section id="reviews" className="border-y border-line bg-bg-2/60 py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="label text-hi">Owners</p>
          </Reveal>
          <Words text="What people say once it's in the room." className="font-serif mt-4 text-4xl font-medium leading-[1] sm:text-5xl" />
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {FURNITURE_REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.06}>
              <figure className="h-full rounded-[1.75rem] border border-line bg-panel p-8">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-accent" fill="currentColor"><path d="M7.2 5C4.8 5 3 7 3 9.6c0 2.7 1.9 4.6 4.4 4.6.4 0 .7 0 1-.1-.6 1.9-2.2 3.2-4.3 3.8V20c4.4-.6 7.5-3.9 7.5-8.8C11.6 7.3 9.9 5 7.2 5Zm9.5 0C14.3 5 12.5 7 12.5 9.6c0 2.7 1.9 4.6 4.4 4.6.4 0 .7 0 1-.1-.6 1.9-2.2 3.2-4.3 3.8V20c4.4-.6 7.5-3.9 7.5-8.8C21.1 7.3 19.4 5 16.7 5Z" /></svg>
                <blockquote className="font-serif mt-4 text-2xl font-medium leading-snug">{r.quote}</blockquote>
                <figcaption className="mt-5 text-sm text-muted">
                  {r.name} · {r.city}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
