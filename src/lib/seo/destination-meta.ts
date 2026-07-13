import { FIJI_DESTINATION_COORDS } from "@/lib/fiji-map";
import { CMS_ROUTES } from "@/lib/cms/public-routes";
import { buildPageMetadata } from "./metadata";

/** Per-destination SEO — unique titles, descriptions, keywords & image alts */
export const destinationSeo: Record<
  string,
  {
    title: string;
    description: string;
    keywords: string[];
    imageAlt: string;
    heroAlt: string;
  }
> = {
  "coral-coast": {
    title: "Coral Coast Fiji — Luxury Beaches, Resorts & Fijian Culture",
    description:
      "Plan your Coral Coast Fiji holiday — golden Natadola beaches, luxury resorts, village ceremonies, river safaris and authentic Fijian culture on Viti Levu's southern shore.",
    keywords: [
      "Coral Coast Fiji",
      "Fiji beaches",
      "Natadola Beach",
      "Fiji luxury resorts",
      "Fiji cultural experiences",
    ],
    imageAlt: "Coral Coast Fiji luxury palm-lined beach and turquoise ocean",
    heroAlt: "Coral Coast Fiji golden beach aerial luxury coastline",
  },
  nadi: {
    title: "Nadi Fiji — Gateway to the Islands & Lagoon Aerial Views",
    description:
      "Discover Nadi Fiji — your gateway to Mamanuca and Yasawa islands, Denarau Marina, Sri Siva Subramaniya Temple and crystal-clear lagoon aerial views. Expert Nadi travel guide.",
    keywords: [
      "Nadi Fiji",
      "Fiji gateway",
      "Nadi airport",
      "Denarau Marina",
      "Fiji island vacations",
    ],
    imageAlt: "Nadi Fiji aerial lagoon view crystal-clear water",
    heroAlt: "Nadi Fiji gateway destination aerial lagoon",
  },
  denarau: {
    title: "Denarau Fiji — Luxury Marina, Resorts & Island Departures",
    description:
      "Explore Denarau Fiji — Port Denarau Marina, five-star Hilton and Sofitel resorts, championship golf, sunset cruises and the main departure point for Mamanuca island hopping.",
    keywords: [
      "Denarau Fiji",
      "Denarau marina",
      "Fiji luxury resorts",
      "Fiji resorts",
      "Fiji island hopping",
    ],
    imageAlt: "Denarau Fiji luxury marina and premium resort waterfront",
    heroAlt: "Denarau Fiji luxury resort marina aerial view",
  },
  mamanuca: {
    title: "Mamanuca Islands Fiji — Crystal Lagoons & Castaway Paradise",
    description:
      "Visit the Mamanuca Islands Fiji — turquoise lagoons, Likuliku overwater bures, world-class snorkelling, Cloudbreak surfing and barefoot luxury a short boat ride from Denarau.",
    keywords: [
      "Mamanuca Islands",
      "Fiji island vacations",
      "Fiji beaches",
      "Fiji snorkelling",
      "Fiji resorts",
    ],
    imageAlt: "Mamanuca Islands Fiji crystal lagoon tropical paradise",
    heroAlt: "Mamanuca Islands Fiji aerial turquoise lagoon",
  },
  yasawa: {
    title: "Yasawa Islands Fiji — Remote Blue Lagoons & Luxury Lodges",
    description:
      "Explore the Yasawa Islands Fiji — Sawa-i-Lau caves, blue lagoons, Turtle Island honeymoons, village homestays and exclusive eco-luxury retreats in untouched island beauty.",
    keywords: [
      "Yasawa Islands",
      "Fiji island hopping",
      "Fiji blue lagoon",
      "Fiji honeymoon packages",
      "Fiji luxury travel",
    ],
    imageAlt: "Yasawa Islands Fiji blue lagoon remote island beauty",
    heroAlt: "Yasawa Islands Fiji Sawa-i-Lau blue lagoon aerial",
  },
  taveuni: {
    title: "Taveuni Fiji — Garden Island Waterfalls, Rainforest & Diving",
    description:
      "Discover Taveuni Fiji — Bouma National Heritage Park, Tavoro Waterfalls, Rainbow Reef diving and the Garden Island's pristine rainforest adventures beyond the resort circuit.",
    keywords: [
      "Taveuni Fiji",
      "Fiji waterfalls",
      "Rainbow Reef diving",
      "Fiji adventure tours",
      "Fiji diving experiences",
    ],
    imageAlt: "Taveuni Fiji Garden Island waterfall rainforest",
    heroAlt: "Taveuni Fiji Bouma waterfalls tropical rainforest",
  },
  "pacific-harbour": {
    title: "Pacific Harbour Fiji — Adventure Capital & Beqa Shark Diving",
    description:
      "Experience Pacific Harbour Fiji — Beqa Lagoon shark diving, Navua River rafting, zip-lining, luxury villas and Fiji's adrenaline capital between Suva and the Coral Coast.",
    keywords: [
      "Pacific Harbour Fiji",
      "Fiji shark diving",
      "Fiji adventure tours",
      "Beqa Lagoon",
      "Fiji diving experiences",
    ],
    imageAlt: "Pacific Harbour Fiji adventure tourism tropical landscape",
    heroAlt: "Pacific Harbour Fiji rainforest river adventure landscape",
  },
  suva: {
    title: "Suva Fiji — Capital City, Culture, Markets & Waterfront",
    description:
      "Explore Suva Fiji — the modern capital with colonial architecture, Municipal Market, Fiji Museum, Thurston Gardens and a vibrant multicultural dining and arts scene.",
    keywords: [
      "Suva Fiji",
      "Fiji capital",
      "Fiji culture",
      "Fiji cultural experiences",
      "Fiji travel guide",
    ],
    imageAlt: "Suva Fiji capital city waterfront skyline",
    heroAlt: "Suva Fiji waterfront capital city view",
  },
  "vanua-levu": {
    title: "Vanua Levu Fiji — Savusavu, Rainforest & Hidden Island Luxury",
    description:
      "Discover Vanua Levu Fiji — Fiji's second-largest island with Savusavu hot springs, world-class diving, lush rainforest, copra plantations and intimate boutique luxury lodges.",
    keywords: [
      "Vanua Levu Fiji",
      "Savusavu Fiji",
      "Fiji diving experiences",
      "Fiji hidden gems",
      "Fiji luxury travel",
    ],
    imageAlt: "Vanua Levu Fiji Savusavu bay tropical island",
    heroAlt: "Vanua Levu Fiji rainforest coast luxury island",
  },
  kadavu: {
    title: "Kadavu Fiji — Great Astrolabe Reef, Diving & Untouched Nature",
    description:
      "Explore Kadavu Fiji — home to the Great Astrolabe Reef, pristine diving, manta ray encounters, traditional villages and one of the South Pacific's last untouched island paradises.",
    keywords: [
      "Kadavu Fiji",
      "Great Astrolabe Reef",
      "Fiji diving experiences",
      "Fiji adventure tours",
      "Fiji island vacations",
    ],
    imageAlt: "Kadavu Fiji Great Astrolabe Reef diving paradise",
    heroAlt: "Kadavu Fiji pristine reef and tropical coastline",
  },
  savusavu: {
    title: "Savusavu Fiji — Boutique Harbour & Great Sea Reef",
    description:
      "Discover Savusavu — Fiji's hidden northern harbour with hot springs, boutique resorts and world-class diving on the Great Sea Reef.",
    keywords: ["Savusavu Fiji", "Great Sea Reef", "Fiji diving", "boutique Fiji resorts"],
    imageAlt: "Savusavu Fiji horseshoe bay luxury harbour",
    heroAlt: "Savusavu Fiji boutique harbour aerial view",
  },
  "beqa-island": {
    title: "Beqa Island Fiji — Shark Diving & Fire-Walking",
    description:
      "Experience Beqa Lagoon — legendary shark dives, fire-walking ceremonies and pristine reefs south of Pacific Harbour.",
    keywords: ["Beqa Island Fiji", "shark diving Fiji", "fire walking Beqa", "Beqa Lagoon"],
    imageAlt: "Beqa Island Fiji shark diving lagoon",
    heroAlt: "Beqa Island Fiji adventure diving destination",
  },
  "mana-island": {
    title: "Mana Island Fiji — Family Mamanuca Island Escape",
    description:
      "Mana Island in the Mamanucas — family-friendly resorts, reef snorkelling and barefoot luxury minutes from Denarau.",
    keywords: ["Mana Island Fiji", "Mamanuca family resort", "Fiji island holiday"],
    imageAlt: "Mana Island Fiji turquoise lagoon resort",
    heroAlt: "Mana Island Fiji family island paradise",
  },
  "malolo-island": {
    title: "Malolo Island Fiji — Mamanuca Lagoon Resorts",
    description:
      "Malolo Lailai — boutique Mamanuca resorts, turquoise lagoons and diving a short speedboat from Port Denarau.",
    keywords: ["Malolo Island Fiji", "Malolo Lailai", "Mamanuca resorts"],
    imageAlt: "Malolo Island Fiji lagoon resort aerial",
    heroAlt: "Malolo Island Fiji boutique lagoon escape",
  },
  "tokoriki-island": {
    title: "Tokoriki Island Fiji — Honeymoon Mamanuca Resort",
    description:
      "Tokoriki Island Resort — intimate adults luxury, beachfront bures and romance in the heart of the Mamanuca Islands.",
    keywords: ["Tokoriki Island Fiji", "Fiji honeymoon resort", "Mamanuca luxury"],
    imageAlt: "Tokoriki Island Fiji beachfront bure resort",
    heroAlt: "Tokoriki Island Fiji honeymoon paradise",
  },
};

export function getDestinationMetadata(
  slug: string,
  fallback: { title: string; overview: string; cardImage: string; heroImage: string },
) {
  const seo = destinationSeo[slug];
  const coords = FIJI_DESTINATION_COORDS[slug];

  if (!seo) {
    return buildPageMetadata({
      title: `${fallback.title} — Luxury Fiji Travel Guide`,
      description: fallback.overview,
      path: CMS_ROUTES.destinations.detail(slug),
      image: fallback.cardImage,
      imageAlt: `${fallback.title} Fiji luxury destination`,
    });
  }

  return buildPageMetadata({
    title: seo.title,
    description: seo.description,
    path: CMS_ROUTES.destinations.detail(slug),
    keywords: seo.keywords,
    image: fallback.heroImage,
    imageAlt: seo.heroAlt,
  });
}

export function getDestinationCoords(slug: string) {
  return FIJI_DESTINATION_COORDS[slug];
}

export function getDestinationHeroAlt(slug: string, fallbackTitle: string) {
  return destinationSeo[slug]?.heroAlt ?? `${fallbackTitle} Fiji luxury destination`;
}

export function getDestinationCardAlt(slug: string, fallbackTitle: string) {
  return destinationSeo[slug]?.imageAlt ?? `${fallbackTitle} Fiji destination`;
}
