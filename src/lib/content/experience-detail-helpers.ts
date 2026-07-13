import type { LucideIcon } from "lucide-react";
import {
  Anchor,
  Award,
  Compass,
  Crown,
  Gem,
  Heart,
  Leaf,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  Users,
  Waves,
} from "lucide-react";
import { images } from "@/lib/images";
import type { Experience } from "./types";

const HIGHLIGHT_ICONS: LucideIcon[] = [
  Sparkles,
  Crown,
  Gem,
  Compass,
  Waves,
  Sun,
  Leaf,
  Heart,
  Anchor,
  Star,
];

const CATEGORY_GALLERY: Record<string, string[]> = {
  Water: [images.snorkel, images.experienceSnorkel, images.picnic, images.mamanuca],
  Sailing: [images.sunset, images.experienceSunsetCruise, images.dealSunsetCruise, images.denarau],
  Adventure: [images.hiking, images.experienceHiking, images.islandHop, images.surfing],
  Culture: [images.village, images.experienceVillageTour, images.culture, images.eventFirewalking],
  Wellness: [images.wellness, images.dealSpa, images.resortPool, images.storyKayak],
  Dining: [images.dealBeach, images.eventFood, images.coralCoast, images.picnic],
  Wildlife: [images.dealSharkDive, images.snorkel, images.taveuniHero, images.yasawa],
  Family: [images.culture, images.picnic, images.snorkel, images.village],
  Nature: [images.hiking, images.wellness, images.taveuniHero, images.coralCoast],
  "Multi-day": [images.islandHop, images.mamanuca, images.yasawa, images.denarau],
  default: [images.mamanuca, images.yasawa, images.coralCoast, images.islandHop, images.storyKayak],
};

const LOCATION_SLUG_MAP: [RegExp, string][] = [
  [/mamanuca/i, "mamanuca"],
  [/yasawa/i, "yasawa"],
  [/denarau/i, "denarau"],
  [/nadi/i, "nadi"],
  [/coral coast/i, "coral-coast"],
  [/taveuni/i, "taveuni"],
  [/suva/i, "suva"],
  [/pacific harbour/i, "pacific-harbour"],
  [/vanua levu/i, "vanua-levu"],
  [/kadavu/i, "kadavu"],
];

const REVIEW_SNIPPETS = [
  {
    name: "Charlotte & James",
    origin: "London, UK",
    text: "Flawless from start to finish. The guide was exceptional and every detail felt considered — this is how luxury travel should be done.",
  },
  {
    name: "Michael R.",
    origin: "Sydney, Australia",
    text: "Worth every moment. We felt like VIP guests throughout, with seamless logistics and genuinely warm Fijian hospitality.",
  },
  {
    name: "Elena V.",
    origin: "Zurich, Switzerland",
    text: "An unforgettable experience. Premium quality at every touchpoint — we have already recommended this to friends planning their Fiji escape.",
  },
];

export function getExperienceGallery(exp: Experience): string[] {
  const pool = CATEGORY_GALLERY[exp.category] ?? CATEGORY_GALLERY.default;
  const candidates = [exp.heroImage, ...pool];
  const seen = new Set<string>();
  return candidates.filter((src) => {
    if (seen.has(src)) return false;
    seen.add(src);
    return true;
  }).slice(0, 6);
}

export function getExperienceMapSlug(location: string): string {
  for (const [pattern, slug] of LOCATION_SLUG_MAP) {
    if (pattern.test(location)) return slug;
  }
  return "mamanuca";
}

export function enrichHighlights(highlights: string[]) {
  return highlights.map((title, i) => ({
    title,
    description: highlightDescription(title),
    icon: HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length],
  }));
}

function highlightDescription(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes("private") || lower.includes("exclusive")) {
    return "Intimate, curated access away from the crowds.";
  }
  if (lower.includes("guide") || lower.includes("expert")) {
    return "Led by verified local experts with deep island knowledge.";
  }
  if (lower.includes("food") || lower.includes("lunch") || lower.includes("feast") || lower.includes("picnic")) {
    return "Exceptional cuisine prepared with island-fresh ingredients.";
  }
  if (lower.includes("music") || lower.includes("dance") || lower.includes("ceremony")) {
    return "Authentic cultural moments you cannot replicate elsewhere.";
  }
  if (lower.includes("gear") || lower.includes("equipment")) {
    return "Premium equipment included — simply arrive and enjoy.";
  }
  return "A signature moment crafted for discerning travellers.";
}

export function getWhyChooseReasons(exp: Experience) {
  return [
    {
      icon: ShieldCheck,
      title: "Verified luxury operator",
      description: `Hand-selected partners delivering ${exp.category.toLowerCase()} experiences to five-star standards.`,
    },
    {
      icon: Users,
      title: "Expert local guides",
      description: "Passionate Fijian hosts who elevate every moment with insider knowledge and warmth.",
    },
    {
      icon: Award,
      title: `${exp.rating.score} guest rating`,
      description: `Trusted by ${exp.rating.count.toLocaleString()}+ travellers who rate this among Fiji's finest.`,
    },
    {
      icon: Sparkles,
      title: "Concierge support",
      description: "Our luxury team coordinates transfers, timing and special requests before you arrive.",
    },
  ];
}

export function getGuestReviews(exp: Experience) {
  return REVIEW_SNIPPETS.map((review, i) => ({
    ...review,
    rating: i === 0 ? 5 : i === 1 ? 5 : 4,
    date: ["March 2026", "February 2026", "January 2026"][i],
    verified: true,
    experienceTitle: exp.title,
  }));
}

const MIN_FAQ_COUNT = 5;

function hasFaqTopic(faqs: Experience["faqs"], topic: string) {
  const needle = topic.toLowerCase();
  return faqs.some(
    (faq) =>
      faq.question.toLowerCase().includes(needle) || faq.answer.toLowerCase().includes(needle),
  );
}

/** Pad sparse CMS/static FAQs so every tour page matches island-hopping depth. */
export function getEnrichedFaqs(exp: Experience): Experience["faqs"] {
  const faqs = [...exp.faqs];
  const extras: Experience["faqs"] = [];

  if (!hasFaqTopic(faqs, "custom")) {
    extras.push({
      question: "Can I customise this experience?",
      answer: `Every ${exp.title} booking is bespoke — your concierge tailors timing, transfers and add-ons around your dates and preferences.`,
    });
  }

  if (!hasFaqTopic(faqs, "advance") && !hasFaqTopic(faqs, "book")) {
    extras.push({
      question: "How far in advance should I book?",
      answer:
        "Luxury experiences fill quickly in peak season (June–September). Book 3–6 months ahead when you can — our concierge often secures last-minute availability with partner operators.",
    });
  }

  if (!hasFaqTopic(faqs, "included")) {
    extras.push({
      question: "What is included in the price?",
      answer:
        exp.included.length > 0
          ? `Your package includes ${exp.included.slice(0, 4).join(", ")}. Spa, dining upgrades and private extensions are arranged à la carte by your concierge.`
          : "Core inclusions are confirmed at booking. Spa, dining upgrades and private extensions are arranged à la carte by your concierge.",
    });
  }

  if (!hasFaqTopic(faqs, "bring") && !hasFaqTopic(faqs, "wear")) {
    extras.push({
      question: "What should I bring?",
      answer:
        exp.category === "Culture"
          ? "Modest clothing covering shoulders and knees, reef-safe sunscreen and a light cover-up. Remove hats in villages."
          : "Reef-safe sunscreen, swimwear, a light cover-up and comfortable shoes. Your concierge sends a tailored packing note before arrival.",
    });
  }

  if (
    exp.ages.toLowerCase().includes("all ages") &&
    !hasFaqTopic(faqs, "famil") &&
    !hasFaqTopic(faqs, "child")
  ) {
    extras.push({
      question: "Is this experience suitable for families?",
      answer: `Yes — we match family-friendly operators, calm lagoons and age-appropriate pacing for ${exp.title} across ${exp.location}.`,
    });
  }

  if (!hasFaqTopic(faqs, "transfer") && !hasFaqTopic(faqs, "pickup")) {
    extras.push({
      question: "Are transfers included?",
      answer:
        "Return resort or marina transfers are coordinated as part of your booking unless noted otherwise. Your concierge confirms pickup times before you arrive.",
    });
  }

  const merged = [...faqs];
  for (const item of extras) {
    if (merged.length >= MIN_FAQ_COUNT) break;
    if (!merged.some((faq) => faq.question === item.question)) merged.push(item);
  }

  return merged.slice(0, MIN_FAQ_COUNT);
}
