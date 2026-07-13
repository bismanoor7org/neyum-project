import type { Destination, DestinationMarketplaceData, Experience, Guide, Resort } from "@/lib/content/types";
import { CMS_ROUTES } from "@/lib/cms/public-routes";
import { SITE_URL } from "./config";
import { getDestinationCoords } from "./destination-meta";
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  touristDestinationSchema,
  webPageSchema,
} from "./json-ld";

export function destinationPageJsonLd(
  destination: Destination,
  marketplace?: DestinationMarketplaceData,
): object[] {
  const path = CMS_ROUTES.destinations.detail(destination.slug);
  const coords = getDestinationCoords(destination.slug);

  const schemas: object[] = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Destinations", path: CMS_ROUTES.destinations.index },
      { name: destination.title, path },
    ]),
    touristDestinationSchema({
      name: destination.title,
      description: destination.description ?? destination.overview,
      path,
      image: destination.heroImage,
      lat: coords?.lat,
      lng: coords?.lng,
    }),
    webPageSchema({
      name: `${destination.title} — Fiji Luxury Travel`,
      description: destination.tagline,
      path,
    }),
  ];

  if (marketplace && marketplace.stats.startingPrice) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Product",
      name: `${destination.title} Travel Packages`,
      description: destination.tagline,
      category: "Travel",
      offers: {
        "@type": "AggregateOffer",
        lowPrice: marketplace.stats.startingPrice.replace(/[^\d.]/g, ""),
        priceCurrency: "FJD",
        offerCount:
          marketplace.stats.experiences +
          marketplace.stats.stays +
          marketplace.stats.packages,
        availability: "https://schema.org/InStock",
      },
    });
  }

  const faq = faqSchema(destination.faqs);
  if (faq) schemas.push(faq);

  return schemas;
}

export function experiencePageJsonLd(experience: Experience): object[] {
  const path = CMS_ROUTES.tours.detail(experience.slug);

  const schemas: object[] = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Tours & Experiences", path: CMS_ROUTES.tours.index },
      { name: experience.title, path },
    ]),
    articleSchema({
      headline: experience.title,
      description: experience.overview,
      path,
      image: experience.heroImage,
      section: experience.category,
    }),
    webPageSchema({
      name: `${experience.title} — Fiji Experience`,
      description: experience.overview,
      path,
    }),
  ];

  const faq = faqSchema(experience.faqs);
  if (faq) schemas.push(faq);

  return schemas;
}

export function guidePageJsonLd(guide: Guide): object[] {
  const path = `/guides/${guide.slug}`;

  const schemas: object[] = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Travel Guides", path: "/guides" },
      { name: guide.title, path },
    ]),
    articleSchema({
      headline: guide.title,
      description: guide.excerpt,
      path,
      image: guide.heroImage,
      section: guide.category,
    }),
    webPageSchema({
      name: `${guide.title} — Fiji Travel Guide`,
      description: guide.excerpt,
      path,
    }),
  ];

  const faq = faqSchema(guide.faqs);
  if (faq) schemas.push(faq);

  return schemas;
}

export function resortPageJsonLd(resort: Resort): object[] {
  const path = CMS_ROUTES.stays.detail(resort.slug);

  return [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Places to Stay", path: CMS_ROUTES.stays.index },
      { name: resort.title, path },
    ]),
    webPageSchema({
      name: `${resort.title} — Fiji Luxury Resort`,
      description: resort.overview,
      path,
    }),
    {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      name: resort.title,
      description: resort.overview,
      url: `${SITE_URL}${path}`,
      image: resort.heroImage.startsWith("http")
        ? resort.heroImage
        : `${SITE_URL}${resort.heroImage}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: resort.location,
        addressCountry: "FJ",
      },
    },
  ];
}
