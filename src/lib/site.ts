// Single source of truth for site-wide metadata, used by layout metadata,
// sitemap, robots, JSON-LD structured data and the lead API.

// Set NEXT_PUBLIC_SITE_URL in your environment (e.g. https://aarohanainfratech.com)
// for production. Falls back to localhost in development.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

export const BUSINESS = {
  name: "Aaro Tec",
  legalName: "Aaro Tec",
  tagline: "Transforming spaces and enhancing lives",
  description:
    "Aaro Tec designs intelligent touch panels and a connected home ecosystem. Control lights, fans, curtains and climate with a single, beautiful interface.",
  phone: "+91 83090 47843",
  phoneHref: "+918309047843",
  contactPerson: "Pradeep",
  city: "Hyderabad",
  region: "Telangana",
  country: "IN",
  // A representative image used for social-share previews.
  ogImage:
    "https://whitelion-assets.blr1.cdn.digitaloceanspaces.com/website/home/products/AirGlassBlack.png",
} as const;
