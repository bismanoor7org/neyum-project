import type { Metadata } from "next";
import { slugToCategory } from "@/lib/content/deals";
import { buildPageMetadata } from "@/lib/seo/metadata";

const categorySeo: Record<string, { description: string; keywords: string[] }> = {
  "package-deals": {
    description:
      "Fiji package deals — luxury resort stays, island escapes, family holidays and honeymoon packages with concierge best-price guarantee.",
    keywords: ["Fiji package deals", "Fiji honeymoon packages", "Fiji luxury packages", "Fiji family holidays"],
  },
  accommodation: {
    description:
      "Fiji luxury accommodation deals — overwater bures, five-star Denarau resorts, Coral Coast beach retreats and private island lodges.",
    keywords: ["Fiji resorts", "Fiji luxury accommodation", "Fiji resort deals", "Denarau resorts"],
  },
  experiences: {
    description:
      "Fiji experience deals — shark diving, sunset cruises, island hopping adventures and cultural tours at exclusive rates.",
    keywords: ["Fiji adventure tours", "Fiji diving experiences", "Fiji island hopping", "things to do in Fiji"],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const label = slugToCategory[slug] ?? "Deals & Offers";
  const seo = categorySeo[slug];

  return buildPageMetadata({
    title: `Fiji ${label} — Luxury Offers & Exclusive Rates`,
    description:
      seo?.description ??
      `Curated Fiji ${label.toLowerCase()} — luxury packages, exclusive rates and concierge booking.`,
    path: `/deals-and-offers/${slug}`,
    keywords: seo?.keywords ?? ["Fiji deals", "Fiji luxury travel"],
  });
}

export default function DealsCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
