import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/ui/AdminUi";
import { DestinationForm } from "@/components/cms/forms/DestinationForm";
import { CMS_ROUTES } from "@/lib/cms/public-routes";
import { getDestinationCms, getSeoMeta } from "@/server/services/cms/cms.service";
import type { DestinationContentJson } from "@/lib/cms/destination-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditDestinationPage({ params }: PageProps) {
  const { id } = await params;
  const record = await getDestinationCms(id);
  if (!record) notFound();

  const seo = await getSeoMeta("DESTINATION", id);

  const row = record as {
    id: string;
    name: string;
    slug: string;
    tagline?: string | null;
    description?: string | null;
    excerpt?: string | null;
    heroImage?: string | null;
    gallery?: string[];
    featured?: boolean;
    status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    sortOrder?: number;
    latitude?: number | string | null;
    longitude?: number | string | null;
    content?: DestinationContentJson | null;
    highlights?: string[] | null;
  };

  return (
    <>
      <PageHeader
        title={`Edit: ${row.name}`}
        subtitle={`Public URL: ${CMS_ROUTES.destinations.detail(row.slug)}`}
      />
      <DestinationForm
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
