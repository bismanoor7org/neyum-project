import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/ui/AdminUi";
import { FaqForm } from "@/components/cms/forms/FaqForm";
import { getFaqCms, getSeoMeta } from "@/server/services/cms/cms.service";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditFaqPage({ params }: PageProps) {
  const { id } = await params;
  const record = await getFaqCms(id);
  if (!record) notFound();
  const seo = await getSeoMeta("FAQ", id);

  const row = record as {
    id: string;
    question: string;
    answer: string;
    category?: string | null;
    sortOrder?: number;
    status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  };

  return (
    <>
      <PageHeader title="Edit FAQ" subtitle={row.question} />
      <FaqForm
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
