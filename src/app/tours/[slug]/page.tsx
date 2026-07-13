import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { ExperienceDetailView } from "@/components/marketplace/ExperienceDetailView";
import { CmsPreviewBanner } from "@/components/cms/CmsPreviewBanner";
import { buildCmsPageMetadata } from "@/lib/cms/metadata";
import { resolveCmsPreview } from "@/lib/cms/preview";
import { CMS_ROUTES } from "@/lib/cms/public-routes";
import { getExperienceMetadata } from "@/lib/seo/content-meta";
import { experiencePageJsonLd } from "@/lib/seo/detail-json-ld";
import {
  getExperienceBySlug,
  getExperienceSlugs,
  getTourIdBySlug,
} from "@/server/services/public-content.service";
import { getPublicSeoMeta } from "@/server/services/public-seo.service";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}

export const dynamicParams = true;
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const slugs = await getExperienceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);
  if (!experience) return { title: "Tour not found" };
  const entityId = (await getTourIdBySlug(slug)) ?? slug;
  const seo = await getPublicSeoMeta("TOUR", entityId);
  if (seo?.metaTitle || seo?.metaDescription) {
    return buildCmsPageMetadata({
      path: CMS_ROUTES.tours.detail(slug),
      fallback: {
        title: experience.title,
        description: experience.overview,
        image: experience.heroImage,
      },
      seo,
    });
  }
  return getExperienceMetadata(experience);
}

export default async function TourDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const { allowDraft } = await resolveCmsPreview(sp);
  const experience = await getExperienceBySlug(slug, { allowDraft });
  if (!experience) notFound();

  return (
    <PageLayout activeHref={CMS_ROUTES.tours.index} heroOverlap stickyCta>
      {allowDraft && <CmsPreviewBanner />}
      <JsonLd data={experiencePageJsonLd(experience)} />
      <ExperienceDetailView experience={experience} />
    </PageLayout>
  );
}
