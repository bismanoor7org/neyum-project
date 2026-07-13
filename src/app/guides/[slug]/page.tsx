import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { GuideDetailView } from "@/components/marketplace/GuideDetailView";
import { CmsPreviewBanner } from "@/components/cms/CmsPreviewBanner";
import { buildCmsPageMetadata } from "@/lib/cms/metadata";
import { resolveCmsPreview } from "@/lib/cms/preview";
import { CMS_ROUTES } from "@/lib/cms/public-routes";
import { getGuideMetadata } from "@/lib/seo/content-meta";
import { guidePageJsonLd } from "@/lib/seo/detail-json-ld";
import {
  getGuideBySlug,
  getGuideIdBySlug,
  getGuideSlugs,
} from "@/server/services/public-content.service";
import { getPublicSeoMeta } from "@/server/services/public-seo.service";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}

export const dynamicParams = true;
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const slugs = await getGuideSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) return { title: "Guide not found" };
  const entityId = (await getGuideIdBySlug(slug)) ?? slug;
  const seo = await getPublicSeoMeta("GUIDE", entityId);
  if (seo?.metaTitle || seo?.metaDescription) {
    return buildCmsPageMetadata({
      path: CMS_ROUTES.guides.detail(slug),
      fallback: { title: guide.title, description: guide.excerpt || guide.overview },
      seo,
    });
  }
  return getGuideMetadata(guide);
}

export default async function GuideDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const { allowDraft } = await resolveCmsPreview(sp);
  const guide = await getGuideBySlug(slug, { allowDraft });
  if (!guide) notFound();

  return (
    <PageLayout activeHref={CMS_ROUTES.guides.index} stickyCta>
      {allowDraft && <CmsPreviewBanner />}
      <JsonLd data={guidePageJsonLd(guide)} />
      <GuideDetailView guide={guide} />
    </PageLayout>
  );
}
