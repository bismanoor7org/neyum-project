import { images } from "@/lib/images";

export interface FijiEvent {
  slug: string;
  title: string;
  description: string;
  location: string;
  day: string;
  month: string;
  year: string;
  category: "Festival" | "Culture" | "Sport" | "Food" | "Music" | "Sailing";
  image: string;
  featured?: boolean;
}

export const eventCategories = [
  "All",
  "Festival",
  "Culture",
  "Music",
  "Sport",
  "Food",
  "Sailing",
] as const;

export type EventCategoryFilter = (typeof eventCategories)[number];

export const events: FijiEvent[] = [
  {
    slug: "hibiscus-festival",
    title: "Hibiscus Festival",
    description:
      "Suva's iconic week of parades, talent showcases and island pride — Fiji's longest-running cultural celebration.",
    location: "Suva",
    day: "22",
    month: "Aug",
    year: "2026",
    category: "Festival",
    image: images.eventHibiscus,
    featured: true,
  },
  {
    slug: "bula-festival",
    title: "Bula Festival",
    description:
      "Nadi's annual welcome festival — meke performances, street food and curated island experiences on the west coast.",
    location: "Nadi",
    day: "20",
    month: "Jul",
    year: "2026",
    category: "Festival",
    image: images.eventBula,
  },
  {
    slug: "beqa-firewalking-ceremonies",
    title: "Beqa Firewalking Ceremonies",
    description:
      "Witness the sacred vilavilairevo on Beqa Island — one of the Pacific's most revered living traditions, led by local warriors.",
    location: "Beqa Island",
    day: "18",
    month: "Jun",
    year: "2026",
    category: "Culture",
    image: images.eventFirewalking,
  },
  {
    slug: "savusavu-music-festival",
    title: "Savusavu Jazz & Music Weekend",
    description:
      "Intimate waterfront concerts and sunset sets in Fiji's northern harbour town.",
    location: "Savusavu, Vanua Levu",
    day: "05",
    month: "Sep",
    year: "2026",
    category: "Music",
    image: images.eventMusic,
  },
  {
    slug: "fiji-regatta",
    title: "Fiji Regatta Week",
    description:
      "Premier sailing across the Mamanuca Islands — yacht races, marina dinners and Denarau departures.",
    location: "Denarau Marina",
    day: "28",
    month: "Oct",
    year: "2026",
    category: "Sailing",
    image: images.eventRegatta,
  },
  {
    slug: "sigatoka-harvest-weekends",
    title: "Sigatoka Valley Harvest Weekends",
    description:
      "Farm-to-table lovo feasts, tropical produce markets and Coral Coast resort chef collaborations each month.",
    location: "Sigatoka, Coral Coast",
    day: "08",
    month: "May",
    year: "2026",
    category: "Food",
    image: images.eventFood,
  },
  {
    slug: "oceania-rugby-sevens",
    title: "Oceania Rugby Sevens",
    description:
      "World-class sevens rugby on Fijian soil — electric stadium atmosphere with premium hospitality suites.",
    location: "Lautoka",
    day: "10",
    month: "Nov",
    year: "2026",
    category: "Sport",
    image: images.eventFestival,
  },
  {
    slug: "suva-arts-showcase",
    title: "Suva Arts & Heritage Showcase",
    description:
      "A curated week of Fijian contemporary art, meke, craft markets and harbour-side dining in the capital.",
    location: "Suva",
    day: "15",
    month: "Jul",
    year: "2026",
    category: "Festival",
    image: images.eventFestival,
  },
];

export const featuredEvent = events.find((e) => e.featured) ?? events[0];
