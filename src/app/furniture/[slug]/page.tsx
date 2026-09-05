import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WorldNavbar from "@/components/worlds/shared/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/worlds/shared/Contact";
import FurnitureDetail from "@/components/worlds/furniture/FurnitureDetail";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { COLLECTIONS, FURNITURE_PRODUCTS, getFurnitureProduct } from "@/data/furniture";
import { SITE_URL, BUSINESS } from "@/lib/site";

export function generateStaticParams() {
  return FURNITURE_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getFurnitureProduct(slug);
  if (!p) return { title: "Piece not found" };
  const title = `${p.name} — ${COLLECTIONS[p.collection].name} collection`;
  const image = `${SITE_URL}${p.images[0]}`;
  return {
    title,
    description: p.story,
    alternates: { canonical: `/furniture/${p.slug}` },
    openGraph: {
      type: "website",
      siteName: BUSINESS.name,
      title: `${title} | ${BUSINESS.name}`,
      description: p.story,
      url: `${SITE_URL}/furniture/${p.slug}`,
      images: [{ url: image, alt: p.name }],
    },
    twitter: { card: "summary_large_image", title, description: p.story, images: [image] },
  };
}

export default async function FurnitureProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getFurnitureProduct(slug);
  if (!product) notFound();

  const related = FURNITURE_PRODUCTS.filter((p) => p.collection === product.collection && p.slug !== product.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.story,
    image: product.images.map((i) => `${SITE_URL}${i}`),
    material: "Ash wood",
    category: product.category.replace("-", " "),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/PreOrder",
      priceCurrency: "INR",
      url: `${SITE_URL}/furniture/${product.slug}`,
      seller: { "@id": `${SITE_URL}/#business` },
    },
  };

  return (
    <div data-world="furniture">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbJsonLd trail={[{ name: "Aaro Tec", path: "/" }, { name: "Furniture", path: "/furniture" }, { name: product.name, path: `/furniture/${product.slug}` }]} />
      <WorldNavbar world="furniture" />
      <main>
        <FurnitureDetail product={product} related={related} />
        <Contact interest="furniture" productName={product.name} heading={`Quote the ${product.name} in your finish.`} />
      </main>
      <Footer />
    </div>
  );
}
