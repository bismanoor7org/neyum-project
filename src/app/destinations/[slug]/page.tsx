import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { DestinationDetailView } from "@/components/marketplace/DestinationDetailView";
import { CmsPreviewBanner } from "@/components/cms/CmsPreviewBanner";
import { buildCmsPageMetadata } from "@/lib/cms/metadata";
import { resolveCmsPreview } from "@/lib/cms/preview";
import { CMS_ROUTES } from "@/lib/cms/public-routes";
import { destinationPageJsonLd } from "@/lib/seo/detail-json-ld";
import {
  getDestinationMarketplace,
  getRelatedDestinations,
} from "@/server/services/destination-marketplace.service";
import {
  getDestinationBySlug,
  getDestinationIdBySlug,
  getDestinationSlugs,
  getPublishedDestinations,
} from "@/server/services/public-content.service";
import { getPublicSeoMeta } from "@/server/services/public-seo.service";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}

export const dynamicParams = true;
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const slugs = await getDestinationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) return { title: "Destination not found" };
  const entityId = (await getDestinationIdBySlug(slug)) ?? slug;
  const seo = await getPublicSeoMeta("DESTINATION", entityId);
  return buildCmsPageMetadata({
    path: CMS_ROUTES.destinations.detail(slug),
    fallback: {
      title: `${destination.title} — Luxury Fiji Travel`,
      description: destination.description ?? destination.overview,
      image: destination.heroImage || destination.cardImage,
      imageAlt: `${destination.title} Fiji luxury destination`,
    },
    seo,
  });
}

export default async function DestinationPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const { allowDraft } = await resolveCmsPreview(sp);
  const destination = await getDestinationBySlug(slug, { allowDraft });
  if (!destination) notFound();

  const [marketplace, allDestinations] = await Promise.all([
    getDestinationMarketplace(slug),
    getPublishedDestinations(),
  ]);
  const relatedDestinations = await getRelatedDestinations(
    destination.relatedSlugs,
    allDestinations,
  );

  return (
    <PageLayout activeHref={CMS_ROUTES.destinations.index} stickyCta>
      {allowDraft && <CmsPreviewBanner />}
      <JsonLd data={destinationPageJsonLd(destination, marketplace)} />
      <DestinationDetailView
        destination={destination}
        marketplace={marketplace}
        relatedDestinations={relatedDestinations}
      />
    </PageLayout>
  );
}
