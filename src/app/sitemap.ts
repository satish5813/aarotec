import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...PRODUCTS.map((p) => ({
      url: `${SITE_URL}/products/${p.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...["privacy-policy", "terms"].map((slug) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
