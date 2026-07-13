import type { LucideIcon } from "lucide-react";
import { BookOpen, Compass, Hotel, MapPin, Tag } from "lucide-react";
import { CMS_ROUTES, destinationPath, guidePath, tourPath } from "@/lib/cms/public-routes";
import type { Messages } from "@/lib/i18n/en";
import { en } from "@/lib/i18n/en";

export type CompactNavItem = {
  icon: LucideIcon;
  label: string;
  href: string;
  description?: string;
};

export type CompactNavConfig = {
  href: string;
  eyebrow: string;
  triggerIcon: LucideIcon;
  items: CompactNavItem[];
};

export const COMPACT_NAV_HREFS = new Set([
  CMS_ROUTES.destinations.index,
  CMS_ROUTES.tours.index,
  "/places-to-stay",
  CMS_ROUTES.guides.index,
  "/deals-and-offers",
]);

type NavMegaKey = Exclude<keyof Messages["navMega"], "shared">;

type CompactNavDropdownEntry = {
  labelKey: string;
  descriptionKey: string;
  href: string;
};

const DESTINATIONS_NAV: CompactNavDropdownEntry[] = [
  { labelKey: "nadi", descriptionKey: "nadiDesc", href: destinationPath("nadi") },
  { labelKey: "denarau", descriptionKey: "denarauDesc", href: destinationPath("denarau") },
  {
    labelKey: "coralCoast",
    descriptionKey: "coralCoastDesc",
    href: destinationPath("coral-coast"),
  },
  { labelKey: "yasawa", descriptionKey: "yasawaDesc", href: destinationPath("yasawa") },
  { labelKey: "mamanuca", descriptionKey: "mamanucaDesc", href: destinationPath("mamanuca") },
];

const EXPERIENCES_NAV: CompactNavDropdownEntry[] = [
  {
    labelKey: "islandHopping",
    descriptionKey: "islandHoppingDesc",
    href: tourPath("island-hopping"),
  },
  {
    labelKey: "snorkeling",
    descriptionKey: "snorkelingDesc",
    href: tourPath("snorkelling-crystal-waters"),
  },
  { labelKey: "diving", descriptionKey: "divingDesc", href: guidePath("diving") },
  {
    labelKey: "culturalTours",
    descriptionKey: "culturalToursDesc",
    href: tourPath("village-tours"),
  },
  {
    labelKey: "sunsetCruises",
    descriptionKey: "sunsetCruisesDesc",
    href: tourPath("sunset-cruises"),
  },
];

const STAYS_NAV: CompactNavDropdownEntry[] = [
  {
    labelKey: "resorts",
    descriptionKey: "resortsDesc",
    href: "/places-to-stay/likuliku-lagoon",
  },
  { labelKey: "hotels", descriptionKey: "hotelsDesc", href: "/places-to-stay/hilton-fiji" },
  { labelKey: "villas", descriptionKey: "villasDesc", href: "/places-to-stay/tokoriki-island" },
  {
    labelKey: "budgetStays",
    descriptionKey: "budgetStaysDesc",
    href: "/places-to-stay/tanoa-skylodge",
  },
  {
    labelKey: "familyStays",
    descriptionKey: "familyStaysDesc",
    href: "/places-to-stay/castaway-island",
  },
];

const GUIDES_NAV: CompactNavDropdownEntry[] = [
  {
    labelKey: "travelGuide",
    descriptionKey: "travelGuideDesc",
    href: CMS_ROUTES.guides.index,
  },
  {
    labelKey: "visaGuide",
    descriptionKey: "visaGuideDesc",
    href: guidePath("visa-guide"),
  },
  {
    labelKey: "transportGuide",
    descriptionKey: "transportGuideDesc",
    href: guidePath("transportation"),
  },
  {
    labelKey: "weatherGuide",
    descriptionKey: "weatherGuideDesc",
    href: guidePath("weather-guide"),
  },
  { labelKey: "faq", descriptionKey: "faqDesc", href: CMS_ROUTES.faq },
];

const DEALS_NAV: CompactNavDropdownEntry[] = [
  {
    labelKey: "specialOffers",
    descriptionKey: "specialOffersDesc",
    href: "/deals-and-offers/package-deals",
  },
  {
    labelKey: "familyDeals",
    descriptionKey: "familyDealsDesc",
    href: "/deals-and-offers/package-deals/family-coral-coast-package",
  },
  {
    labelKey: "luxuryDeals",
    descriptionKey: "luxuryDealsDesc",
    href: "/deals-and-offers/package-deals/luxury-overwater-bure",
  },
  {
    labelKey: "honeymoonDeals",
    descriptionKey: "honeymoonDealsDesc",
    href: "/deals-and-offers/package-deals/romantic-honeymoon-escape",
  },
  {
    labelKey: "lastMinuteDeals",
    descriptionKey: "lastMinuteDealsDesc",
    href: "/deals-and-offers/accommodation",
  },
];

function compactNavKey(href: string): string {
  if (href === CMS_ROUTES.destinations.index || href === "/places-to-go") {
    return "destinations";
  }
  if (href === CMS_ROUTES.tours.index || href === "/things-to-do") {
    return "tours";
  }
  return href;
}

function mapDropdownEntries(
  sectionKey: NavMegaKey,
  entries: CompactNavDropdownEntry[],
  icon: LucideIcon,
  t: Messages,
): CompactNavItem[] {
  const section = t.navMega[sectionKey] as Record<string, string>;

  return entries.map((entry) => ({
    icon,
    label: section[entry.labelKey] ?? entry.labelKey,
    description: section[entry.descriptionKey],
    href: entry.href,
  }));
}

function buildLocalizedConfig(
  sectionKey: NavMegaKey,
  href: string,
  triggerIcon: LucideIcon,
  entries: CompactNavDropdownEntry[],
  t: Messages,
): CompactNavConfig {
  return {
    href,
    eyebrow: t.navMega[sectionKey].eyebrow,
    triggerIcon,
    items: mapDropdownEntries(sectionKey, entries, triggerIcon, t),
  };
}

/** @deprecated Use getLocalizedCompactNavConfig with translated messages */
export function getCompactNavConfig(href: string): CompactNavConfig | null {
  return getLocalizedCompactNavConfig(href, en);
}

export function getLocalizedCompactNavConfig(
  href: string,
  t: Messages,
): CompactNavConfig | null {
  switch (compactNavKey(href)) {
    case "destinations":
      return buildLocalizedConfig(
        "destinations",
        CMS_ROUTES.destinations.index,
        MapPin,
        DESTINATIONS_NAV,
        t,
      );
    case "tours":
      return buildLocalizedConfig(
        "experiences",
        CMS_ROUTES.tours.index,
        Compass,
        EXPERIENCES_NAV,
        t,
      );
    case "/places-to-stay":
      return buildLocalizedConfig(
        "placesToStay",
        "/places-to-stay",
        Hotel,
        STAYS_NAV,
        t,
      );
    case CMS_ROUTES.guides.index:
      return buildLocalizedConfig(
        "guides",
        CMS_ROUTES.guides.index,
        BookOpen,
        GUIDES_NAV,
        t,
      );
    case "/deals-and-offers":
      return buildLocalizedConfig("deals", "/deals-and-offers", Tag, DEALS_NAV, t);
    default:
      return null;
  }
}

/** All hrefs referenced by primary nav dropdowns (for audits). */
export function collectCompactNavHrefs(t: Messages = en): string[] {
  const hrefs = new Set<string>();

  for (const parent of COMPACT_NAV_HREFS) {
    hrefs.add(parent);
    const config = getLocalizedCompactNavConfig(parent, t);
    config?.items.forEach((item) => hrefs.add(item.href));
  }

  return [...hrefs];
}

/** Destination detail routes exposed in the Destinations dropdown. */
export function getMegaMenuDestinationHrefs(): string[] {
  return DESTINATIONS_NAV.map((entry) => entry.href);
}
