import { BUSINESS, SITE_URL } from "@/lib/site";
import { aggregateRating, genuineTestimonials } from "@/lib/testimonials";

/**
 * Review / AggregateRating structured data for the homepage.
 *
 * Renders nothing at all unless there are genuine reviews to describe — see
 * the note at the top of src/lib/testimonials.ts. Marking up invented reviews
 * violates Google's structured data spam policies, so an empty page is the
 * correct output until real testimonials exist.
 *
 * Note: Google does not show star rich results for "self-serving" reviews —
 * reviews about a business published on that business's own site. This markup
 * is still valid and read by other consumers, but stars in Google results
 * realistically require reviews attached to specific Products, or reviews left
 * on a third-party platform such as your Google Business Profile.
 */
export default function TestimonialsJsonLd() {
  const reviews = genuineTestimonials();
  if (reviews.length === 0) return null;

  const aggregate = aggregateRating();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS.name,
    url: SITE_URL,
    ...(aggregate && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: aggregate.ratingValue,
        reviewCount: aggregate.reviewCount,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: r.text,
      ...(r.date && { datePublished: r.date }),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
