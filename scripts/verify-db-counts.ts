import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tables = [
  "country",
  "visaRule",
  "travelDocumentRequirement",
  "entryGuide",
  "destination",
  "tour",
  "accommodation",
  "deal",
  "travelGuide",
  "faq",
  "homepageSection",
  "platformSettings",
  "navigationItem",
  "seoMeta",
  "supplier",
  "transportationService",
  "user",
  "analyticsIntegration",
] as const;

async function main() {
  const counts: Record<string, number> = {};
  for (const table of tables) {
    // @ts-expect-error dynamic delegate
    counts[table] = await prisma[table].count();
  }

  const albania = await prisma.country.findUnique({
    where: { slug: "albania" },
    include: { visaRules: true },
  });

  console.log(JSON.stringify({ counts, albania: albania ? { name: albania.name, rules: albania.visaRules.length } : null }, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
