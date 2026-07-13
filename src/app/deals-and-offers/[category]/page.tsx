import { notFound } from "next/navigation";
import { DealsHub } from "@/components/deals/DealsHub";
import { slugToCategory } from "@/lib/content/deals";

export function generateStaticParams() {
  return [
    { category: "package-deals" },
    { category: "accommodation" },
    { category: "experiences" },
  ];
}

export default async function DealsCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const activeCategory = slugToCategory[slug];

  if (!activeCategory) {
    notFound();
  }

  return <DealsHub activeCategory={activeCategory} />;
}
