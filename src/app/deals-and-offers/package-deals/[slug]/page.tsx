import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackageDealDetailView } from "@/components/deals/PackageDealDetailView";
import { PageLayout } from "@/components/layout/PageLayout";
import { deals, getDealBySlug } from "@/lib/content/deals";

export function generateStaticParams() {
  return deals
    .filter((d) => d.category === "Package Deals")
    .map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const deal = getDealBySlug(slug);
  if (!deal) return { title: "Package not found" };
  return {
    title: `${deal.title} | Curated Fiji Package`,
    description: deal.packageDetail?.overview ?? deal.description,
  };
}

export default async function PackageDealPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const deal = getDealBySlug(slug);

  if (!deal || deal.category !== "Package Deals") {
    notFound();
  }

  return (
    <PageLayout activeHref="/deals-and-offers" stickyCta>
      <PackageDealDetailView deal={deal} />
    </PageLayout>
  );
}
