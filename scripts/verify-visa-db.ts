import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const countries = await prisma.country.count();
  const visaRules = await prisma.visaRule.count();
  const travelDocs = await prisma.travelDocumentRequirement.count();
  const entryGuides = await prisma.entryGuide.count();

  const pakistan = await prisma.country.findUnique({
    where: { slug: "pakistan" },
    include: { visaRules: true },
  });

  console.log(
    JSON.stringify(
      {
        countries,
        visaRules,
        travelDocs,
        entryGuides,
        pakistan: pakistan
          ? { name: pakistan.name, rules: pakistan.visaRules.length }
          : null,
      },
      null,
      2,
    ),
  );
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
