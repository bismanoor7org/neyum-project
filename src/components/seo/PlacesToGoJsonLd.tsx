import { destinations } from "@/lib/content/destinations";
import { CMS_ROUTES } from "@/lib/cms/public-routes";
import { destinationSeo } from "@/lib/seo/destination-meta";
import { SITE_URL } from "@/lib/seo/config";

export function PlacesToGoJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Best Places to Visit in Fiji",
    description:
      "Luxury Fiji destination guides — Nadi, Denarau, Coral Coast, Mamanuca, Yasawa, Taveuni, Suva, Pacific Harbour and more.",
    url: `${SITE_URL}${CMS_ROUTES.destinations.index}`,
    numberOfItems: destinations.length,
    about: {
      "@type": "Country",
      name: "Fiji",
    },
    hasPart: destinations.map((d) => {
      const seo = destinationSeo[d.slug];
      return {
        "@type": "TouristDestination",
        name: d.title,
        description: seo?.description ?? d.tagline,
        url: `${SITE_URL}${CMS_ROUTES.destinations.detail(d.slug)}`,
      };
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
