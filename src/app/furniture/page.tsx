import type { Metadata } from "next";
import WorldNavbar from "@/components/worlds/shared/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/worlds/shared/Contact";
import FAQ from "@/components/worlds/shared/FAQ";
import FurnitureHero from "@/components/worlds/furniture/FurnitureHero";
import Collections from "@/components/worlds/furniture/Collections";
import Pieces from "@/components/worlds/furniture/Pieces";
import Craft from "@/components/worlds/furniture/Craft";
import Rooms from "@/components/worlds/furniture/Rooms";
import Reviews from "@/components/worlds/furniture/Reviews";
import { FURNITURE_FAQ, FURNITURE_PRODUCTS } from "@/data/furniture";
import { SITE_URL, BUSINESS } from "@/lib/site";

const TITLE = "Solid-wood furniture, made to order";
const DESC =
  "Architect-designed work tables, beds, storage, media consoles and chairs in solid ash, stained in seven finishes and hand-built by Indian artisans. Free pan-India delivery. Quoted on enquiry.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/furniture" },
  openGraph: {
    title: `${TITLE} | ${BUSINESS.name}`,
    description: DESC,
    url: `${SITE_URL}/furniture`,
    images: [{ url: `${SITE_URL}/furniture/loop-work-table-1.webp`, alt: "Loop work table in walnut" }],
  },
};

export default function FurniturePage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Solid-wood furniture",
    itemListElement: FURNITURE_PRODUCTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/furniture/${p.slug}`,
      name: p.name,
    })),
  };

  return (
    <div data-world="furniture">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <WorldNavbar world="furniture" />
      <main>
        <FurnitureHero />
        <Collections />
        <Pieces />
        <Craft />
        <Rooms />
        <Reviews />
        <FAQ items={FURNITURE_FAQ} heading="Before you order" serif />
        <Contact
          interest="furniture"
          heading="Tell us the piece. We'll quote it in your finish."
          intro="Name the piece, the size and the stain you're leaning toward. Pradeep will confirm lead time, send finish photographs and a quote — usually within a working day."
        />
      </main>
      <Footer />
    </div>
  );
}
