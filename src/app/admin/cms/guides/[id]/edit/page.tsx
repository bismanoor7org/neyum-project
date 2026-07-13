import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/ui/AdminUi";
import { GuideForm } from "@/components/cms/forms/GuideForm";
import { getGuideCms, getSeoMeta } from "@/server/services/cms/cms.service";
import type { GuideBodyJson } from "@/lib/cms/guide-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditGuidePage({ params }: PageProps) {
  const { id } = await params;
  const record = await getGuideCms(id);
  if (!record) notFound();
  const seo = await getSeoMeta("GUIDE", id);

  const row = record as {
    id: string;
    title: string;
    slug: string;
    excerpt?: string | null;
    featuredImage?: string | null;
    content?: string;
    category?: "GENERAL" | "FIRST_TIME" | "VISA" | "WEATHER" | "CULTURE" | "TRANSPORT" | "DINING" | "SAFETY" | "ITINERARY";
    status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    sortOrder?: number;
    body?: GuideBodyJson | null;
  };

  return (
    <>
      <PageHeader
        title={`Edit: ${row.title}`}
        subtitle={`Public URL: /guides/${row.slug}`}
      />
      <GuideForm
        initial={row}
        seo={
          seo
            ? {
                metaTitle: (seo as { metaTitle?: string }).metaTitle,
                metaDescription: (seo as { metaDescription?: string }).metaDescription,
                ogTitle: (seo as { ogTitle?: string }).ogTitle,
                ogDescription: (seo as { ogDescription?: string }).ogDescription,
                ogImage: (seo as { ogImage?: string }).ogImage,
                canonicalUrl: (seo as { canonicalUrl?: string }).canonicalUrl,
                noIndex: (seo as { noIndex?: boolean }).noIndex,
              }
            : undefined
        }
      />
    </>
  );
}
