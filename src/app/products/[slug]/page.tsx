import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";
import { PRODUCTS, getProduct } from "@/lib/products";
import { SITE_URL, BUSINESS } from "@/lib/site";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };

  const title = `${product.name} — ${product.tagline}`;
  const url = `${SITE_URL}/products/${product.slug}`;
  const image = product.variants[0]?.src || BUSINESS.ogImage;

  return {
    title,
    description: product.desc,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      type: "website",
      siteName: BUSINESS.name,
      title: `${title} | ${BUSINESS.name}`,
      description: product.desc,
      url,
      images: [{ url: image, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${BUSINESS.name}`,
      description: product.desc,
      images: [image],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.desc,
    image: product.variants.map((v) => v.src),
    brand: { "@type": "Brand", name: BUSINESS.name },
    url: `${SITE_URL}/products/${product.slug}`,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      seller: { "@type": "Organization", name: BUSINESS.name },
    },
  };

  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <BreadcrumbJsonLd trail={[{ name: "Aaro Tec", path: "/" }, { name: "Products", path: "/#products" }, { name: product.name, path: `/products/${product.slug}` }]} />
      <Navbar />
      <ProductDetail product={product} />
      <Footer />
    </main>
  );
}
