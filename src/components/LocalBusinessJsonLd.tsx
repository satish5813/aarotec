import {
  AREAS_SERVED,
  BUSINESS,
  SAME_AS,
  SITE_URL,
  WARRANTY_YEARS,
} from "@/lib/site";
import { aggregateRating, genuineTestimonials } from "@/lib/testimonials";

/**
 * The single canonical entity node for the business.
 *
 * LocalBusiness is a subtype of Organization, so this one node replaces the
 * separate Organization markup the layout used to emit. Publishing both would
 * describe the same business twice and leave search engines to guess which is
 * authoritative — the stable `@id` below is what other nodes should reference.
 *
 * aggregateRating and review appear ONLY when src/lib/testimonials.ts contains
 * reviews marked `genuine: true`. Rating markup for invented reviews violates
 * Google's structured data spam policies, so with placeholder copy in place the
 * rating properties are simply absent.
 *
 * Still missing for full local rich-result eligibility (do not invent these —
 * add them when you have them): streetAddress, postalCode, geo coordinates,
 * openingHoursSpecification and priceRange.
 */
export default function LocalBusinessJsonLd() {
  const aggregate = aggregateRating();
  const reviews = genuineTestimonials();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    description: "Smart touch panels, smart switches and home automation",
    url: SITE_URL,
    telephone: BUSINESS.phone,
    email: BUSINESS.contactEmail,
    image: BUSINESS.ogImage,
    logo: BUSINESS.logo,
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      addressCountry: BUSINESS.country,
    },
    areaServed: [
      ...AREAS_SERVED.map((city) => ({ "@type": "City", name: city })),
      { "@type": "Country", name: "India" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BUSINESS.phone,
      contactType: "sales",
      areaServed: BUSINESS.country,
      availableLanguage: ["en", "hi", "te"],
    },
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Smart home automation supply and installation",
      },
      warranty: {
        "@type": "WarrantyPromise",
        durationOfWarranty: {
          "@type": "QuantitativeValue",
          value: WARRANTY_YEARS,
          unitCode: "ANN", // UN/CEFACT code for years
        },
      },
    },
    sameAs: [...SAME_AS],
    ...(aggregate && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: aggregate.ratingValue,
        reviewCount: aggregate.reviewCount,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    ...(reviews.length > 0 && {
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
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
