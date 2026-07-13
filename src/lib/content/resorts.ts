import { images } from "@/lib/images";
import type { Resort } from "./types";

export const resorts: Resort[] = [
  {
    slug: "likuliku-lagoon",
    title: "Likuliku Lagoon Resort",
    location: "Mamanuca Islands",
    stars: 5,
    priceFrom: "FJD 1,850",
    heroImage: images.resortLikuliku,
    overview:
      "Fiji's only resort with overwater bures, Likuliku pairs adults-only intimacy with world-class dining and a lagoon that glows at sunset.",
    amenities: ["Overwater bures", "Adults only", "Spa", "Private beach", "Fine dining"],
    experiences: ["Snorkelling", "Sunset cruise", "Spa rituals"],
    relatedSlugs: ["tokoriki-island", "castaway-island"],
  },
  {
    slug: "tokoriki-island",
    title: "Tokoriki Island Resort",
    location: "Mamanuca Islands",
    stars: 5,
    priceFrom: "FJD 1,200",
    heroImage: images.resortTokoriki,
    overview:
      "An intimate 36-bure island where barefoot luxury meets Fijian warmth — perfect for honeymoons and milestone celebrations.",
    amenities: ["Beachfront bures", "Spa", "Diving centre", "Private dining"],
    experiences: ["Diving", "Island picnic", "Village visit"],
    relatedSlugs: ["likuliku-lagoon", "hilton-fiji"],
  },
  {
    slug: "hilton-fiji",
    title: "Hilton Fiji Beach Resort & Spa",
    location: "Denarau",
    stars: 5,
    priceFrom: "FJD 650",
    heroImage: images.resortHilton,
    overview:
      "Denarau's flagship family-friendly luxury — expansive pools, championship adjacency and seamless marina access for island adventures.",
    amenities: ["Multiple pools", "Kids' club", "Spa", "Marina access", "7 restaurants"],
    experiences: ["Island hopping", "Golf", "Sunset cruise"],
    relatedSlugs: ["sofitel-fiji", "tokoriki-island", "likuliku-lagoon"],
  },
  {
    slug: "sofitel-fiji",
    title: "Sofitel Fiji Resort & Spa",
    location: "Denarau",
    stars: 5,
    priceFrom: "FJD 580",
    heroImage: images.resortSofitel,
    overview:
      "French-polished luxury on Denarau's best beach — floating breakfasts, reef access and Sofitel's signature spa philosophy.",
    amenities: ["Beachfront", "Spa", "Reef snorkelling", "Kids' club"],
    experiences: ["Reef snorkel", "Spa day", "Cultural night"],
    relatedSlugs: ["hilton-fiji", "intercontinental-coral-coast"],
  },
  {
    slug: "intercontinental-coral-coast",
    title: "InterContinental Fiji Golf Resort & Spa",
    location: "Coral Coast",
    stars: 5,
    priceFrom: "FJD 720",
    heroImage: images.resortIntercontinental,
    overview:
      "Natadola Beach's crown jewel — championship golf, Natadola's legendary sands and village culture on your doorstep.",
    amenities: ["Natadola Beach", "Golf course", "Spa", "Kids' club", "Cultural centre"],
    experiences: ["Village tour", "Golf", "Horse riding on beach"],
    relatedSlugs: ["sofitel-fiji", "likuliku-lagoon"],
  },
  {
    slug: "radisson-blu-fiji",
    title: "Radisson Blu Resort Fiji",
    location: "Denarau",
    stars: 5,
    priceFrom: "FJD 620",
    heroImage: images.dealDenarau,
    overview:
      "Beachfront Denarau luxury with lagoon pools, reef snorkelling off the jetty and direct marina access for Mamanuca day cruises.",
    amenities: ["Beachfront", "Lagoon pools", "Spa", "Marina access", "Kids' club"],
    experiences: ["Island day cruise", "Reef snorkel", "Sunset cruise"],
    relatedSlugs: ["hilton-fiji", "sofitel-fiji", "tanoa-skylodge"],
  },
  {
    slug: "tanoa-skylodge",
    title: "Tanoa Skylodge Hotel",
    location: "Nadi",
    stars: 4,
    priceFrom: "FJD 220",
    heroImage: images.nadiCard,
    overview:
      "Hillside Nadi retreat minutes from the airport — tropical gardens, sunset views and a relaxed base before island transfers.",
    amenities: ["Airport shuttle", "Pool", "Restaurant", "Garden views"],
    experiences: ["Temple tour", "Sabeto mud pools", "Market visit"],
    relatedSlugs: ["hilton-fiji", "radisson-blu-fiji", "sofitel-fiji"],
  },
  {
    slug: "castaway-island",
    title: "Castaway Island, Fiji",
    location: "Mamanuca Islands",
    stars: 4,
    priceFrom: "FJD 890",
    heroImage: images.resortCastaway,
    overview:
      "The island that defined Fiji for a generation — family-friendly, reef-fringed and effortlessly authentic.",
    amenities: ["Private island", "PADI centre", "Kids' club", "Multiple beaches"],
    experiences: ["Snorkelling", "Kayaking", "Village visit"],
    relatedSlugs: ["likuliku-lagoon", "tokoriki-island"],
  },
  {
    slug: "fiji-marriott-nadi",
    title: "Fiji Marriott Resort Momi Bay",
    location: "Nadi",
    stars: 5,
    priceFrom: "FJD 520",
    heroImage: images.nadiCard,
    overview:
      "Lagoon bures and overwater villas on Momi Bay — Nadi's newest luxury address with reef access and sunset-facing pools.",
    amenities: ["Overwater villas", "Lagoon pools", "Spa", "Reef snorkelling"],
    experiences: ["Reef snorkel", "Sunset cruise", "Cultural night"],
    relatedSlugs: ["hilton-fiji", "intercontinental-coral-coast"],
  },
  {
    slug: "grand-pacific-hotel-suva",
    title: "Grand Pacific Hotel",
    location: "Suva",
    stars: 5,
    priceFrom: "FJD 380",
    heroImage: images.suvaCard,
    overview:
      "Colonial grande dame on Suva Harbour — heritage suites, harbour dining and the capital's most storied luxury address.",
    amenities: ["Harbour views", "Heritage suites", "Fine dining", "Pool"],
    experiences: ["City heritage walk", "Museum tour", "Market visit"],
    relatedSlugs: ["intercontinental-coral-coast", "hilton-fiji"],
  },
  {
    slug: "taveuni-island-resort",
    title: "Taveuni Island Resort & Spa",
    location: "Taveuni",
    stars: 4,
    priceFrom: "FJD 490",
    heroImage: images.taveuniCard,
    overview:
      "Oceanfront bures on Taveuni's north coast — spa pavilion, dive centre and Rainbow Reef access from the Garden Island.",
    amenities: ["Oceanfront bures", "Spa", "Dive centre", "Restaurant"],
    experiences: ["Rainbow Reef dive", "Waterfall hike", "Kayaking"],
    relatedSlugs: ["intercontinental-coral-coast", "likuliku-lagoon"],
  },
  {
    slug: "pearl-south-pacific",
    title: "The Pearl South Pacific",
    location: "Pacific Harbour",
    stars: 4,
    priceFrom: "FJD 420",
    heroImage: images.pacificHarbourCard,
    overview:
      "Pacific Harbour's flagship resort — marina, championship golf adjacency and adventure concierge for shark dives and rafting.",
    amenities: ["Marina", "Pools", "Spa", "Adventure desk"],
    experiences: ["Shark dive", "River rafting", "Golf"],
    relatedSlugs: ["intercontinental-coral-coast", "grand-pacific-hotel-suva"],
  },
  {
    slug: "namale-resort-spa",
    title: "Namale Resort & Spa",
    location: "Savusavu",
    stars: 5,
    priceFrom: "FJD 890",
    heroImage: images.vanuaLevu,
    overview:
      "200-acre Savusavu estate — private villas, volcanic hot springs and Great Sea Reef diving from Fiji's north.",
    amenities: ["Private villas", "Hot springs", "Spa", "Dive centre"],
    experiences: ["Reef diving", "Hot springs", "Plantation tour"],
    relatedSlugs: ["taveuni-island-resort", "pearl-south-pacific"],
  },
  {
    slug: "matava-eco-resort",
    title: "Matava Eco Resort",
    location: "Kadavu",
    stars: 4,
    priceFrom: "FJD 450",
    heroImage: images.kadavu,
    overview:
      "Eco-bures on Kadavu's Astrolabe Reef — sustainable luxury, manta channels and intimate dive groups.",
    amenities: ["Eco-bures", "Dive centre", "Organic dining", "Reef access"],
    experiences: ["Astrolabe diving", "Village visit", "Kayaking"],
    relatedSlugs: ["taveuni-island-resort", "namale-resort-spa"],
  },
  {
    slug: "beqa-lagoon-resort",
    title: "Beqa Lagoon Resort",
    location: "Beqa Island",
    stars: 4,
    priceFrom: "FJD 520",
    heroImage: images.dealSharkDive,
    overview:
      "Intimate island resort on Beqa — firewalking village access, lagoon snorkelling and shark dive departures.",
    amenities: ["Beach bures", "Dive centre", "Cultural access", "Restaurant"],
    experiences: ["Firewalking", "Shark dive", "Lagoon snorkel"],
    relatedSlugs: ["pearl-south-pacific", "intercontinental-coral-coast"],
  },
  {
    slug: "mana-island-resort",
    title: "Mana Island Resort & Spa",
    location: "Mana Island",
    stars: 4,
    priceFrom: "FJD 680",
    heroImage: images.mamanucaCard,
    overview:
      "Family-friendly Mana Island — house reef, kids' club and Mamanuca lagoon access from a classic Fiji island base.",
    amenities: ["House reef", "Kids' club", "Spa", "Water sports"],
    experiences: ["Snorkel safari", "Kayaking", "Sunset cruise"],
    relatedSlugs: ["castaway-island", "tokoriki-island"],
  },
  {
    slug: "malolo-island-resort",
    title: "Malolo Island Resort",
    location: "Malolo Island",
    stars: 4,
    priceFrom: "FJD 720",
    heroImage: images.mamanuca,
    overview:
      "Beachfront bures on Malolo — turtle reef, island hikes and barefoot Mamanuca luxury without the crowds.",
    amenities: ["Beachfront bures", "Reef access", "Restaurant", "Water sports"],
    experiences: ["Reef snorkel", "Island hike", "Beach picnic"],
    relatedSlugs: ["mana-island-resort", "castaway-island"],
  },
  {
    slug: "yasawa-island-resort",
    title: "Yasawa Island Resort & Spa",
    location: "Yasawa Islands",
    stars: 5,
    priceFrom: "FJD 1,150",
    heroImage: images.yasawaCard,
    overview:
      "Private island resort in the Yasawas — thatched bures, Blue Lagoon access and exclusive cave expeditions.",
    amenities: ["Private island", "Thatched bures", "Spa", "Blue Lagoon access"],
    experiences: ["Cave expedition", "Village visit", "Sunset sail"],
    relatedSlugs: ["likuliku-lagoon", "tokoriki-island"],
  },
];

export function getResort(slug: string) {
  return resorts.find((r) => r.slug === slug);
}

export function getResortSlugs() {
  return resorts.map((r) => r.slug);
}
