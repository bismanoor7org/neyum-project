import { images } from "@/lib/images";
import type { ThingsToDoFilterKey } from "./things-to-do-categories";
import { THINGS_TO_DO_BY_FILTER } from "./things-to-do-categories";

export interface FeaturedHighlight {
  label: string;
  value: string;
}

export interface CategoryPageConfig {
  heroTitle: string;
  heroSubtitle: string;
  heroImageAlt: string;
  featuredHighlights: FeaturedHighlight[];
  ctaTitle: string;
  ctaSubtitle: string;
}

/** Per-category editorial page config — hero copy & storytelling */
export const CATEGORY_PAGE_CONFIG: Record<ThingsToDoFilterKey, CategoryPageConfig> = {
  filterAdventure: {
    heroTitle: "Wild Fiji Awaits",
    heroSubtitle:
      "Shark dives in Beqa Lagoon, Navua River rapids, Cloudbreak surf and rainforest ziplines — adrenaline across the archipelago.",
    heroImageAlt: "Fiji adventure diving and rainforest expedition",
    featuredHighlights: [
      { label: "Duration", value: "Half to full day" },
      { label: "Departure", value: "Pacific Harbour & Denarau" },
      { label: "Level", value: "All abilities" },
      { label: "Includes", value: "Expert guides & gear" },
    ],
    ctaTitle: "Ready for your Fiji adventure?",
    ctaSubtitle: "Our concierge books shark dives, rafting, surf charters and private island hops — tailored to your pace.",
  },
  filterCulture: {
    heroTitle: "Discover The Heart Of Fiji",
    heroSubtitle:
      "Sevusevu welcomes, kava ceremonies, meke performances and village life — authentic Fijian culture with respectful local guides.",
    heroImageAlt: "Traditional Fijian village cultural ceremony",
    featuredHighlights: [
      { label: "Format", value: "Village & ceremony" },
      { label: "Regions", value: "Coral Coast & Viti Levu" },
      { label: "Guide", value: "Local cultural host" },
      { label: "Includes", value: "Lovo feast option" },
    ],
    ctaTitle: "Connect with living Fijian culture",
    ctaSubtitle: "We arrange respectful village visits, private kava ceremonies and cultural evenings with vetted hosts.",
  },
  filterNature: {
    heroTitle: "Wild Fiji Landscapes",
    heroSubtitle:
      "Bouma waterfalls, Rainbow Reef, blue lagoons and ancient rainforest — Fiji's Garden Island and marine sanctuaries.",
    heroImageAlt: "Taveuni waterfall and Fiji rainforest paradise",
    featuredHighlights: [
      { label: "Highlights", value: "Waterfalls & reefs" },
      { label: "Island", value: "Taveuni & Yasawa" },
      { label: "Access", value: "Guided treks & boats" },
      { label: "Best season", value: "May – October" },
    ],
    ctaTitle: "Explore Fiji's wildest corners",
    ctaSubtitle: "Rainforest treks, reef dives and lagoon charters — curated for nature lovers who travel in style.",
  },
  filterFamily: {
    heroTitle: "Fiji For Every Generation",
    heroSubtitle:
      "Safe lagoon beaches, kids' clubs, wildlife parks and island days — multi-generational holidays designed for ease and wonder.",
    heroImageAlt: "Family holiday Fiji resort lagoon beach",
    featuredHighlights: [
      { label: "Ages", value: "All family members" },
      { label: "Beaches", value: "Sheltered lagoons" },
      { label: "Resorts", value: "Kids' clubs & pools" },
      { label: "Activities", value: "Wildlife & culture" },
    ],
    ctaTitle: "Plan a seamless family escape",
    ctaSubtitle: "Interconnecting bures, nanny services and age-perfect excursions — one concierge, zero stress.",
  },
  filterRomance: {
    heroTitle: "Milestone Escapes",
    heroSubtitle:
      "Sunset cruises, overwater bures, private sandbank dinners and island buyouts — milestone moments in the South Pacific.",
    heroImageAlt: "Romantic sunset cruise couple Fiji islands",
    featuredHighlights: [
      { label: "Duration", value: "2–3 hours to multi-night" },
      { label: "Departure", value: "Denarau & Yasawa" },
      { label: "Includes", value: "Champagne & private dining" },
      { label: "Entertainment", value: "Live Fijian guitar" },
    ],
    ctaTitle: "Craft your perfect Fiji love story",
    ctaSubtitle: "Honeymoons, anniversaries and proposals — private charters, sandbank tables and adults-only sanctuaries.",
  },
  filterWellness: {
    heroTitle: "Island Renewal",
    heroSubtitle:
      "Oceanfront yoga, bobo massage, luxury spa rituals and reef meditation — slow luxury across the Pacific horizon.",
    heroImageAlt: "Fiji wellness spa yoga oceanfront retreat",
    featuredHighlights: [
      { label: "Focus", value: "Spa & mindfulness" },
      { label: "Setting", value: "Ocean & rainforest" },
      { label: "Treatments", value: "Bobo & botanical" },
      { label: "Retreats", value: "Multi-day programmes" },
    ],
    ctaTitle: "Begin your island renewal",
    ctaSubtitle: "Spa buyouts, dawn yoga sessions and digital-detox retreats — curated for deep rest.",
  },
  filterCruising: {
    heroTitle: "Sail The Fiji Islands",
    heroSubtitle:
      "Island hopping, luxury catamarans, private yachts and Yasawa Flyer routes — the archipelago from the water.",
    heroImageAlt: "Luxury yacht sailing Fiji island hopping",
    featuredHighlights: [
      { label: "Vessels", value: "Yacht & catamaran" },
      { label: "Routes", value: "Mamanuca & Yasawa" },
      { label: "Style", value: "Private or shared" },
      { label: "Includes", value: "Snorkel stops & canapés" },
    ],
    ctaTitle: "Chart your course across Fiji",
    ctaSubtitle: "Private yachts with captain and chef, or elegant shared sails — every horizon handpicked.",
  },
};

export function getCategoryHeroImage(key: ThingsToDoFilterKey) {
  return THINGS_TO_DO_BY_FILTER[key][0]?.image ?? images.heroThingsToDo;
}
