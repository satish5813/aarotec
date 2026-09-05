import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WorldNavbar from "@/components/worlds/shared/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/worlds/shared/Contact";
import PowerDetail from "@/components/worlds/power/PowerDetail";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { POWER_PRODUCTS, getPowerProduct } from "@/data/power";
import { SITE_URL, BUSINESS } from "@/lib/site";

export function generateStaticParams() {
  return POWER_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPowerProduct(slug);
  if (!p) return { title: "Product not found" };
  const title = `${p.name} — ${p.tagline}`;
  const image = `${SITE_URL}${p.images[0]}`;
  return {
    title,
    description: p.intro,
    alternates: { canonical: `/power/${p.slug}` },
    openGraph: {
      type: "website",
      siteName: BUSINESS.name,
      title: `${title} | ${BUSINESS.name}`,
      description: p.intro,
      url: `${SITE_URL}/power/${p.slug}`,
      images: [{ url: image, alt: p.name }],
    },
    twitter: { card: "summary_large_image", title, description: p.intro, images: [image] },
  };
}

export default async function PowerProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getPowerProduct(slug);
  if (!product) notFound();

  const related = POWER_PRODUCTS.filter((p) => p.series === product.series && p.slug !== product.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.intro,
    image: product.images.map((i) => `${SITE_URL}${i}`),
    brand: { "@type": "Brand", name: "EcoFlow" },
    category: "Portable power station",
    additionalProperty: [
      { "@type": "PropertyValue", name: "Capacity", value: `${product.capacityWh} Wh` },
      { "@type": "PropertyValue", name: "AC output", value: `${product.outputW} W` },
      { "@type": "PropertyValue", name: "Weight", value: `${product.weightKg} kg` },
    ],
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      url: `${SITE_URL}/power/${product.slug}`,
      seller: { "@id": `${SITE_URL}/#business` },
    },
  };

  return (
    <div data-world="power">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbJsonLd trail={[{ name: "Aaro Tec", path: "/" }, { name: "Power Backup", path: "/power" }, { name: product.name, path: `/power/${product.slug}` }]} />
      <WorldNavbar world="power" />
      <main>
        <PowerDetail product={product} related={related} />
        <Contact interest="power" productName={product.name} heading={`Ask about the ${product.name}.`} />
      </main>
      <Footer />
    </div>
  );
}
