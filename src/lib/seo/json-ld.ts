import { ORGANIZATION, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./config";
import type { FAQItem } from "@/lib/content/types";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

function abs(path: string) {
  return path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: ORGANIZATION.name,
        legalName: ORGANIZATION.legalName,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: ORGANIZATION.logo,
        },
        description: SITE_DESCRIPTION,
        email: ORGANIZATION.email,
        telephone: ORGANIZATION.telephone,
        address: {
          "@type": "PostalAddress",
          streetAddress: ORGANIZATION.address.streetAddress,
          addressLocality: ORGANIZATION.address.addressLocality,
          addressRegion: ORGANIZATION.address.addressRegion,
          addressCountry: ORGANIZATION.address.addressCountry,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: ORGANIZATION.geo.latitude,
          longitude: ORGANIZATION.geo.longitude,
        },
        areaServed: {
          "@type": "Country",
          name: "Fiji",
        },
      },
      {
        "@type": "TravelAgency",
        "@id": `${SITE_URL}/#travel-agency`,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Nadi",
          addressCountry: "FJ",
        },
        areaServed: "Fiji",
        priceRange: "$$$$",
        knowsAbout: [
          "Fiji luxury travel",
          "Fiji island vacations",
          "Fiji honeymoon packages",
          "Fiji diving experiences",
          "Fiji adventure tours",
          "Fiji cultural experiences",
          "Fiji island hopping",
        ],
      },
    ],
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function touristDestinationSchema(input: {
  name: string;
  description: string;
  path: string;
  image: string;
  lat?: number;
  lng?: number;
}) {
  const imageUrl = input.image.startsWith("http")
    ? input.image
    : `${SITE_URL}${input.image}`;

  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: input.name,
    description: input.description,
    url: abs(input.path),
    image: imageUrl,
    containedInPlace: {
      "@type": "Country",
      name: "Fiji",
    },
    ...(input.lat != null && input.lng != null
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: input.lat,
            longitude: input.lng,
          },
        }
      : {}),
  };
}

export function articleSchema(input: {
  headline: string;
  description: string;
  path: string;
  image?: string;
  section?: string;
  datePublished?: string;
}) {
  const imageUrl = input.image
    ? input.image.startsWith("http")
      ? input.image
      : `${SITE_URL}${input.image}`
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    url: abs(input.path),
    image: imageUrl,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: ORGANIZATION.logo,
      },
    },
    articleSection: input.section,
    datePublished: input.datePublished ?? "2024-01-01",
    mainEntityOfPage: abs(input.path),
  };
}

export function faqSchema(faqs: FAQItem[]) {
  if (faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function webPageSchema(input: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.name,
    description: input.description,
    url: abs(input.path),
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: "Fiji Luxury Travel",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": `${SITE_URL}/#organization` },
    about: {
      "@type": "Country",
      name: "Fiji",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search`,
      },
    },
  };
}
