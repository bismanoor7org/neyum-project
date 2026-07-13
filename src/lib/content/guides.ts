import { images } from "@/lib/images";
import type { Guide } from "./types";

const mkGuide = (
  slug: string,
  title: string,
  category: string,
  excerpt: string,
  heroImage: string,
  overview: string,
  sections: Guide["sections"],
  relatedSlugs: string[],
): Guide => ({
  slug,
  title,
  category,
  excerpt,
  heroImage,
  overview,
  sections,
  faqs: [
    {
      question: `How far in advance should I plan for ${title.toLowerCase()}?`,
      answer:
        "Luxury resorts fill up fast in peak season (June–September). Book 3–6 months ahead if you can — we can often still find room at partner places last minute.",
    },
  ],
  relatedSlugs,
});

export const guides: Guide[] = [
  mkGuide(
    "first-time-fiji",
    "First Time in Fiji",
    "Planning",
    "Everything you need for your first Fiji trip.",
    images.guideFirstTrip,
    "Fiji makes a brilliant first trip — easy entry, warm people, and 333 islands to explore. Most visitors don't need a visa for up to four months.",
    [
      { title: "Before you fly", body: "Ensure your passport is valid for six months beyond travel. Arrange comprehensive travel insurance and download offline maps for remote islands.", items: ["Passport validity", "Travel insurance", "Currency (FJD)", "Modest village attire"] },
      { title: "Arrival & customs", body: "Nadi International Airport is modern and efficient. Pre-arrange private transfers to skip queues and start relaxing immediately.", items: ["Private transfer", "SIM card at airport", "Resort meet & greet"] },
      { title: "Island etiquette", body: "Fijians are among the world's most welcoming people. A friendly 'Bula!' goes far. Remove hats in villages and always accept kava when offered.", items: ["Village dress code", "Kava ceremony", "Photography consent"] },
    ],
    ["visa-guide", "best-time-to-visit", "transportation"],
  ),
  mkGuide("visa-guide", "Visa & Travel Requirements", "Planning", "Passports, visas and entry rules — kept simple.", images.guideVisa, "Most people don't need to arrange a visa before flying to Fiji. Just make sure your passport and return ticket meet what immigration asks for.", [{ title: "Visa-free entry", body: "Citizens of most countries get a visitor permit for up to four months.", items: ["Valid passport 6+ months", "Return ticket", "Proof of accommodation"] }], ["first-time-fiji", "transportation"]),
  mkGuide("best-time-to-visit", "Best Time to Visit Fiji", "Planning", "Weather, seasons, and when we'd actually go.", images.guideBestTime, "Fiji's warm all year. Dry season (May–Oct) means clearer skies and busy resorts; wet season (Nov–Apr) brings lush scenery, fewer crowds, and softer prices.", [{ title: "Dry season (May–Oct)", body: "Less humidity, great diving and sailing. Popular — book early.", items: ["Best for diving", "Peak resort rates", "Festivals & events"] }, { title: "Wet season (Nov–Apr)", body: "Warmer with afternoon showers. Green interiors, quieter beaches, good deals.", items: ["Lower rates", "Lush waterfalls", "Warm water"] }], ["weather-guide", "first-time-fiji"]),
  mkGuide("weather-guide", "Weather & Climate", "Planning", "Understand Fiji's tropical seasons.", images.weather, "Fiji sits in the South Pacific trade-wind belt — warm, humid and blessed with sunshine most of the year.", [{ title: "Regional differences", body: "The west (Denarau, Mamanuca) is drier than Suva and Taveuni. Plan island-hopping around micro-climates.", items: ["West coast drier", "Suva wetter", "Cyclone season Nov–Apr"] }], ["best-time-to-visit"]),
  mkGuide("luxury-travel", "Luxury Travel Guide", "Style", "Exclusive resorts and curated experiences.", images.guideLuxury, "Fiji's luxury tier rivals anywhere in the South Pacific — private islands, overwater bures, personal butlers and helicopter transfers as standard.", [{ title: "Where to stay", body: "Likuliku Lagoon, Turtle Island, Vomo Island and Kokomo Private Island represent the pinnacle.", items: ["Overwater bures", "Private islands", "All-inclusive options"] }], ["honeymoon", "wellness"]),
  mkGuide("honeymoon", "Honeymoon Guide", "Style", "Romantic escapes for couples.", images.romance, "Fiji is the South Pacific's most romantic address — private dinners on sandbanks, couples' spa rituals and adults-only island retreats.", [{ title: "Top romantic experiences", body: "Sunset sailing, private island picnics and overwater dining define the Fiji honeymoon.", items: ["Private island stay", "Couples spa", "Sunset cruise"] }], ["luxury-travel", "wellness"]),
  mkGuide("family-travel", "Family Travel Guide", "Style", "Fiji with children — stress-free paradise.", images.family, "Fijian culture celebrates children. Kids' clubs, shallow lagoons and bure-style family villas make Fiji ideal for multi-generational travel.", [{ title: "Family-friendly resorts", body: "Denarau and Coral Coast resorts excel at kids' programmes while parents enjoy spa time.", items: ["Kids' clubs", "Shallow lagoons", "Interconnecting rooms"] }], ["first-time-fiji", "adventure"]),
  mkGuide("adventure", "Adventure Guide", "Style", "Adrenaline and exploration.", images.adventure, "From shark diving in Beqa Lagoon to waterfall treks in Taveuni, Fiji delivers world-class adventure without sacrificing luxury.", [{ title: "Must-do adventures", body: "Shark diving, white-water rafting, zip-lining and surf charters rank among the best in the Pacific.", items: ["Shark dive", "Rafting", "Waterfall hikes"] }], ["diving", "surfing", "family-travel"]),
  mkGuide("wellness", "Wellness Guide", "Style", "Restore body and mind in paradise.", images.wellness, "Oceanfront yoga, traditional Bobo massage and digital-detox retreats make Fiji a rising wellness destination.", [{ title: "Wellness rituals", body: "Combine spa treatments with forest bathing and reef meditation for holistic renewal.", items: ["Oceanfront spa", "Yoga retreats", "Detox programmes"] }], ["luxury-travel", "honeymoon"]),
  mkGuide("culture", "Culture Guide", "Style", "Authentic Fijian traditions.", images.culture, "Fijian culture is living and generous — village visits, meke dance and kava ceremonies offer genuine connection beyond resort walls.", [{ title: "Cultural experiences", body: "Always visit with a guide who maintains village relationships and ensures respectful participation.", items: ["Village tour", "Meke performance", "Craft workshops"] }], ["food-drink", "first-time-fiji"]),
  mkGuide("food-drink", "Food & Drink Guide", "Style", "What to eat and drink in Fiji.", images.picnic, "Fijian food mixes island cooking with Indian and Chinese flavours — from lovo feasts cooked in the earth to serious resort tasting menus.", [{ title: "Must try", body: "Kokoda, lovo, roti wraps, and a long lunch at a good resort restaurant.", items: ["Lovo feast", "Kokoda", "Resort degustation"] }], ["culture", "luxury-travel"]),
  mkGuide("transportation", "Transportation Guide", "Planning", "Flights, ferries and getting between islands.", images.transport, "Half the fun is the journey — seaplanes, speedboats and domestic flights link the islands faster than you'd think.", [{ title: "Inter-island travel", body: "Denarau Marina runs ferries to Mamanuca and Yasawa. Seaplanes reach the remote luxury spots.", items: ["Fiji Airways domestic", "Yasawa Flyer", "Seaplane transfers"] }], ["first-time-fiji", "island-hopping"]),
  mkGuide("island-hopping", "Island Hopping Guide", "Planning", "How to hop between islands without the headache.", images.islandHop, "Island hopping is what Fiji does best. We map routes through Mamanuca, Yasawa and the quieter stops — built around your dates and budget.", [{ title: "Sample routes", body: "Three days in Mamanuca, a week in Yasawa, or ten days mixing both — all easy to tweak.", items: ["3-day express", "7-day explorer", "10-day ultimate"] }], ["transportation", "first-time-fiji"]),
  mkGuide("diving", "Diving Guide", "Activities", "Reefs, sharks, and world-class dive sites.", images.dealSharkDive, "Rainbow Reef, Beqa Lagoon and Great White Wall are up there with the best diving on the planet.", [{ title: "Top dive sites", body: "Beqa shark dive, Rainbow Reef and Namena — something for every level.", items: ["Beqa sharks", "Rainbow Reef", "Great White Wall"] }], ["adventure", "surfing"]),
  mkGuide("surfing", "Surfing Guide", "Activities", "The breaks everyone talks about.", images.surfing, "Cloudbreak, Restaurants and Frigates — serious waves, usually reached by boat from Denarau or the Mamanucas.", [{ title: "Top breaks", body: "Cloudbreak is Fiji's famous left. Charter a boat from a nearby resort for dawn sessions.", items: ["Cloudbreak", "Restaurants", "Frigates"] }], ["adventure"]),
  mkGuide("travel-planning", "Travel Planning Hub", "Planning", "Your central hub for planning the perfect Fiji escape.", images.allPlaces, "Everything you need in one place — guides, tools, concierge support and bespoke itinerary building for luxury Fiji travel.", [{ title: "Start here", body: "Tell us your dates, style and budget — our concierge builds a bespoke itinerary within 24 hours.", items: ["Free consultation", "Bespoke itinerary", "Best price guarantee"] }], ["first-time-fiji", "best-time-to-visit", "luxury-travel"]),
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}

export function getGuideSlugs() {
  return guides.map((g) => g.slug);
}

export const guideCategories = [
  "Planning",
  "Style",
  "Activities",
] as const;
