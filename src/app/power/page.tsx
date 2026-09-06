import type { Metadata } from "next";
import WorldNavbar from "@/components/worlds/shared/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/worlds/shared/Contact";
import FAQ from "@/components/worlds/shared/FAQ";
import PowerHero from "@/components/worlds/power/PowerHero";
import Ticker from "@/components/worlds/power/Ticker";
import Range from "@/components/worlds/power/Range";
import Technology from "@/components/worlds/power/Technology";
import Defer from "@/components/Defer";
import { LazyRuntime, LazyUseCases } from "@/components/lazy";
import Assurance from "@/components/worlds/power/Assurance";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { POWER_FAQ, POWER_PRODUCTS } from "@/data/power";
import { SITE_URL, BUSINESS } from "@/lib/site";

const TITLE = "Portable power stations — silent home backup";
const DESC =
  "EcoFlow RIVER and DELTA portable power stations in Hyderabad and across India. One-hour recharge, sub-10 ms UPS, 4,000-cycle LFP batteries. Sized for your home, quoted on enquiry.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/power" },
  openGraph: {
    title: `${TITLE} | ${BUSINESS.name}`,
    description: DESC,
    url: `${SITE_URL}/power`,
    images: [{ url: `${SITE_URL}/power/delta-3-1.webp`, alt: "DELTA 3 portable power station" }],
  },
};

export default function PowerPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Portable power stations",
    itemListElement: POWER_PRODUCTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/power/${p.slug}`,
      name: p.name,
    })),
  };

  return (
    <div data-world="power">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <BreadcrumbJsonLd trail={[{ name: "Aaro Tec", path: "/" }, { name: "Power Backup", path: "/power" }]} />
      <WorldNavbar world="power" />
      <main>
        <PowerHero />
        <Ticker />
        <Range />
        <Defer id="runtime" minHeight="90vh"><LazyRuntime /></Defer>
        <Technology />
        <Defer id="use-cases" minHeight="80vh"><LazyUseCases /></Defer>
        <Assurance />
        <FAQ items={POWER_FAQ} heading="Straight answers on backup power" />
        <Contact
          interest="power"
          heading="Tell us what you want to keep running."
          intro="Appliances, hours and rooms — that's all we need. Pradeep will size a unit (and solar, if it earns its keep) and send a quote, usually within a working day."
        />
      </main>
      <Footer />
    </div>
  );
}
