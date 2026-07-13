import { Prisma, PrismaClient } from "@prisma/client";
import {
  buildDestinationCmsSeedRecords,
  DESTINATIONS_HUB_DEFAULTS,
} from "../src/lib/cms/seed-destinations";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding My Fiji Tour marketplace database…");

  await prisma.platformSettings.upsert({
    where: { id: "default" },
    create: {
      platformName: "My Fiji Tour",
      supportEmail: "concierge@myfijitour.com",
      defaultCurrency: "FJD",
      timezone: "Pacific/Fiji",
      commissionPercentage: 15,
    },
    update: {},
  });

  for (const dest of buildDestinationCmsSeedRecords()) {
    await prisma.destination.upsert({
      where: { slug: dest.slug },
      create: {
        name: dest.name,
        slug: dest.slug,
        tagline: dest.tagline,
        description: dest.description,
        excerpt: dest.excerpt,
        heroImage: dest.heroImage,
        gallery: dest.gallery,
        highlights: dest.highlights,
        content: dest.content as Prisma.InputJsonValue,
        latitude: dest.latitude ?? undefined,
        longitude: dest.longitude ?? undefined,
        featured: dest.featured,
        status: dest.status,
        sortOrder: dest.sortOrder,
      },
      update: {
        name: dest.name,
        tagline: dest.tagline,
        description: dest.description,
        excerpt: dest.excerpt,
        heroImage: dest.heroImage,
        gallery: dest.gallery,
        highlights: dest.highlights,
        content: dest.content as Prisma.InputJsonValue,
        latitude: dest.latitude ?? undefined,
        longitude: dest.longitude ?? undefined,
        featured: dest.featured,
        sortOrder: dest.sortOrder,
        status: dest.status,
      },
    });
  }

  await prisma.homepageSection.upsert({
    where: { key: DESTINATIONS_HUB_DEFAULTS.key },
    create: {
      key: DESTINATIONS_HUB_DEFAULTS.key,
      title: DESTINATIONS_HUB_DEFAULTS.title,
      content: DESTINATIONS_HUB_DEFAULTS.content,
      status: DESTINATIONS_HUB_DEFAULTS.status,
      sortOrder: DESTINATIONS_HUB_DEFAULTS.sortOrder,
    },
    update: {
      title: DESTINATIONS_HUB_DEFAULTS.title,
      content: DESTINATIONS_HUB_DEFAULTS.content,
      status: DESTINATIONS_HUB_DEFAULTS.status,
    },
  });

  const analyticsSources = [
    "GOOGLE_ANALYTICS",
    "MICROSOFT_CLARITY",
    "SEARCH_CONSOLE",
    "INTERNAL",
  ] as const;

  for (const source of analyticsSources) {
    await prisma.analyticsIntegration.upsert({
      where: { source },
      create: { source, enabled: source === "INTERNAL" },
      update: {},
    });
  }

  const defaultFaqs = [
    {
      question: "What is the best time to visit Fiji?",
      answer:
        "May through October offers dry season weather ideal for diving, sailing, and resort stays. November–April is warmer with occasional tropical showers and fewer crowds.",
      sortOrder: 1,
    },
    {
      question: "Do I need a visa to visit Fiji?",
      answer:
        "Most nationalities receive a visitor permit on arrival for stays up to 4 months. Always verify requirements for your passport before travel.",
      sortOrder: 2,
    },
    {
      question: "How do bookings work on My Fiji Tour?",
      answer:
        "Browse verified tours and experiences, submit your travel dates, and pay securely via Stripe. Our concierge confirms availability with the supplier within 24 hours.",
      sortOrder: 3,
    },
  ];

  for (const faq of defaultFaqs) {
    const existing = await prisma.faq.findFirst({
      where: { question: faq.question },
    });
    if (!existing) {
      await prisma.faq.create({ data: faq });
    }
  }

  const { seedVisaIntelligence } = await import("./seed-visa-intelligence");
  await seedVisaIntelligence(prisma);

  const { seedCmsContent } = await import("./seed-content");
  await seedCmsContent(prisma);

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
