import { THINGS_TO_DO_IMAGES } from "@/lib/images";

const ttd = (i: number) => THINGS_TO_DO_IMAGES[i]!;

export type ThingsToDoFilterKey =
  | "filterAdventure"
  | "filterCulture"
  | "filterNature"
  | "filterFamily"
  | "filterRomance"
  | "filterWellness"
  | "filterCruising";

export interface ThingsToDoExperience {
  title: string;
  description: string;
  image: string;
  href: string;
  location: string;
}

export const THINGS_TO_DO_FILTERS: ThingsToDoFilterKey[] = [
  "filterAdventure",
  "filterCulture",
  "filterNature",
  "filterFamily",
  "filterRomance",
  "filterWellness",
  "filterCruising",
];

/** Authentic Fiji experiences per category — unique image per card */
export const THINGS_TO_DO_BY_FILTER: Record<
  ThingsToDoFilterKey,
  ThingsToDoExperience[]
> = {
  filterAdventure: [
    {
      title: "Beqa Lagoon Shark Dive",
      description:
        "World-famous bull shark encounters in Pacific Harbour — guided feeds with Fiji's pioneering dive operators at Beqa Lagoon.",
      image: ttd(0),
      href: "/guides/diving",
      location: "Beqa Lagoon",
    },
    {
      title: "Mamanuca Snorkelling & Kayaking",
      description:
        "Crystal lagoons, rainbow reefs and calm paddleboarding waters around Castaway and Tokoriki — snorkel by day, kayak at golden hour.",
      image: ttd(1),
      href: "/things-to-do/snorkelling-crystal-waters",
      location: "Mamanuca Islands",
    },
    {
      title: "Yasawa Scuba Diving",
      description:
        "Wall dives, caves and pristine hard coral along the Yasawa archipelago — liveaboards and day boats from Nadi Bay.",
      image: ttd(2),
      href: "/guides/diving",
      location: "Yasawa Islands",
    },
    {
      title: "Navua Rafting, Ziplining & Surf",
      description:
        "Grade III rapids on the Navua River, rainforest ziplines at Pacific Harbour and surf charters to Cloudbreak from the Coral Coast.",
      image: ttd(3),
      href: "/guides/adventure",
      location: "Pacific Harbour & Navua",
    },
  ],
  filterCulture: [
    {
      title: "Traditional Fijian Village Tours",
      description:
        "Sevusevu welcomes, lovo feasts and village life on the Coral Coast — always with a respectful local guide.",
      image: ttd(4),
      href: "/things-to-do/village-tours",
      location: "Coral Coast",
    },
    {
      title: "Kava Ceremony Experiences",
      description:
        "Share yaqona around the tanoa with elders — the heart of Fijian hospitality and community on Viti Levu.",
      image: ttd(5),
      href: "/guides/culture",
      location: "Viti Levu",
    },
    {
      title: "Meke Dance Performances",
      description:
        "Living Fijian storytelling — meke, fan dances and fire walking at resort cultural nights and village gatherings across Viti Levu.",
      image: ttd(6),
      href: "/events",
      location: "Coral Coast & Denarau",
    },
    {
      title: "Suva Municipal Market & Crafts",
      description:
        "Suva's vibrant produce halls, masi tapa, wood carving and weaving — authentic indigenous heritage in the capital.",
      image: ttd(7),
      href: "/places-to-go/suva",
      location: "Suva",
    },
  ],
  filterNature: [
    {
      title: "Bouma National Heritage Park",
      description:
        "Taveuni's protected rainforest — Tavoro Falls trails, rare birds and Fiji's Garden Island at its wildest.",
      image: ttd(12),
      href: "/things-to-do/hiking-waterfalls",
      location: "Taveuni",
    },
    {
      title: "Tavoro Waterfalls",
      description:
        "Three-tiered cascades plunging into emerald swim pools — Bouma's most iconic hike on the Garden Island.",
      image: ttd(13),
      href: "/things-to-do/hiking-waterfalls",
      location: "Bouma, Taveuni",
    },
    {
      title: "Rainbow Reef Coral Gardens",
      description:
        "World-renowned soft coral between Taveuni and Vanua Levu — the soft coral capital of the Pacific.",
      image: ttd(14),
      href: "/guides/diving",
      location: "Somosomo Strait",
    },
    {
      title: "Yasawa Blue Lagoons & Marine Reserves",
      description:
        "Sawa-i-Lau caves, impossibly clear lagoons and protected reef sanctuaries — Fiji's most breathtaking tropical landscapes.",
      image: ttd(15),
      href: "/places-to-go/yasawa",
      location: "Yasawa Islands",
    },
  ],
  filterFamily: [
    {
      title: "Denarau Family Resorts",
      description:
        "Hilton and Sofitel — kids' clubs, lagoon pools and interconnecting bures built for multi-generational Fiji holidays.",
      image: ttd(16),
      href: "/places-to-stay/hilton-fiji",
      location: "Denarau",
    },
    {
      title: "Natadola Safe Lagoon Beaches",
      description:
        "Fiji's finest family beach — gentle surf, shallow reef pools and sand perfect for first-time snorkellers.",
      image: ttd(17),
      href: "/places-to-go/coral-coast",
      location: "Natadola, Coral Coast",
    },
    {
      title: "Kula Eco Park",
      description:
        "Native iguanas, reef walks and hands-on conservation encounters on the Coral Coast — a favourite family day out south of Sigatoka.",
      image: ttd(18),
      href: "/guides/family-travel",
      location: "Korotogo, Coral Coast",
    },
    {
      title: "Mamanuca Family Island Days",
      description:
        "Castaway Island excursions — supervised water sports, meke nights for kids and shallow-reef snorkelling the whole family can enjoy.",
      image: ttd(19),
      href: "/guides/family-travel",
      location: "Mamanuca Islands",
    },
  ],
  filterRomance: [
    {
      title: "Sunset Cruises for Couples",
      description:
        "Champagne sails from Denarau Marina — golden-hour Pacific views and live Fijian guitar at dusk.",
      image: ttd(20),
      href: "/things-to-do/sunset-cruises",
      location: "Denarau Marina",
    },
    {
      title: "Likuliku Overwater Bures",
      description:
        "Fiji's only overwater bungalows — adults-only sanctuary, private decks and lagoon dining for two.",
      image: ttd(21),
      href: "/places-to-stay/likuliku-lagoon",
      location: "Mamanuca Islands",
    },
    {
      title: "Private Sandbank Dinners",
      description:
        "Candlelit tables on a deserted Yasawa sandbank — chef-prepared courses with nothing but ocean around you.",
      image: ttd(22),
      href: "/guides/honeymoon",
      location: "Yasawa Islands",
    },
    {
      title: "Turtle Island Honeymoon",
      description:
        "Exclusive island buyouts and beachfront bures — Fiji's most intimate private island for milestone escapes.",
      image: ttd(23),
      href: "/guides/honeymoon",
      location: "Yasawa Islands",
    },
  ],
  filterWellness: [
    {
      title: "Oceanfront Yoga at Dawn",
      description:
        "Sunrise flows on Natadola decks and Coral Coast resort pavilions — the Pacific horizon as your studio.",
      image: ttd(24),
      href: "/guides/wellness",
      location: "Natadola, Coral Coast",
    },
    {
      title: "Traditional Bobo Massage",
      description:
        "Ancient Fijian healing — warm nut oils, flowing strokes and oceanfront spa pavilions on Denarau.",
      image: ttd(25),
      href: "/guides/wellness",
      location: "Denarau",
    },
    {
      title: "Luxury Island Spa Retreats",
      description:
        "Likuliku, InterContinental and boutique sanctuaries — holistic rituals, organic botanicals and reef views.",
      image: ttd(26),
      href: "/guides/wellness",
      location: "Mamanuca Islands",
    },
    {
      title: "Reef Meditation & Island Relaxation",
      description:
        "Guided stillness above crystal water, forest bathing on Taveuni and unplugged digital-detox programmes at Mamanuca sanctuaries.",
      image: ttd(27),
      href: "/guides/wellness",
      location: "Mamanuca & Taveuni",
    },
  ],
  filterCruising: [
    {
      title: "Mamanuca Island Hopping",
      description:
        "Speedboat hops between Monuriki, Beachcomber and resort islands — snorkel stops and beach picnics en route.",
      image: ttd(28),
      href: "/things-to-do/island-hopping",
      location: "Mamanuca Islands",
    },
    {
      title: "Yasawa Flyer Sailing",
      description:
        "The classic Fiji ferry route — village stops, limestone caves and remote Yasawa lodges from Nadi Bay.",
      image: ttd(29),
      href: "/guides/island-hopping",
      location: "Yasawa Islands",
    },
    {
      title: "Private Yacht Charters",
      description:
        "Bespoke Denarau departures with captain, chef and concierge — sail the Mamanuca and Yasawa chains your way.",
      image: ttd(30),
      href: "/contact",
      location: "Denarau Marina",
    },
    {
      title: "Luxury Catamaran Sunset Sails",
      description:
        "Twilight multi-island cruises on Nadi Bay — canapés, champagne and regatta-season sailing at its finest.",
      image: ttd(31),
      href: "/things-to-do/sunset-cruises",
      location: "Nadi Bay",
    },
  ],
};
