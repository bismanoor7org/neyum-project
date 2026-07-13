import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/ui/AdminUi";
import { HomepageSectionForm } from "@/components/cms/forms/HomepageSectionForm";
import { getHomepageSectionCms } from "@/server/services/cms/cms.service";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditHomepageSectionPage({ params }: PageProps) {
  const { id } = await params;
  const record = await getHomepageSectionCms(id);
  if (!record) notFound();

  const row = record as {
    id: string;
    key: string;
    title: string;
    content: Record<string, unknown>;
    status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    sortOrder?: number;
  };

  return (
    <>
      <PageHeader
        title={`Edit: ${row.title}`}
        subtitle={`Section key: ${row.key} — view at /`}
      />
      <HomepageSectionForm initial={row} />
    </>
  );
}
