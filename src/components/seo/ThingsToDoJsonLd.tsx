import { experiences } from "@/lib/content/experiences";
import { CMS_ROUTES } from "@/lib/cms/public-routes";
import { SITE_URL } from "@/lib/seo/config";

export function ThingsToDoJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Things To Do in Fiji",
    description:
      "Curated Fiji luxury experiences — diving, snorkelling, island hopping, village tours, waterfall hikes, sunset cruises and cultural adventures.",
    url: `${SITE_URL}${CMS_ROUTES.tours.index}`,
    numberOfItems: experiences.length,
    about: {
      "@type": "Country",
      name: "Fiji",
    },
    hasPart: experiences.map((exp) => ({
      "@type": "Article",
      headline: exp.title,
      description: exp.overview,
      articleSection: exp.category,
      url: `${SITE_URL}${CMS_ROUTES.tours.detail(exp.slug)}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
