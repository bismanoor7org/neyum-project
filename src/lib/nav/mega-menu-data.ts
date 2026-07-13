import { GUIDE_TABS } from "@/lib/constants";
import { CMS_ROUTES } from "@/lib/cms/public-routes";
import { deals, dealCategories, dealCategorySlugs } from "@/lib/content/deals";
import {
  destinations,
  islandDestinations,
} from "@/lib/content/destinations";
import { experiences } from "@/lib/content/experiences";
import { guides, guideCategories } from "@/lib/content/guides";
import { resorts } from "@/lib/content/resorts";
import {
  THINGS_TO_DO_BY_FILTER,
  type ThingsToDoFilterKey,
} from "@/lib/content/things-to-do-categories";

export type MegaMenuLink = {
  label: string;
  href: string;
  description?: string;
};

export type MegaMenuCategory = {
  id: string;
  label: string;
  href?: string;
  items: MegaMenuLink[];
};

export type MegaMenuFeatured = {
  title: string;
  href: string;
  image: string;
  tagline?: string;
};

export type MegaMenuHero = {
  title: string;
  description: string;
  href: string;
  image: string;
  ctaLabel?: string;
};

export type MegaMenuSpotlight = {
  label: string;
  title: string;
  href: string;
  image?: string;
};

export type MegaMenuConfig = {
  href: string;
  hero: MegaMenuHero;
  categories: MegaMenuCategory[];
  spotlights: MegaMenuSpotlight[];
  /** @deprecated kept for mobile legacy panel */
  featured: MegaMenuFeatured[];
};

const MAX_COLUMNS = 3;
const MAX_LINKS_PER_COLUMN = 6;

export const MEGA_MENU_HREFS = new Set([
  CMS_ROUTES.destinations.index,
  CMS_ROUTES.tours.index,
  "/places-to-stay",
  CMS_ROUTES.guides.index,
  "/deals-and-offers",
]);

const DEFAULT_SPOTLIGHTS: MegaMenuSpotlight[] = [
  {
    label: "Top Experiences",
    title: "Curated island adventures",
    href: CMS_ROUTES.tours.index,
    image: experiences[0]?.heroImage,
  },
  {
    label: "Best Deals",
    title: "Exclusive resort offers",
    href: "/deals-and-offers",
    image: deals.find((d) => d.featured)?.image ?? deals[0]?.image,
  },
  {
    label: "New Destinations",
    title: "Discover hidden Fiji",
    href: CMS_ROUTES.destinations.index,
    image: destinations.find((d) => d.slug === "yasawa")?.cardImage,
  },
];

function megaMenuKey(href: string): string {
  if (href === CMS_ROUTES.destinations.index || href === "/places-to-go") {
    return "destinations";
  }
  if (href === CMS_ROUTES.tours.index || href === "/things-to-do") {
    return "tours";
  }
  return href;
}

function trimCategories(categories: MegaMenuCategory[]): MegaMenuCategory[] {
  return categories.slice(0, MAX_COLUMNS).map((cat) => ({
    ...cat,
    items: cat.items.slice(0, MAX_LINKS_PER_COLUMN),
  }));
}

function featuredFromHero(hero: MegaMenuHero): MegaMenuFeatured[] {
  return [{ title: hero.title, href: hero.href, image: hero.image, tagline: hero.description }];
}

export function getMegaMenuConfig(href: string): MegaMenuConfig | null {
  switch (megaMenuKey(href)) {
    case "destinations": {
      const heroDest = destinations.find((d) => d.slug === "mamanuca")!;
      const hero: MegaMenuHero = {
        title: heroDest.title,
        description: heroDest.tagline,
        href: CMS_ROUTES.destinations.detail(heroDest.slug),
        image: heroDest.cardImage,
        ctaLabel: "Explore destination",
      };
      return {
        href: CMS_ROUTES.destinations.index,
        hero,
        categories: trimCategories([
          {
            id: "popular",
            label: "Popular Destinations",
            href: CMS_ROUTES.destinations.index,
            items: ["mamanuca", "yasawa", "denarau", "nadi", "coral-coast"].map((slug) => {
              const d = destinations.find((x) => x.slug === slug)!;
              return {
                label: d.title,
                href: CMS_ROUTES.destinations.detail(d.slug),
              };
            }),
          },
          {
            id: "islands",
            label: "Island Escapes",
            href: CMS_ROUTES.destinations.index,
            items: islandDestinations.slice(0, 5).map((d) => ({
              label: d.title,
              href: CMS_ROUTES.destinations.detail(d.slug),
            })),
          },
          {
            id: "resources",
            label: "Travel Resources",
            href: CMS_ROUTES.destinations.index,
            items: [
              { label: "Fiji Explorer Map", href: "/explore-map" },
              { label: "About Fiji", href: "/about" },
              { label: "Getting Here", href: "/guides/transportation" },
              { label: "Weather Guide", href: "/guides/weather-guide" },
              { label: "Visa Guide", href: "/guides/visa-guide" },
            ],
          },
        ]),
        spotlights: DEFAULT_SPOTLIGHTS,
        featured: [
          ...["mamanuca", "coral-coast", "yasawa"].map((slug) => {
            const d = destinations.find((x) => x.slug === slug)!;
            return {
              title: d.title,
              href: CMS_ROUTES.destinations.detail(d.slug),
              image: d.cardImage,
              tagline: d.tagline,
            };
          }),
        ],
      };
    }

    case "tours": {
      const heroExp = experiences[0];
      const hero: MegaMenuHero = {
        title: heroExp.title,
        description: `${heroExp.location} · ${heroExp.duration}`,
        href: CMS_ROUTES.tours.detail(heroExp.slug),
        image: heroExp.heroImage,
        ctaLabel: "View experience",
      };
      const tourColumnFilters: ThingsToDoFilterKey[] = [
        "filterAdventure",
        "filterCulture",
        "filterNature",
      ];
      return {
        href: CMS_ROUTES.tours.index,
        hero,
        categories: trimCategories(
          tourColumnFilters.map((key) => ({
            id: key,
            label: key,
            href: CMS_ROUTES.tours.index,
            items: THINGS_TO_DO_BY_FILTER[key].slice(0, 5).map((item) => ({
              label: item.title,
              href: item.href.replace("/things-to-do/", `${CMS_ROUTES.tours.index}/`),
            })),
          })),
        ),
        spotlights: DEFAULT_SPOTLIGHTS,
        featured: experiences.slice(0, 3).map((e) => ({
          title: e.title,
          href: CMS_ROUTES.tours.detail(e.slug),
          image: e.heroImage,
          tagline: `${e.location} · ${e.duration}`,
        })),
      };
    }

    case "/places-to-stay": {
      const heroResort = resorts[0];
      const hero: MegaMenuHero = {
        title: heroResort.title,
        description: `${heroResort.location} · from ${heroResort.priceFrom}`,
        href: `/places-to-stay/${heroResort.slug}`,
        image: heroResort.heroImage,
        ctaLabel: "View resort",
      };
      return {
        href,
        hero,
        categories: trimCategories([
          {
            id: "collections",
            label: "Collections",
            href: "/places-to-stay",
            items: [
              { label: "Luxury Resorts", href: "/places-to-stay/likuliku-lagoon" },
              { label: "Island Resorts", href: "/places-to-stay/tokoriki-island" },
              { label: "Denarau Collection", href: "/places-to-stay/hilton-fiji" },
              { label: "Coral Coast", href: "/places-to-stay/intercontinental-coral-coast" },
              { label: "All Collections", href: "/places-to-stay" },
            ],
          },
          {
            id: "featured",
            label: "Featured Stays",
            href: "/places-to-stay",
            items: resorts.slice(0, 5).map((r) => ({
              label: r.title,
              href: `/places-to-stay/${r.slug}`,
            })),
          },
          {
            id: "planning",
            label: "Plan Your Stay",
            href: "/places-to-stay",
            items: [
              { label: "Honeymoon Escapes", href: "/guides/honeymoon" },
              { label: "Family Resorts", href: "/guides/family-travel" },
              { label: "Overwater Bures", href: "/places-to-stay/likuliku-lagoon" },
              { label: "Private Islands", href: "/destinations/taveuni" },
            ],
          },
        ]),
        spotlights: DEFAULT_SPOTLIGHTS,
        featured: resorts.slice(0, 2).map((r) => ({
          title: r.title,
          href: `/places-to-stay/${r.slug}`,
          image: r.heroImage,
          tagline: r.location,
        })),
      };
    }

    case "/guides": {
      const heroGuide = guides.find((g) => g.slug === "first-time-fiji")!;
      const hero: MegaMenuHero = {
        title: heroGuide.title,
        description: heroGuide.excerpt,
        href: `/guides/${heroGuide.slug}`,
        image: heroGuide.heroImage,
        ctaLabel: "Read guide",
      };
      return {
        href,
        hero,
        categories: trimCategories([
          {
            id: "start",
            label: "Start Here",
            href: "/guides",
            items: GUIDE_TABS.slice(0, 5).map((tab) => ({
              label: tab.label,
              href: tab.href,
            })),
          },
          ...guideCategories.slice(0, 2).map((cat) => ({
            id: cat.toLowerCase(),
            label: cat,
            href: "/guides",
            items: guides
              .filter((g) => g.category === cat)
              .slice(0, 5)
              .map((g) => ({
                label: g.title,
                href: `/guides/${g.slug}`,
              })),
          })),
        ]),
        spotlights: DEFAULT_SPOTLIGHTS,
        featured: ["first-time-fiji", "honeymoon", "luxury-travel"].map((slug) => {
          const g = guides.find((x) => x.slug === slug)!;
          return {
            title: g.title,
            href: `/guides/${g.slug}`,
            image: g.heroImage,
            tagline: g.category,
          };
        }),
      };
    }

    case "/deals-and-offers": {
      const heroDeal = deals.find((d) => d.featured) ?? deals[0];
      const hero: MegaMenuHero = {
        title: heroDeal.title,
        description: `${heroDeal.location} · ${heroDeal.price}`,
        href: `/deals-and-offers/${dealCategorySlugs[heroDeal.category]}#${heroDeal.slug}`,
        image: heroDeal.image,
        ctaLabel: "View deal",
      };
      return {
        href,
        hero,
        categories: trimCategories(
          dealCategories.map((cat) => ({
            id: dealCategorySlugs[cat],
            label: cat,
            href: `/deals-and-offers/${dealCategorySlugs[cat]}`,
            items: deals
              .filter((d) => d.category === cat)
              .slice(0, 5)
              .map((d) => ({
                label: d.title,
                href: `/deals-and-offers/${dealCategorySlugs[cat]}#${d.slug}`,
              })),
          })),
        ),
        spotlights: DEFAULT_SPOTLIGHTS,
        featured: deals
          .filter((d) => d.featured)
          .concat(deals.filter((d) => !d.featured).slice(0, 2))
          .slice(0, 3)
          .map((d) => ({
            title: d.title,
            href: `/deals-and-offers/${dealCategorySlugs[d.category]}#${d.slug}`,
            image: d.image,
            tagline: d.price,
          })),
      };
    }

    default:
      return null;
  }
}
