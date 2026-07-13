import { getDestination } from "@/lib/content/destinations";
import { FIJI_DESTINATION_COORDS } from "@/lib/fiji-map";
import { images } from "@/lib/images";

export interface FijiGlobeDestination {
  slug: string;
  title: string;
  tagline: string;
  overview: string;
  image: string;
  lat: number;
  lng: number;
  highlights: string[];
  bestTime: string;
  tours: string[];
}

const EXTRA_DESTINATIONS: FijiGlobeDestination[] = [
  {
    slug: "vanua-levu",
    title: "Vanua Levu",
    tagline: "Fiji's hidden northern paradise",
    overview:
      "Fiji's second-largest island — lush rainforests, pristine diving on the Great Sea Reef, and authentic village life away from the crowds.",
    image: images.vanuaLevu,
    lat: -16.626,
    lng: 179.398,
    highlights: ["Great Sea Reef", "Savusavu Bay", "Rainforest treks"],
    bestTime: "May – October",
    tours: ["Diving expeditions", "Plantation tours", "Hot springs visit"],
  },
  {
    slug: "kadavu",
    title: "Kadavu",
    tagline: "Untamed south — Astrolabe Reef",
    overview:
      "Remote and pristine, Kadavu offers world-class diving on the Great Astrolabe Reef, manta encounters, and eco-luxury in total seclusion.",
    image: images.kadavu,
    lat: -19.058,
    lng: 178.187,
    highlights: ["Astrolabe Reef", "Manta rays", "Eco-resorts"],
    bestTime: "April – November",
    tours: ["Reef diving packages", "Kayak expeditions", "Village immersions"],
  },
];

function fromDestination(slug: string, lat: number, lng: number): FijiGlobeDestination | null {
  const d = getDestination(slug);
  if (!d) return null;
  return {
    slug: d.slug,
    title: d.title,
    tagline: d.tagline,
    overview: d.overview,
    image: d.cardImage,
    lat,
    lng,
    highlights: d.highlights,
    bestTime: d.weather.split(".")[0] ?? "May – October",
    tours: d.tours,
  };
}

/** All 10 premium Fiji destinations for the 3D globe */
export const FIJI_GLOBE_DESTINATIONS: FijiGlobeDestination[] = [
  fromDestination("nadi", FIJI_DESTINATION_COORDS.nadi.lat, FIJI_DESTINATION_COORDS.nadi.lng)!,
  fromDestination("denarau", FIJI_DESTINATION_COORDS.denarau.lat, FIJI_DESTINATION_COORDS.denarau.lng)!,
  fromDestination("coral-coast", FIJI_DESTINATION_COORDS["coral-coast"].lat, FIJI_DESTINATION_COORDS["coral-coast"].lng)!,
  fromDestination("mamanuca", FIJI_DESTINATION_COORDS.mamanuca.lat, FIJI_DESTINATION_COORDS.mamanuca.lng)!,
  fromDestination("yasawa", FIJI_DESTINATION_COORDS.yasawa.lat, FIJI_DESTINATION_COORDS.yasawa.lng)!,
  fromDestination("suva", FIJI_DESTINATION_COORDS.suva.lat, FIJI_DESTINATION_COORDS.suva.lng)!,
  fromDestination("pacific-harbour", FIJI_DESTINATION_COORDS["pacific-harbour"].lat, FIJI_DESTINATION_COORDS["pacific-harbour"].lng)!,
  fromDestination("taveuni", FIJI_DESTINATION_COORDS.taveuni.lat, FIJI_DESTINATION_COORDS.taveuni.lng)!,
  ...EXTRA_DESTINATIONS,
];

export function getFijiGlobeDestination(slug: string) {
  return FIJI_GLOBE_DESTINATIONS.find((d) => d.slug === slug);
}

/** Local textures — avoids CDN failures that crash the globe */
export const FIJI_GLOBE_TEXTURES = {
  day: "/globe/earth-day.jpg",
  bump: "/globe/earth-bump.jpg",
  specular: "/globe/earth-specular.jpg",
  clouds: "/globe/earth-clouds.png",
  night: "/globe/earth-day.jpg",
} as const;
