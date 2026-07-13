import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/ui/AdminUi";
import { AccommodationForm } from "@/components/cms/forms/AccommodationForm";
import { getAccommodationCms, getSeoMeta } from "@/server/services/cms-data.service";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAccommodationPage({ params }: PageProps) {
  const { id } = await params;
  const record = await getAccommodationCms(id);
  if (!record) notFound();
  const seo = await getSeoMeta("ACCOMMODATION", id);
  const row = record as {
    id: string;
    title: string;
    slug: string;
    location: string;
    stars: number;
    priceFrom?: string | null;
    overview: string;
    heroImage?: string | null;
    gallery?: string[];
    amenities?: string[];
    experiences?: string[];
    relatedSlugs?: string[];
    collection?: string | null;
    featured?: boolean;
    status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    sortOrder?: number;
  };

  return (
    <>
      <PageHeader
        title={`Edit: ${row.title}`}
        subtitle={`Public URL: /places-to-stay/${row.slug}`}
      />
      <AccommodationForm
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
