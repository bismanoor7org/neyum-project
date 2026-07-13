import { images } from "@/lib/images";
import { experiences } from "@/lib/content/experiences";

export type ExperienceCommercialTag =
  | "mostBooked"
  | "bestSeller"
  | "familyFriendly"
  | "luxuryExperience"
  | "adventure"
  | "privateTour"
  | "smallGroup";

export type ExperienceCtaVariant = "bookNow" | "viewDetails";

export interface HomeMarketplaceExperience {
  slug: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  image: string;
  category: string;
  href: string;
  rating: number;
  reviewCount: number;
  verifiedSupplier?: boolean;
  price: string;
  priceNote?: string;
  originalPrice?: string;
  discountLabel?: string;
  commercialTags?: ExperienceCommercialTag[];
  highlight?: ExperienceCommercialTag;
  ctaPrimary?: ExperienceCtaVariant;
  ctaSecondary?: ExperienceCtaVariant;
}

function exp(slug: string) {
  return experiences.find((e) => e.slug === slug)!;
}

export const homeMarketplaceExperiences: HomeMarketplaceExperience[] = [
  {
    slug: "snorkelling-crystal-waters",
    title: exp("snorkelling-crystal-waters").title,
    description:
      "Private guide, premium gear and champagne picnic on a deserted sandbank in the Mamanuca lagoon.",
    location: exp("snorkelling-crystal-waters").location,
    duration: exp("snorkelling-crystal-waters").duration,
    image: images.experienceSnorkel,
    category: exp("snorkelling-crystal-waters").category,
    href: "/things-to-do/snorkelling-crystal-waters",
    rating: 4.9,
    reviewCount: 320,
    verifiedSupplier: true,
    price: exp("snorkelling-crystal-waters").priceFrom,
    priceNote: "per person",
    highlight: "mostBooked",
    commercialTags: ["luxuryExperience", "smallGroup"],
    ctaPrimary: "bookNow",
    ctaSecondary: "viewDetails",
  },
  {
    slug: "sunset-cruises",
    title: exp("sunset-cruises").title,
    description:
      "Luxury catamaran sailing with canapés, premium drinks and live Fijian guitar at golden hour.",
    location: exp("sunset-cruises").location,
    duration: exp("sunset-cruises").duration,
    image: images.experienceSunsetCruise,
    category: exp("sunset-cruises").category,
    href: "/things-to-do/sunset-cruises",
    rating: 4.8,
    reviewCount: 210,
    verifiedSupplier: true,
    price: exp("sunset-cruises").priceFrom,
    priceNote: "per person",
    highlight: "bestSeller",
    commercialTags: ["smallGroup"],
    ctaPrimary: "bookNow",
    ctaSecondary: "viewDetails",
  },
  {
    slug: "hiking-waterfalls",
    title: exp("hiking-waterfalls").title,
    description:
      "Trek Bouma National Heritage Park to hidden waterfalls with an expert local guide and rainforest lunch.",
    location: exp("hiking-waterfalls").location,
    duration: exp("hiking-waterfalls").duration,
    image: images.experienceHiking,
    category: exp("hiking-waterfalls").category,
    href: "/things-to-do/hiking-waterfalls",
    rating: 4.9,
    reviewCount: 156,
    verifiedSupplier: true,
    price: exp("hiking-waterfalls").priceFrom,
    priceNote: "per person",
    highlight: "adventure",
    commercialTags: ["adventure", "privateTour"],
    ctaPrimary: "bookNow",
    ctaSecondary: "viewDetails",
  },
  {
    slug: "village-tours",
    title: exp("village-tours").title,
    description:
      "Kava ceremony, meke dance and traditional lovo feast with authentic village hospitality.",
    location: exp("village-tours").location,
    duration: exp("village-tours").duration,
    image: images.experienceVillageTour,
    category: exp("village-tours").category,
    href: "/things-to-do/village-tours",
    rating: 4.9,
    reviewCount: 280,
    verifiedSupplier: true,
    price: exp("village-tours").priceFrom,
    priceNote: "per person",
    originalPrice: "FJD 120",
    discountLabel: "Save 21%",
    commercialTags: ["familyFriendly"],
    ctaPrimary: "bookNow",
    ctaSecondary: "viewDetails",
  },
];

export function experienceDetailHref(slug: string) {
  return `/tours/${slug}`;
}
