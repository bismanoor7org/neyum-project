/** Site-wide SEO configuration — single source of truth */
export const SITE_NAME = "My Fiji Tour";
export const SITE_TAGLINE = "Fiji Luxury Travel & Island Vacations";
export const SITE_DESCRIPTION =
  "Curated Fiji luxury travel — private islands, premium resorts, honeymoon packages, diving, adventure tours, cultural experiences and bespoke island hopping. Expert Fiji travel guides and concierge planning.";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.fijiluxuryexperiences.com";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/hero-luxury.png`;

export const TWITTER_HANDLE = "@FijiLuxury";

export const ORGANIZATION = {
  name: SITE_NAME,
  legalName: "Fiji Luxury Experiences",
  url: SITE_URL,
  logo: `${SITE_URL}/fav.png`,
  email: "concierge@fijiluxuryexperiences.com",
  telephone: "+679-000-0000",
  address: {
    streetAddress: "Denarau Marina",
    addressLocality: "Nadi",
    addressRegion: "Western Division",
    postalCode: "",
    addressCountry: "FJ",
  },
  geo: {
    latitude: -17.773,
    longitude: 177.376,
  },
  sameAs: [] as string[],
};
