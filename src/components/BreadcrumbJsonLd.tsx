import { SITE_URL } from "@/lib/site";

/** BreadcrumbList structured data. Pass the trail from the home page down
 *  to the current page; the last item is the page itself. */
export default function BreadcrumbJsonLd({ trail }: { trail: { name: string; path: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}${t.path}`,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
