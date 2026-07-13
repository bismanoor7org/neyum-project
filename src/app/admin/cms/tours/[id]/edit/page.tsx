import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/ui/AdminUi";
import { TourForm } from "@/components/cms/forms/TourForm";
import { CMS_ROUTES } from "@/lib/cms/public-routes";
import { getTourCms, getSeoMeta } from "@/server/services/cms/cms.service";
import { listDestinationsForCms, listSuppliersForCms } from "@/server/services/cms/cms-platform.service";
import { listDestinationsCms } from "@/server/services/cms/cms.service";
import { isDatabaseConfigured } from "@/server/auth/local-admin-store";
import type { TourContentJson } from "@/lib/cms/tour-content";
import type { TourCmsStatus } from "@/lib/cms/tour-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function loadDestinations() {
  if (isDatabaseConfigured()) return listDestinationsForCms();
  const result = await listDestinationsCms();
  return (result.items as { id: string; name: string; slug: string }[]).map((d) => ({
    id: d.id,
    name: d.name,
    slug: d.slug,
  }));
}

export default async function EditTourPage({ params }: PageProps) {
  const { id } = await params;
  const record = await getTourCms(id);
  if (!record) notFound();

  const [destinations, suppliers, seo] = await Promise.all([
    loadDestinations(),
    listSuppliersForCms(),
    getSeoMeta("TOUR", id),
  ]);

  const row = record as {
    id: string;
    title: string;
    slug: string;
    description: string;
    duration: string;
    price: number | { toString(): string };
    currency: string;
    featuredImage?: string | null;
    featured: boolean;
    status: TourCmsStatus;
    destinationId?: string;
    content?: TourContentJson | null;
    destination?: { id: string };
    supplier?: { id: string };
  };

  return (
    <>
      <PageHeader
        title={`Edit: ${row.title}`}
        subtitle={`Public URL: ${CMS_ROUTES.tours.detail(row.slug)}`}
      />
      <TourForm
        initial={{
          ...row,
          price: typeof row.price === "object" ? Number(row.price.toString()) : row.price,
          destinationId: row.destination?.id ?? row.destinationId,
          supplierId: row.supplier?.id,
        }}
        destinations={destinations}
        suppliers={suppliers}
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
