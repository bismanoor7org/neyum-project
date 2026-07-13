import { cache } from "react";
import { prisma } from "@/lib/db/prisma";
import { isDatabaseConfigured } from "@/server/auth/local-admin-store";
import { experiences as staticExperiences } from "@/lib/content/experiences";
import {
  fillExperiences,
  fillPackageDeals,
  fillResorts,
} from "@/lib/content/destination-marketplace-fill";
import { resorts as staticResorts } from "@/lib/content/resorts";
import { deals as staticDeals, type FijiDeal } from "@/lib/content/deals";
import { DESTINATION_LOCATION_KEYWORDS } from "@/lib/destinations/location-match";
import { CMS_ROUTES } from "@/lib/cms/public-routes";
import { packageDealHref } from "@/lib/content/deal-helpers";
import type {
  Destination,
  DestinationListingItem,
  DestinationMarketplaceData,
  DestinationMarketplaceStats,
} from "@/lib/content/types";
import {
  formatStartingPrice,
  locationMatchesDestination,
  marketplaceEntityMatchesDestination,
  normalizeDestinationSlug,
  parsePriceAmount,
} from "@/lib/destinations/location-match";
import { getPublishedDestinations } from "@/server/services/public-content.service";
import { mapPrismaTour } from "@/server/services/public-content.mappers";

const PUBLISHED = "PUBLISHED" as const;
const APPROVED = "APPROVED" as const;

function isDbConnectionError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return (
    error.name === "PrismaClientInitializationError" ||
    error.name === "PrismaClientKnownRequestError" ||
    error.name === "PrismaClientUnknownRequestError" ||
    error.message.includes("Can't reach database server") ||
    error.message.includes("Connection refused") ||
    error.message.includes("unexpected message from server") ||
    error.message.includes("ECONNREFUSED")
  );
}

async function withDbFallback<T>(query: () => Promise<T>, fallback: () => T): Promise<T> {
  if (!isDatabaseConfigured()) return fallback();
  try {
    return await query();
  } catch (error) {
    if (isDbConnectionError(error)) {
      console.warn("[destination-marketplace] Database unreachable — using static fallback");
      return fallback();
    }
    throw error;
  }
}

function minPriceAmount(prices: (string | null | undefined)[]): number | null {
  const amounts = prices.map(parsePriceAmount).filter((n): n is number => n != null);
  return amounts.length ? Math.min(...amounts) : null;
}

function packageDestinationRank(deal: FijiDeal, slug: string): number {
  const normalized = normalizeDestinationSlug(slug);
  const keywords = DESTINATION_LOCATION_KEYWORDS[normalized] ?? [
    normalized.replace(/-/g, " "),
  ];
  const primary = keywords[0]?.toLowerCase() ?? "";
  const dest = (deal.destination ?? deal.location ?? "").toLowerCase();

  if (dest === primary || dest === normalized.replace(/-/g, " ")) return 0;
  if (dest.includes(primary)) return 1;
  if (keywords.slice(1).some((kw) => dest.includes(kw))) return 2;
  return 3;
}

function sortPackageDealsForSlug(deals: FijiDeal[], slug: string): FijiDeal[] {
  return [...deals].sort((a, b) => {
    const rankDiff = packageDestinationRank(a, slug) - packageDestinationRank(b, slug);
    if (rankDiff !== 0) return rankDiff;
    if (Boolean(a.featured) !== Boolean(b.featured)) {
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    }
    return 0;
  });
}

function buildStats(input: {
  experiences: number;
  stays: number;
  packages: number;
  tours: number;
  transport: number;
  prices: (string | null | undefined)[];
}): DestinationMarketplaceStats {
  return {
    experiences: input.experiences,
    stays: input.stays,
    packages: input.packages,
    tours: input.tours,
    transport: input.transport,
    startingPrice: formatStartingPrice(minPriceAmount(input.prices)),
  };
}

function staticMarketplaceForSlug(slug: string): DestinationMarketplaceData {
  const normalized = normalizeDestinationSlug(slug);

  const allExperiences = [...staticExperiences, ...fillExperiences];
  const allResorts = [...staticResorts, ...fillResorts];
  const allPackageDeals = [
    ...staticDeals.filter((d) => d.category === "Package Deals"),
    ...fillPackageDeals,
  ];

  const matchedExperiences = allExperiences.filter((e) =>
    marketplaceEntityMatchesDestination({ location: e.location }, normalized),
  );

  const matchedStays = allResorts.filter((r) =>
    marketplaceEntityMatchesDestination({ location: r.location }, normalized),
  );

  const packageDeals = sortPackageDealsForSlug(
    allPackageDeals.filter((d) =>
      marketplaceEntityMatchesDestination(
        { location: d.location, destination: d.destination },
        normalized,
      ),
    ),
    normalized,
  );

  const transportItems = [
    {
      title: "Private resort transfers",
      description: "Door-to-door luxury transfers coordinated by our concierge.",
      href: "/contact?intent=transport",
    },
    {
      title: "Island speedboat & seaplane",
      description: "Fast connections from Nadi and Denarau to island resorts.",
      href: "/contact?intent=transport",
    },
  ];

  const transferItems = [
    {
      title: "Airport meet & greet",
      description: "Nadi International Airport to your resort or marina.",
      href: "/contact?intent=transfer",
    },
    {
      title: "Inter-island transfers",
      description: "Seamless connections between Fiji's islands and mainland.",
      href: "/contact?intent=transfer",
    },
  ];

  const experiences = matchedExperiences.map((e) => ({
    slug: e.slug,
    title: e.title,
    location: e.location,
    image: e.heroImage,
    priceFrom: e.priceFrom,
    duration: e.duration,
    category: e.category,
    href: CMS_ROUTES.tours.detail(e.slug),
  }));

  const stays = matchedStays.map((r) => ({
    slug: r.slug,
    title: r.title,
    location: r.location,
    image: r.heroImage,
    priceFrom: r.priceFrom,
    stars: r.stars,
    href: `/places-to-stay/${r.slug}`,
  }));

  const packages = packageDeals.map((d) => ({
    slug: d.slug,
    title: d.title,
    location: d.location,
    image: d.image,
    price: d.price,
    href: packageDealHref(d.slug),
  }));

  const prices = [
    ...matchedExperiences.map((e) => e.priceFrom),
    ...matchedStays.map((s) => s.priceFrom),
    ...packageDeals.map((d) => d.price),
  ];

  return {
    stats: buildStats({
      experiences: matchedExperiences.length,
      stays: matchedStays.length,
      packages: packageDeals.length,
      tours: matchedExperiences.length,
      transport: transportItems.length + transferItems.length,
      prices,
    }),
    experiences,
    tours: experiences,
    packages,
    stays,
    transport: transportItems,
    transfers: transferItems,
  };
}

function mergeExperienceList(
  primary: DestinationMarketplaceData["experiences"],
  supplemental: DestinationMarketplaceData["experiences"],
): DestinationMarketplaceData["experiences"] {
  const seen = new Set<string>();
  const merged: DestinationMarketplaceData["experiences"] = [];
  for (const item of [...primary, ...supplemental]) {
    if (seen.has(item.slug)) continue;
    seen.add(item.slug);
    merged.push(item);
  }
  return merged;
}

async function dbMarketplaceForSlug(slug: string): Promise<DestinationMarketplaceData> {
  const normalized = normalizeDestinationSlug(slug);
  const destination = await prisma.destination.findUnique({ where: { slug: normalized } });

  const destinationFilter = destination
    ? {
        OR: [
          { destinationId: destination.id },
          { location: { contains: destination.name, mode: "insensitive" as const } },
        ],
      }
    : undefined;

  const [tours, accommodations, deals, transportServices] = await Promise.all([
    prisma.tour.findMany({
      where: destination
        ? { status: APPROVED, destinationId: destination.id }
        : { status: APPROVED },
      orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
      take: 8,
    }),
    prisma.accommodation.findMany({
      where: {
        status: PUBLISHED,
        ...(destinationFilter ?? {}),
      },
      orderBy: [{ featured: "desc" }, { sortOrder: "asc" }],
      take: 8,
    }),
    prisma.deal.findMany({
      where: {
        status: PUBLISHED,
        category: "PACKAGE",
        ...(destinationFilter ?? {}),
      },
      orderBy: [{ featured: "desc" }, { sortOrder: "asc" }],
      take: 8,
    }),
    prisma.transportationService.findMany({
      where: {
        status: "APPROVED",
        ...(destination ? { destinationId: destination.id } : {}),
      },
      orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
      take: 6,
    }),
  ]);

  let filteredTours = tours;
  if (!destination) {
    filteredTours = tours.filter((t) => {
      const mapped = mapPrismaTour(t);
      return locationMatchesDestination(mapped.location, normalized);
    });
  }

  const experiences = filteredTours.map((t) => {
    const mapped = mapPrismaTour(t);
    return {
      slug: mapped.slug,
      title: mapped.title,
      location: mapped.location,
      image: mapped.heroImage,
      priceFrom: mapped.priceFrom,
      duration: mapped.duration,
      category: mapped.category,
      href: CMS_ROUTES.tours.detail(mapped.slug),
    };
  });

  let filteredStays = accommodations;
  if (!destination) {
    filteredStays = accommodations.filter((a) =>
      locationMatchesDestination(a.location, normalized),
    );
  }

  const stays = filteredStays.map((a) => ({
    slug: a.slug,
    title: a.title,
    location: a.location,
    image: a.heroImage ?? "",
    priceFrom: a.priceFrom ?? "",
    stars: a.stars,
    href: `/places-to-stay/${a.slug}`,
  }));

  let filteredDeals = deals;
  if (!destination) {
    filteredDeals = deals.filter((d) =>
      marketplaceEntityMatchesDestination({ location: d.location }, normalized),
    );
  }

  const packages = filteredDeals.map((d) => ({
    slug: d.slug,
    title: d.title,
    location: d.location,
    image: d.image ?? "",
    price: d.price,
    href: packageDealHref(d.slug),
  }));

  const transport = transportServices.map((s) => ({
    title: s.title,
    description: s.description ?? undefined,
    href: "/contact?intent=transport",
  }));

  const transfers = [
    {
      title: "Airport meet & greet",
      description: "Private transfers from Nadi International Airport.",
      href: "/contact?intent=transfer",
    },
    {
      title: "Resort & marina connections",
      description: "Seamless island and mainland transfers.",
      href: "/contact?intent=transfer",
    },
  ];

  const staticFallback = staticMarketplaceForSlug(normalized);
  const mergedExperiences = mergeExperienceList(experiences, staticFallback.experiences);
  const mergedStays = stays.length ? stays : staticFallback.stays;
  const mergedPackages = packages.length ? packages : staticFallback.packages;
  const mergedTransport = transport.length ? transport : staticFallback.transport;

  const prices = [
    ...mergedExperiences.map((e) => e.priceFrom),
    ...mergedStays.map((s) => s.priceFrom),
    ...mergedPackages.map((p) => p.price),
  ];

  return {
    stats: buildStats({
      experiences: mergedExperiences.length,
      stays: mergedStays.length,
      packages: mergedPackages.length,
      tours: mergedExperiences.length,
      transport: mergedTransport.length + transfers.length,
      prices,
    }),
    experiences: mergedExperiences,
    tours: mergedExperiences,
    packages: mergedPackages,
    stays: mergedStays,
    transport: mergedTransport,
    transfers,
  };
}

export const getDestinationMarketplace = cache(
  async (slug: string): Promise<DestinationMarketplaceData> =>
    withDbFallback(
      () => dbMarketplaceForSlug(slug),
      () => staticMarketplaceForSlug(slug),
    ),
);

export const getDestinationsWithMarketplaceStats = cache(
  async (): Promise<DestinationListingItem[]> => {
    const destinations = await getPublishedDestinations();
    return Promise.all(
      destinations.map(async (d) => {
        const marketplace = await getDestinationMarketplace(d.slug);
        return { ...d, stats: marketplace.stats };
      }),
    );
  },
);

export async function getRelatedDestinations(
  slugs: string[],
  allDestinations?: Destination[],
): Promise<Destination[]> {
  const pool = allDestinations ?? (await getPublishedDestinations());
  return slugs
    .map((s) => pool.find((d) => d.slug === normalizeDestinationSlug(s)))
    .filter((d): d is Destination => Boolean(d));
}
