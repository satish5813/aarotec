// ---------------------------------------------------------------------------
// CUSTOMER TESTIMONIALS — the single place to edit reviews shown on the site.
//
// To publish a real review, add an entry to TESTIMONIALS below and set
// `genuine: true`. Nothing else needs to change: the homepage section and the
// Review / AggregateRating structured data both read from this array.
//
//   {
//     name: "Ramesh K.",
//     city: "Hyderabad",
//     rating: 5,
//     text: "Their words, quoted accurately.",
//     date: "2026-07-14",   // ISO date the review was given
//     genuine: true,        // ONLY set true for a real, verifiable review
//   }
//
// `genuine` is a safety switch, not decoration. Entries left at `false` are
// treated as placeholder copy: they still render on the page, but they are
// excluded from the JSON-LD that Google reads. Publishing invented reviews as
// structured data breaks Google's spam policies and can get a site's rich
// results — or the site itself — demoted, so the markup stays empty until real
// reviews exist.
// ---------------------------------------------------------------------------

export type Testimonial = {
  /** Reviewer's name, as they gave it. */
  name: string;
  /** City — shown next to the name and useful social proof for a local brand. */
  city: string;
  /** Whole or half stars, 1–5. */
  rating: number;
  /** The review itself, in the customer's own words. */
  text: string;
  /** ISO date (YYYY-MM-DD) the review was given. Used in structured data. */
  date?: string;
  /**
   * True only for a real review from a real, identifiable Aaro Tec customer
   * that you can produce evidence for (a Google review, a signed testimonial,
   * a WhatsApp message you have permission to quote).
   */
  genuine?: boolean;
};

export const TESTIMONIALS: Testimonial[] = [
  // ---------------------------------------------------------------------
  // PLACEHOLDER COPY — replace with real Aaro Tec customers.
  // These were carried over from the previous site build. They are NOT
  // Aaro Tec reviews, so every one is marked `genuine: false` and none of
  // them reach the structured data. Swap them out before treating this
  // section as social proof.
  // ---------------------------------------------------------------------
  {
    name: "Vishal D.",
    city: "Hyderabad",
    rating: 5,
    text: "Using Aaro Tec has made daily life much more convenient. The touch panels look premium, the app control works smoothly, and the automation scenes are really useful. Integration with Alexa and Google Assistant is seamless. Overall, a great smart home experience with a modern feel.",
    genuine: false,
  },
  {
    name: "Kartik Kukadiya",
    city: "Hyderabad",
    rating: 5,
    text: "I've been using Aaro Tec's home automation products in my office, and the quality is truly impressive. The controls work flawlessly, and the luxury wall finish gives the space a premium, modern look.",
    genuine: false,
  },
  {
    name: "Pranay Sai U.",
    city: "Hyderabad",
    rating: 5,
    text: "I never expected home automation would be this good. Thanks a lot to Aaro Tec for making our home secure and beautiful, and thanks to the technical consultant for the coordination throughout.",
    genuine: false,
  },
  {
    name: "Prabhat Kumar Yadav",
    city: "Secunderabad",
    rating: 5,
    text: "I've been using the Aaro Tec touch switch for a while, and I'm genuinely impressed by its performance and sleek design. The capacitive touch response is smooth and highly accurate, offering a premium feel every time. It works flawlessly with both IR remotes and smartphone control, making it ideal for modern smart homes.",
    genuine: false,
  },
];

/**
 * Minimum number of genuine reviews before an aggregate rating is published.
 * A "5.0 from 1 review" badge reads as manufactured and is worth little.
 */
export const MIN_REVIEWS_FOR_AGGREGATE = 3;

/** Reviews cleared for use in structured data. */
export const genuineTestimonials = (): Testimonial[] =>
  TESTIMONIALS.filter((t) => t.genuine === true);

/**
 * Aggregate rating over genuine reviews only, or null when there are too few
 * to publish. Returning null keeps the AggregateRating node out of the page
 * entirely rather than emitting an empty or invented one.
 */
export function aggregateRating(): {
  ratingValue: string;
  reviewCount: number;
} | null {
  const reviews = genuineTestimonials();
  if (reviews.length < MIN_REVIEWS_FOR_AGGREGATE) return null;

  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return {
    ratingValue: (total / reviews.length).toFixed(1),
    reviewCount: reviews.length,
  };
}
