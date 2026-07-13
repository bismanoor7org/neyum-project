import { buildPageMetadata } from "./metadata";
import { SITE_NAME } from "./config";
import { CMS_ROUTES } from "@/lib/cms/public-routes";

const FIJI_KEYWORDS = [
  "Fiji luxury travel",
  "Fiji island vacations",
  "Fiji travel guide",
  "Fiji resorts",
  "things to do in Fiji",
  "best places to visit in Fiji",
] as const;

/** Static marketing pages — unique titles & descriptions */
export const staticPageSeo = {
  home: buildPageMetadata({
    title: SITE_NAME,
    description:
      "Discover Fiji luxury travel with curated island vacations, premium resorts, honeymoon packages, diving, adventure tours and cultural experiences. Plan your Fiji escape with expert concierge guidance.",
    path: "/",
    keywords: [
      ...FIJI_KEYWORDS,
      "Fiji honeymoon packages",
      "Fiji diving experiences",
      "Fiji adventure tours",
      "Fiji island hopping",
      "Fiji family holidays",
    ],
    image: "/hero-luxury.png",
    imageAlt: "Fiji luxury island vacation aerial view",
  }),

  destinations: buildPageMetadata({
    title: "Best Places to Visit in Fiji — Destinations & Island Guides",
    description:
      "Explore the best places to visit in Fiji — Nadi, Denarau, Coral Coast, Mamanuca, Yasawa, Taveuni, Suva, Pacific Harbour, Vanua Levu and Kadavu. Luxury destination guides for discerning travellers.",
    path: CMS_ROUTES.destinations.index,
    keywords: [
      "best places to visit in Fiji",
      "Fiji destinations",
      "Fiji islands",
      "Fiji travel guide",
      "Fiji beaches",
    ],
    imageAlt: "Fiji destinations map luxury travel",
  }),

  tours: buildPageMetadata({
    title: "Things To Do in Fiji — Adventures, Culture & Luxury Experiences",
    description:
      "Curated things to do in Fiji — shark diving, snorkelling, island hopping, village tours, lovo feasts, waterfall hikes, sunset cruises and wellness retreats across the Fiji Islands.",
    path: CMS_ROUTES.tours.index,
    keywords: [
      "things to do in Fiji",
      "Fiji adventure tours",
      "Fiji cultural experiences",
      "Fiji diving experiences",
      "Fiji island hopping",
    ],
    imageAlt: "Things to do in Fiji luxury experiences",
  }),

  /** @deprecated Use `destinations` — kept for legacy redirect pages */
  placesToGo: buildPageMetadata({
    title: "Best Places to Visit in Fiji — Destinations & Island Guides",
    description:
      "Explore the best places to visit in Fiji — Nadi, Denarau, Coral Coast, Mamanuca, Yasawa, Taveuni, Suva, Pacific Harbour, Vanua Levu and Kadavu. Luxury destination guides for discerning travellers.",
    path: "/places-to-go",
    keywords: [
      "best places to visit in Fiji",
      "Fiji destinations",
      "Fiji islands",
      "Fiji travel guide",
      "Fiji beaches",
    ],
    imageAlt: "Fiji destinations map luxury travel",
  }),

  /** @deprecated Use `tours` — kept for legacy redirect pages */
  thingsToDo: buildPageMetadata({
    title: "Things To Do in Fiji — Adventures, Culture & Luxury Experiences",
    description:
      "Curated things to do in Fiji — shark diving, snorkelling, island hopping, village tours, lovo feasts, waterfall hikes, sunset cruises and wellness retreats across the Fiji Islands.",
    path: "/things-to-do",
    keywords: [
      "things to do in Fiji",
      "Fiji adventure tours",
      "Fiji cultural experiences",
      "Fiji diving experiences",
      "Fiji island hopping",
    ],
    imageAlt: "Things to do in Fiji luxury experiences",
  }),

  placesToStay: buildPageMetadata({
    title: "Fiji Resorts & Luxury Accommodation — Premium Island Stays",
    description:
      "Handpicked Fiji resorts and luxury accommodation — overwater bures, private island lodges, Denarau five-star resorts and Coral Coast beach retreats. Book with concierge best-price guarantee.",
    path: "/places-to-stay",
    keywords: [
      "Fiji resorts",
      "Fiji luxury accommodation",
      "Fiji overwater bungalows",
      "Denarau resorts",
      "Fiji honeymoon resorts",
    ],
    imageAlt: "Fiji luxury resort overwater accommodation",
  }),

  guides: buildPageMetadata({
    title: "Fiji Travel Guide — Expert Planning for Luxury Island Holidays",
    description:
      "Comprehensive Fiji travel guides — visas, best time to visit, luxury resorts, diving, surfing, culture, food & drink, family travel, honeymoon planning and island hopping itineraries.",
    path: "/guides",
    keywords: [
      "Fiji travel guide",
      "Fiji luxury travel",
      "Fiji honeymoon guide",
      "Fiji diving guide",
      "Fiji family travel",
      "Fiji culture guide",
    ],
    imageAlt: "Fiji travel guide luxury planning",
  }),

  deals: buildPageMetadata({
    title: "Fiji Deals & Offers — Luxury Packages & Exclusive Island Rates",
    description:
      "Exclusive Fiji deals and luxury packages — resort stays, honeymoon escapes, family holidays, shark dive adventures and private island buyouts. Best price guarantee on every booking.",
    path: "/deals-and-offers",
    keywords: [
      "Fiji honeymoon packages",
      "Fiji resort deals",
      "Fiji luxury packages",
      "Fiji island deals",
    ],
    imageAlt: "Fiji luxury travel deals and packages",
  }),

  events: buildPageMetadata({
    title: "Fiji Events & Festivals — Culture, Regattas & Island Celebrations",
    description:
      "Discover Fiji events and festivals — Bula Festival, firewalking ceremonies, regattas, food & wine celebrations and cultural gatherings across Viti Levu and the outer islands.",
    path: "/events",
    keywords: ["Fiji events", "Fiji festivals", "Fiji cultural experiences", "Fiji travel"],
    imageAlt: "Fiji cultural festival events",
  }),

  itineraries: buildPageMetadata({
    title: "Fiji Itineraries — Bespoke Luxury Island Travel Plans",
    description:
      "Curated Fiji itineraries for luxury travellers — Mamanuca escapes, Yasawa adventures, Coral Coast culture, Taveuni nature and multi-island hopping routes tailored by concierge.",
    path: "/itineraries",
    keywords: ["Fiji itineraries", "Fiji island hopping", "Fiji luxury travel", "Fiji travel planning"],
    imageAlt: "Fiji luxury travel itinerary island hopping",
  }),

  thingsToKnow: buildPageMetadata({
    title: "Things To Know Before Visiting Fiji — Essential Travel Information",
    description:
      "Essential Fiji travel information — weather, currency, health, transport, customs and practical tips for first-time and returning luxury visitors to the Fiji Islands.",
    path: "/things-to-know",
    keywords: ["Fiji travel tips", "Fiji travel guide", "visiting Fiji", "Fiji essentials"],
    imageAlt: "Fiji travel information guide",
  }),

  faq: buildPageMetadata({
    title: "Fiji Travel FAQ — Answers for Luxury Island Visitors",
    description:
      "Frequently asked questions about Fiji luxury travel — visas, currency, best season, resorts, diving, island transfers, customs and concierge booking support.",
    path: "/faq",
    keywords: ["Fiji FAQ", "Fiji travel questions", "Fiji luxury travel", "visiting Fiji"],
    imageAlt: "Fiji travel frequently asked questions",
  }),

  about: buildPageMetadata({
    title: "About Fiji Luxury Experiences — Curated South Pacific Travel",
    description:
      "Fiji Luxury Experiences is a curated Fiji tourism platform connecting discerning travellers with premium resorts, authentic adventures and bespoke island itineraries across the Fiji Islands.",
    path: "/about",
    keywords: ["Fiji luxury travel", "Fiji tourism", "South Pacific travel"],
    imageAlt: "About Fiji Luxury Experiences travel platform",
  }),

  contact: buildPageMetadata({
    title: "Contact Fiji Concierge — Plan Your Luxury Island Journey",
    description:
      "Speak with our Fiji travel concierge — bespoke itineraries, resort bookings, diving charters, cultural experiences and honeymoon planning across the Fiji Islands.",
    path: "/contact",
    keywords: ["Fiji travel concierge", "plan Fiji trip", "Fiji luxury travel"],
    imageAlt: "Contact Fiji luxury travel concierge",
  }),

  tripPlanner: buildPageMetadata({
    title: "Plan My Fiji Journey — Bespoke Concierge Itinerary Planner",
    description:
      "Craft your Fiji journey with our concierge planners — choose destinations, travel dates, travellers, budget and experience style for a bespoke luxury itinerary.",
    path: "/trip-planner",
    keywords: [
      "plan Fiji trip",
      "Fiji itinerary planner",
      "Fiji luxury travel",
      "Fiji concierge planning",
      "bespoke Fiji journey",
    ],
    imageAlt: "Plan a bespoke Fiji luxury journey",
  }),

  explore: buildPageMetadata({
    title: "Explore The World — Luxury Destinations Beyond Fiji",
    description:
      "Explore luxury destinations worldwide — curated country guides, city insights and bespoke journeys. Start with Fiji and discover the South Pacific and beyond.",
    path: "/explore",
    keywords: ["luxury travel", "world destinations", "Fiji luxury travel"],
    imageAlt: "Explore luxury world destinations",
  }),

  exploreMap: buildPageMetadata({
    title: "Fiji Explorer Map — Interactive Island Destination Guide",
    description:
      "Explore Fiji on an interactive map — discover Nadi, Denarau, Mamanuca, Yasawa, Coral Coast, Taveuni, Suva and Pacific Harbour with luxury travel insights.",
    path: "/explore-map",
    keywords: ["Fiji map", "Fiji destinations", "Fiji island guide", "Fiji travel"],
    imageAlt: "Interactive Fiji explorer map",
  }),

  search: buildPageMetadata({
    title: "Search Fiji Luxury Travel — Resorts, Experiences & Guides",
    description:
      "Search Fiji luxury resorts, experiences, destinations and travel guides. Find your perfect island vacation with curated results and concierge support.",
    path: "/search",
    keywords: ["search Fiji travel", "Fiji resorts", "Fiji experiences"],
    imageAlt: "Search Fiji luxury travel",
  }),

  privacy: buildPageMetadata({
    title: "Privacy Statement — Fiji Luxury Experiences",
    description:
      "Privacy policy for Fiji Luxury Experiences — how we collect, use and protect your personal information when planning Fiji luxury travel.",
    path: "/privacy",
    noIndex: true,
  }),

  login: buildPageMetadata({
    title: "Login — Fiji Luxury Experiences",
    description: "Sign in to your Fiji Luxury Experiences account to manage bookings and saved journeys.",
    path: "/login",
    noIndex: true,
  }),

  sitemap: buildPageMetadata({
    title: "Sitemap — Fiji Luxury Experiences",
    description:
      "Complete sitemap of Fiji Luxury Experiences — destinations, experiences, resorts, travel guides, deals and planning resources across the Fiji Islands.",
    path: "/sitemap",
    keywords: ["Fiji sitemap", "Fiji travel pages"],
  }),

  tools: buildPageMetadata({
    title: "Travel Tools — Visa, Time, Weather & Trip Planning",
    description:
      "Premium Fiji travel tools — visa eligibility, entry guides, local time, weather, currency conversion, trip costs, and budget planning in one hub.",
    path: "/tools",
    keywords: [
      "Fiji travel tools",
      "Fiji visa checker",
      "Fiji time",
      "Fiji weather",
      "Fiji currency converter",
    ],
    imageAlt: "Fiji luxury travel planning tools",
  }),

  visaChecker: buildPageMetadata({
    title: "Fiji Visa Eligibility Checker — Instant Requirements by Nationality",
    description:
      "Check Fiji visa requirements for your nationality in seconds. Visa-free, visa on arrival, eVisa and visa-required guidance with documents and downloadable checklists.",
    path: "/fiji-visa-checker",
    keywords: [
      "Fiji visa",
      "Fiji visa checker",
      "Fiji visa requirements",
      "Fiji visa free",
      "Fiji visa on arrival",
    ],
    imageAlt: "Fiji visa eligibility checker",
  }),
} as const;
