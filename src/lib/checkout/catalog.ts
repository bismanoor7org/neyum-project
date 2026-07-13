import { experiences } from "@/lib/content/experiences";
import type { CheckoutTour } from "./types";

const SUPPLIERS: Record<string, { id: string; name: string; rating: number }> = {
  "snorkelling-crystal-waters": { id: "sup-pacific-pearl", name: "Pacific Pearl Tours", rating: 4.9 },
  "sunset-cruises": { id: "sup-denarau-sailing", name: "Denarau Sailing Co.", rating: 4.8 },
  "hiking-waterfalls": { id: "sup-garden-island", name: "Garden Island Expeditions", rating: 4.9 },
  "village-tours": { id: "sup-fiji-heritage", name: "Fiji Heritage Journeys", rating: 4.9 },
  "island-hopping": { id: "sup-yasawa-express", name: "Yasawa Express", rating: 4.95 },
};

const ADD_ONS: Record<string, CheckoutTour["addOns"]> = {
  "snorkelling-crystal-waters": [
    { id: "photo-pack", name: "Underwater photo package", price: 85, description: "Professional photos delivered within 24h" },
    { id: "premium-gear", name: "Premium snorkel gear upgrade", price: 35 },
    { id: "champagne", name: "Champagne upgrade", price: 120 },
  ],
  "sunset-cruises": [
    { id: "private-table", name: "Private deck table", price: 150 },
    { id: "transfer", name: "Hotel transfer (Denarau)", price: 65 },
  ],
  "hiking-waterfalls": [
    { id: "walking-poles", name: "Walking poles rental", price: 25 },
    { id: "lunch-upgrade", name: "Gourmet lunch upgrade", price: 45 },
  ],
  "village-tours": [
    { id: "craft-kit", name: "Traditional craft kit", price: 40 },
    { id: "kava-gift", name: "Ceremonial kava gift set", price: 55 },
  ],
  "island-hopping": [
    { id: "seaplane", name: "Seaplane return upgrade", price: 890 },
    { id: "picnic", name: "Private beach picnic", price: 180 },
  ],
};

const PICKUPS: Record<string, string[]> = {
  default: ["Denarau Marina", "Nadi International Airport", "Coral Coast resorts", "Hotel pickup (on request)"],
  "hiking-waterfalls": ["Taveuni airport", "Garden Island resort", "Matei village"],
};

const TIME_SLOTS = [
  { id: "morning", label: "Morning (8:00 AM)", capacity: 12 },
  { id: "midday", label: "Midday (12:00 PM)", capacity: 10 },
  { id: "afternoon", label: "Afternoon (2:30 PM)", capacity: 14 },
  { id: "sunset", label: "Sunset (5:00 PM)", capacity: 16 },
];

function parsePrice(priceFrom: string): number {
  const match = priceFrom.match(/[\d,]+/);
  if (!match) return 0;
  return Number(match[0].replace(/,/g, ""));
}

export function getCheckoutTour(slug: string): CheckoutTour | null {
  const exp = experiences.find((e) => e.slug === slug);
  if (!exp) return null;

  const supplier = SUPPLIERS[slug] ?? { id: "sup-default", name: "Fiji Luxury Experiences", rating: 4.8 };
  const adultPrice = parsePrice(exp.priceFrom);
  const childPrice = Math.round(adultPrice * 0.65);

  return {
    slug: exp.slug,
    tourId: `tour-${exp.slug}`,
    title: exp.title,
    location: exp.location,
    duration: exp.duration,
    overview: exp.overview,
    heroImage: exp.heroImage,
    images: [exp.heroImage],
    supplierId: supplier.id,
    supplierName: supplier.name,
    supplierRating: supplier.rating,
    supplierStatus: "ACTIVE",
    tourStatus: "ACTIVE",
    rating: { score: Number(exp.rating.score), count: exp.rating.count },
    adultPrice,
    childPrice,
    currency: "FJD",
    maxGuests: 20,
    timeSlots: TIME_SLOTS,
    addOns: ADD_ONS[slug] ?? [],
    pickupLocations: PICKUPS[slug] ?? PICKUPS.default,
  };
}

export function listCheckoutTours(): CheckoutTour[] {
  return experiences.map((e) => getCheckoutTour(e.slug)!).filter(Boolean);
}
