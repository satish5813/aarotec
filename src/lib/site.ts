// Single source of truth for site-wide metadata, used by layout metadata,
// sitemap, robots, JSON-LD structured data and the lead API.
//
// This module is server-only (imported by layout/metadata/robots/sitemap), so
// it may read non-public Vercel env vars.

/** The live production domain. Used as the last-resort fallback so a build can
 *  never ship canonical/OG tags pointing at localhost. */
const PRODUCTION_URL = "https://www.aarotec.in";

const strip = (u: string) => u.replace(/\/+$/, "");

function resolveSiteUrl(): string {
  // 1. Explicit override — set this in .env.local (dev) and in the Vercel
  //    project's Environment Variables (production/preview).
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return strip(explicit);

  // 2. Vercel: the stable production domain of the project (no protocol).
  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProd && process.env.VERCEL_ENV === "production") {
    return strip(`https://${vercelProd}`);
  }

  // 3. Vercel: the per-deployment URL (preview deploys).
  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) return strip(`https://${vercelUrl}`);

  // 4. Local development only.
  if (process.env.NODE_ENV !== "production") return "http://localhost:3000";

  // 5. Any other production build — never localhost.
  return PRODUCTION_URL;
}

export const SITE_URL = resolveSiteUrl();

export const BUSINESS = {
  name: "Aaro Tec",
  legalName: "Aaro Tec",
  tagline: "Transforming spaces and enhancing lives",
  description:
    "Aaro Tec designs intelligent touch panels and a connected home ecosystem. Control lights, fans, curtains and climate with a single, beautiful interface.",
  phone: "+91 83090 47843",
  phoneHref: "+918309047843",
  // Mailbox used for privacy / data-deletion requests. Meta reviews this
  // address when approving Lead Ads, so it must actually receive mail.
  email: "privacy@aarotec.in",
  // Public sales / enquiry mailbox shown in the contact section.
  contactEmail: "aarohanainfrasolutions@gmail.com",
  contactPerson: "Pradeep",
  whatsapp:
    "https://wa.me/918309047843?text=Hi%20Pradeep%2C%20I%27d%20like%20to%20know%20more%20about%20Aaro%20Tec",
  city: "Hyderabad",
  region: "Telangana",
  country: "IN",
  // A representative image used for social-share previews (absolute URL).
  ogImage: `${SITE_URL}/products/airglass-black.jpg`,
  // Official brand logo (full lockup) — used for JSON-LD Organization data.
  logo: `${SITE_URL}/newaarotec.jpeg`,
} as const;

/** Shown on the Privacy Policy and Terms pages. Update whenever either
 *  document changes materially. */
export const LEGAL_LAST_UPDATED = "26 August 2026";

/** Cities we actively sell and install in, plus nationwide coverage. Used for
 *  the areaServed property of the LocalBusiness structured data. */
export const AREAS_SERVED = [
  "Hyderabad",
  "Vijayawada",
  "Visakhapatnam",
  "Guntur",
  "Nellore",
  "Tirupati",
  "Rajahmundry",
  "Kakinada",
] as const;

/** Official profiles on other platforms. Only add a URL that is genuinely the
 *  business's own profile — sameAs is how search engines reconcile identity. */
export const SAME_AS = [
  "https://www.linkedin.com/in/pradeep-ravulapati-investments",
] as const;

/** Longest warranty offered, in years. Surfaced in structured data. */
export const WARRANTY_YEARS = 7;

/** The two dedicated product worlds published under Aaro Tec, each with its
 *  own visual identity. Used by the navbar, the home "services" section, the
 *  footer and structured data. */
export const WORLDS = {
  power: {
    href: "/power",
    label: "Power Backup",
    eyebrow: "Portable power stations",
    blurb: "Silent, fume-free backup that recharges in an hour and runs for years.",
  },
  furniture: {
    href: "/furniture",
    label: "Furniture",
    eyebrow: "Sculptural solid-wood furniture",
    blurb: "Architect-designed pieces in ash wood, stained in seven finishes, made to order.",
  },
} as const;
