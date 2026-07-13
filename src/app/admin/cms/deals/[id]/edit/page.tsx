import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/ui/AdminUi";
import { DealForm } from "@/components/cms/forms/DealForm";
import { getDealCms, getSeoMeta } from "@/server/services/cms-data.service";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditDealPage({ params }: PageProps) {
  const { id } = await params;
  const record = await getDealCms(id);
  if (!record) notFound();
  const seo = await getSeoMeta("DEAL", id);
  const row = record as {
    id: string;
    title: string;
    slug: string;
    description: string;
    location: string;
    price: string;
    priceNote?: string | null;
    image?: string | null;
    category: "PACKAGE" | "ACCOMMODATION" | "EXPERIENCE";
    includes?: string[];
    featured?: boolean;
    status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    sortOrder?: number;
    content?: import("@/lib/cms/deal-content").DealContentJson | null;
    packageDestination?: string | null;
    resortName?: string | null;
    duration?: string | null;
    travelDates?: string | null;
    bookBeforeDate?: string | null;
    bonusValue?: string | null;
    resortCredit?: string | null;
    includedFlights?: boolean;
    includedTransfers?: boolean;
    includedMeals?: string | null;
    includedActivities?: string[];
    packageTags?: string[];
  };

  const publicUrl =
    row.category === "PACKAGE"
      ? `/deals-and-offers/package-deals/${row.slug}`
      : `/deals-and-offers/${row.slug}`;

  return (
    <>
      <PageHeader title={`Edit: ${row.title}`} subtitle={`Public URL: ${publicUrl}`} />
      <DealForm
        initial={{
          ...row,
          content: (record as { content?: import("@/lib/cms/deal-content").DealContentJson | null })
            .content,
        }}
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
