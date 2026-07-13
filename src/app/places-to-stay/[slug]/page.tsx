import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { CmsPreviewBanner } from "@/components/cms/CmsPreviewBanner";
import { ResortDetailView } from "@/components/marketplace/ResortDetailView";
import { buildCmsPageMetadata } from "@/lib/cms/metadata";
import { resolveCmsPreview } from "@/lib/cms/preview";
import { CMS_ROUTES } from "@/lib/cms/public-routes";
import { getResortMetadata } from "@/lib/seo/content-meta";
import { resortPageJsonLd } from "@/lib/seo/detail-json-ld";
import {
  getAccommodationBySlug,
  getAccommodationIdBySlug,
  getAccommodationSlugs,
  getPublishedAccommodations,
  getRelatedAccommodations,
} from "@/server/services/public-content.service";
import { getPublicSeoMeta } from "@/server/services/public-seo.service";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}

export const dynamicParams = true;
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const slugs = await getAccommodationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resort = await getAccommodationBySlug(slug);
  if (!resort) return { title: "Resort not found" };
  const entityId = (await getAccommodationIdBySlug(slug)) ?? slug;
  const seo = await getPublicSeoMeta("ACCOMMODATION", entityId);
  if (seo?.metaTitle || seo?.metaDescription) {
    return buildCmsPageMetadata({
      path: CMS_ROUTES.stays.detail(slug),
      fallback: {
        title: resort.title,
        description: resort.overview,
        image: resort.heroImage,
        imageAlt: `${resort.title} Fiji luxury resort ${resort.location}`,
      },
      seo,
    });
  }
  return getResortMetadata(resort);
}

export default async function ResortDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const { allowDraft } = await resolveCmsPreview(sp);
  const resort = await getAccommodationBySlug(slug, { allowDraft });
  if (!resort) notFound();

  const allResorts = await getPublishedAccommodations();
  const relatedResorts = await getRelatedAccommodations(resort.relatedSlugs, allResorts);

  return (
    <PageLayout activeHref={CMS_ROUTES.stays.index} stickyCta>
      {allowDraft && <CmsPreviewBanner />}
      <JsonLd data={resortPageJsonLd(resort)} />
      <ResortDetailView resort={resort} relatedResorts={relatedResorts} />
    </PageLayout>
  );
}
