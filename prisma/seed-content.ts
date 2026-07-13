/**
 * Idempotent CMS content import from curated static project data.
 */
import type {
  DealCategory,
  GuideCategory,
  Prisma,
  PrismaClient,
} from "@prisma/client";
import { buildAccommodationCmsSeedRecords } from "../src/lib/cms/seed-accommodations";
import type { DealContentJson } from "../src/lib/cms/deal-content";
import type { TourContentJson } from "../src/lib/cms/tour-content";
import { deals as staticDeals } from "../src/lib/content/deals";
import { experiences as staticExperiences } from "../src/lib/content/experiences";
import { guides as staticGuides } from "../src/lib/content/guides";
import { CMS_ROUTES } from "../src/lib/cms/public-routes";
import { staticPageSeo } from "../src/lib/seo/pages";

const PLATFORM_SUPPLIER_EMAIL = "platform-content@myfijitour.com";

const GUIDE_CATEGORY_BY_SLUG: Record<string, GuideCategory> = {
  "first-time-fiji": "FIRST_TIME",
  "visa-guide": "VISA",
  "best-time-to-visit": "WEATHER",
  "weather-guide": "WEATHER",
  culture: "CULTURE",
  transportation: "TRANSPORT",
  "island-hopping": "ITINERARY",
  "food-drink": "DINING",
  "travel-planning": "ITINERARY",
};

const DEAL_CATEGORY_MAP: Record<string, DealCategory> = {
  "Package Deals": "PACKAGE",
  Accommodation: "ACCOMMODATION",
  Experiences: "EXPERIENCE",
};

const LOCATION_DESTINATION_SLUG: Record<string, string> = {
  nadi: "nadi",
  denarau: "denarau",
  "coral coast": "coral-coast",
  mamanuca: "mamanuca",
  yasawa: "yasawa",
  taveuni: "taveuni",
  "pacific harbour": "pacific-harbour",
  suva: "suva",
  "vanua levu": "vanua-levu",
  kadavu: "kadavu",
  savusavu: "savusavu",
};

function parseFjdAmount(value: string): number {
  const match = value.replace(/,/g, "").match(/(\d+(?:\.\d+)?)/);
  return match ? Number.parseFloat(match[1]) : 0;
}

function resolveDestinationSlug(location: string): string | null {
  const normalized = location.toLowerCase();
  for (const [needle, slug] of Object.entries(LOCATION_DESTINATION_SLUG)) {
    if (normalized.includes(needle)) return slug;
  }
  return null;
}

async function ensurePlatformSupplier(prisma: PrismaClient) {
  const user = await prisma.user.upsert({
    where: { email: PLATFORM_SUPPLIER_EMAIL },
    create: {
      email: PLATFORM_SUPPLIER_EMAIL,
      firstName: "My Fiji",
      lastName: "Tour",
      role: "SUPPLIER",
      status: "ACTIVE",
    },
    update: {
      role: "SUPPLIER",
      status: "ACTIVE",
    },
  });

  const supplier = await prisma.supplier.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      companyName: "My Fiji Tour Curated",
      description: "Platform-managed curated tours and experiences from project seed data.",
      verificationStatus: "VERIFIED",
      kycStatus: "APPROVED",
      onboardingStep: 5,
    },
    update: {
      companyName: "My Fiji Tour Curated",
      verificationStatus: "VERIFIED",
      kycStatus: "APPROVED",
    },
  });

  return supplier.id;
}

async function loadDestinationIdMap(prisma: PrismaClient) {
  const rows = await prisma.destination.findMany({ select: { id: true, slug: true } });
  return new Map(rows.map((row) => [row.slug, row.id]));
}

export async function seedCmsContent(prisma: PrismaClient) {
  console.log("Seeding CMS content from static project data…");

  const destinationIds = await loadDestinationIdMap(prisma);
  const defaultDestinationId = destinationIds.get("nadi") ?? destinationIds.values().next().value;

  if (!defaultDestinationId) {
    console.warn("  Skipping tours/deals destination links — no destinations in database");
  }

  for (const row of buildAccommodationCmsSeedRecords()) {
    const destSlug = resolveDestinationSlug(row.location);
    const destinationId = destSlug ? destinationIds.get(destSlug) ?? null : null;

    await prisma.accommodation.upsert({
      where: { slug: row.slug },
      create: {
        title: row.title,
        slug: row.slug,
        location: row.location,
        destinationId,
        stars: row.stars,
        priceFrom: row.priceFrom,
        overview: row.overview,
        heroImage: row.heroImage,
        gallery: row.gallery,
        amenities: row.amenities,
        experiences: row.experiences,
        relatedSlugs: row.relatedSlugs,
        collection: row.collection,
        featured: row.featured,
        status: row.status,
        sortOrder: row.sortOrder,
      },
      update: {
        title: row.title,
        location: row.location,
        destinationId,
        stars: row.stars,
        priceFrom: row.priceFrom,
        overview: row.overview,
        heroImage: row.heroImage,
        gallery: row.gallery,
        amenities: row.amenities,
        experiences: row.experiences,
        relatedSlugs: row.relatedSlugs,
        collection: row.collection,
        featured: row.featured,
        status: row.status,
        sortOrder: row.sortOrder,
      },
    });
  }

  for (const [index, guide] of staticGuides.entries()) {
    const category = GUIDE_CATEGORY_BY_SLUG[guide.slug] ?? "GENERAL";
    const body = {
      overview: guide.overview,
      categoryLabel: guide.category,
      sections: guide.sections,
      faqs: guide.faqs,
      relatedSlugs: guide.relatedSlugs,
    };

    await prisma.travelGuide.upsert({
      where: { slug: guide.slug },
      create: {
        title: guide.title,
        slug: guide.slug,
        content: guide.overview,
        body: body as Prisma.InputJsonValue,
        excerpt: guide.excerpt,
        featuredImage: guide.heroImage,
        category,
        featured: index < 4,
        status: "PUBLISHED",
        sortOrder: index + 1,
        publishedAt: new Date(),
      },
      update: {
        title: guide.title,
        content: guide.overview,
        body: body as Prisma.InputJsonValue,
        excerpt: guide.excerpt,
        featuredImage: guide.heroImage,
        category,
        featured: index < 4,
        status: "PUBLISHED",
        sortOrder: index + 1,
        publishedAt: new Date(),
      },
    });
  }

  for (const [index, deal] of staticDeals.entries()) {
    const destSlug = resolveDestinationSlug(deal.location);
    const destinationId = destSlug ? destinationIds.get(destSlug) ?? null : null;
    const content: DealContentJson = {
      highlights: deal.highlights ?? deal.includes,
      duration: deal.duration,
      travelDates: deal.travelDates,
      bookBeforeDate: deal.bookBeforeDate ?? deal.bookBefore,
      destination: deal.destination,
      resortName: deal.resortName,
      urgency: deal.urgency,
      packageTags: deal.packageTags,
      flightsIncluded: deal.flightsIncluded,
      transfersIncluded: deal.transfersIncluded,
    };

    await prisma.deal.upsert({
      where: { slug: deal.slug },
      create: {
        title: deal.title,
        slug: deal.slug,
        description: deal.description,
        location: deal.location,
        destinationId,
        price: deal.price,
        priceNote: deal.priceNote ?? null,
        image: deal.image,
        category: DEAL_CATEGORY_MAP[deal.category] ?? "PACKAGE",
        includes: deal.includes ?? [],
        featured: deal.featured ?? index < 8,
        content: content as Prisma.InputJsonValue,
        packageDestination: deal.destination ?? null,
        resortName: deal.resortName ?? null,
        duration: deal.duration ?? null,
        travelDates: deal.travelDates ?? null,
        bookBeforeDate: deal.bookBeforeDate ?? deal.bookBefore ?? null,
        status: "PUBLISHED",
        sortOrder: index + 1,
      },
      update: {
        title: deal.title,
        description: deal.description,
        location: deal.location,
        destinationId,
        price: deal.price,
        priceNote: deal.priceNote ?? null,
        image: deal.image,
        category: DEAL_CATEGORY_MAP[deal.category] ?? "PACKAGE",
        includes: deal.includes ?? [],
        featured: deal.featured ?? index < 8,
        content: content as Prisma.InputJsonValue,
        packageDestination: deal.destination ?? null,
        resortName: deal.resortName ?? null,
        duration: deal.duration ?? null,
        travelDates: deal.travelDates ?? null,
        bookBeforeDate: deal.bookBeforeDate ?? deal.bookBefore ?? null,
        status: "PUBLISHED",
        sortOrder: index + 1,
      },
    });
  }

  const supplierId = await ensurePlatformSupplier(prisma);

  if (defaultDestinationId) {
    for (const [index, exp] of staticExperiences.entries()) {
      const destSlug = resolveDestinationSlug(exp.location);
      const destinationId =
        (destSlug ? destinationIds.get(destSlug) : null) ?? defaultDestinationId;
      const content: TourContentJson = {
        location: exp.location,
        category: exp.category,
        ages: exp.ages,
        priceFrom: exp.priceFrom,
        highlights: exp.highlights,
        included: exp.included,
        itinerary: exp.itinerary,
        faqs: exp.faqs,
        relatedSlugs: exp.relatedSlugs,
      };

      await prisma.tour.upsert({
        where: { slug: exp.slug },
        create: {
          supplierId,
          destinationId,
          title: exp.title,
          slug: exp.slug,
          description: exp.overview,
          duration: exp.duration,
          price: parseFjdAmount(exp.priceFrom),
          currency: "FJD",
          featuredImage: exp.heroImage,
          gallery: [],
          status: "APPROVED",
          rating: Number.parseFloat(exp.rating.score) || 0,
          reviewCount: exp.rating.count,
          featured: index < 10,
          content,
        },
        update: {
          destinationId,
          title: exp.title,
          description: exp.overview,
          duration: exp.duration,
          price: parseFjdAmount(exp.priceFrom),
          featuredImage: exp.heroImage,
          status: "APPROVED",
          rating: Number.parseFloat(exp.rating.score) || 0,
          reviewCount: exp.rating.count,
          featured: index < 10,
          content,
        },
      });
    }
  }

  const navItems: Array<{
    label: string;
    href: string;
    description?: string;
    location: "PRIMARY" | "FOOTER";
    sortOrder: number;
  }> = [
    { label: "Places to Go", href: CMS_ROUTES.destinations.index, location: "PRIMARY", sortOrder: 1 },
    { label: "Things to Do", href: CMS_ROUTES.tours.index, location: "PRIMARY", sortOrder: 2 },
    { label: "Places to Stay", href: "/places-to-stay", location: "PRIMARY", sortOrder: 3 },
    { label: "Guides", href: CMS_ROUTES.guides.index, location: "PRIMARY", sortOrder: 4 },
    { label: "Deals", href: "/deals-and-offers", location: "PRIMARY", sortOrder: 5 },
    { label: "Tools", href: "/tools", location: "PRIMARY", sortOrder: 6 },
    { label: "Contact", href: "/contact", location: "FOOTER", sortOrder: 1 },
    { label: "FAQ", href: CMS_ROUTES.faq, location: "FOOTER", sortOrder: 2 },
    { label: "Privacy", href: "/privacy", location: "FOOTER", sortOrder: 3 },
  ];

  for (const item of navItems) {
    const existing = await prisma.navigationItem.findFirst({
      where: { href: item.href, location: item.location },
    });
    if (existing) {
      await prisma.navigationItem.update({
        where: { id: existing.id },
        data: {
          label: item.label,
          description: item.description ?? null,
          sortOrder: item.sortOrder,
          status: "PUBLISHED",
        },
      });
    } else {
      await prisma.navigationItem.create({
        data: {
          label: item.label,
          href: item.href,
          description: item.description ?? null,
          location: item.location,
          sortOrder: item.sortOrder,
          status: "PUBLISHED",
        },
      });
    }
  }

  const seoPages = [
    { key: "home", meta: staticPageSeo.home },
    { key: "destinations", meta: staticPageSeo.destinations },
    { key: "tools", meta: staticPageSeo.tools },
  ] as const;

  for (const page of seoPages) {
    const entityId = `page:${page.key}`;
    await prisma.seoMeta.upsert({
      where: {
        entityType_entityId: { entityType: "PAGE", entityId },
      },
      create: {
        entityType: "PAGE",
        entityId,
        metaTitle: page.meta.title,
        metaDescription: page.meta.description,
        ogTitle: page.meta.openGraph?.title ?? page.meta.title,
        ogDescription: page.meta.openGraph?.description ?? page.meta.description,
        ogImage: typeof page.meta.openGraph?.images?.[0] === "string"
          ? page.meta.openGraph.images[0]
          : page.meta.openGraph?.images?.[0]?.url ?? null,
        canonicalUrl: page.meta.alternates?.canonical ?? null,
      },
      update: {
        metaTitle: page.meta.title,
        metaDescription: page.meta.description,
        ogTitle: page.meta.openGraph?.title ?? page.meta.title,
        ogDescription: page.meta.openGraph?.description ?? page.meta.description,
        ogImage: typeof page.meta.openGraph?.images?.[0] === "string"
          ? page.meta.openGraph.images[0]
          : page.meta.openGraph?.images?.[0]?.url ?? null,
        canonicalUrl: page.meta.alternates?.canonical ?? null,
      },
    });
  }

  const destinations = await prisma.destination.findMany({ select: { id: true, slug: true, name: true } });
  for (const dest of destinations) {
    await prisma.seoMeta.upsert({
      where: {
        entityType_entityId: { entityType: "DESTINATION", entityId: dest.id },
      },
      create: {
        entityType: "DESTINATION",
        entityId: dest.id,
        metaTitle: `${dest.name} — Fiji Luxury Travel Guide`,
        metaDescription: `Discover ${dest.name} — curated resorts, experiences and travel intelligence for luxury Fiji holidays.`,
      },
      update: {
        metaTitle: `${dest.name} — Fiji Luxury Travel Guide`,
        metaDescription: `Discover ${dest.name} — curated resorts, experiences and travel intelligence for luxury Fiji holidays.`,
      },
    });
  }

  console.log(
    `  ✓ accommodations, guides, deals, tours, navigation, SEO`,
  );
}
