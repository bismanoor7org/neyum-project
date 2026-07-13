import { guides } from "@/lib/content/guides";
import { SITE_URL } from "@/lib/seo/config";
import { guideCategorySeo } from "@/lib/seo/routes";

export function GuidesJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Fiji Travel Guides",
    description:
      "Curated Fiji travel planning guides for luxury travellers — visas, seasons, resorts, diving, culture, food & drink, family travel and island hopping.",
    url: `${SITE_URL}/guides`,
    numberOfItems: guides.length,
    about: Object.values(guideCategorySeo).map((cluster) => ({
      "@type": "Thing",
      name: cluster.label,
      description: cluster.description,
    })),
    hasPart: guides.map((guide) => ({
      "@type": "Article",
      headline: guide.title,
      description: guide.excerpt,
      articleSection: guide.category,
      url: `${SITE_URL}/guides/${guide.slug}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
