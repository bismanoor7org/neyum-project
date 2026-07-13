import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/ui/AdminUi";
import { TestimonialForm } from "@/components/cms/forms/TestimonialForm";
import { getTestimonialCms } from "@/server/services/cms/cms.service";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTestimonialPage({ params }: PageProps) {
  const { id } = await params;
  const record = await getTestimonialCms(id);
  if (!record) notFound();

  const row = record as {
    id: string;
    authorName: string;
    authorTitle?: string | null;
    authorImage?: string | null;
    location?: string | null;
    content: string;
    rating: number;
    featured: boolean;
    status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    sortOrder: number;
  };

  return (
    <>
      <PageHeader title={`Edit: ${row.authorName}`} subtitle="Customer story" />
      <TestimonialForm initial={row} />
    </>
  );
}
