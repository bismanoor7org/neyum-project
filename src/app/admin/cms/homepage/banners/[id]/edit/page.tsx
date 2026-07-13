import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/ui/AdminUi";
import { BannerForm } from "@/components/cms/forms/BannerForm";
import { getBannerCms } from "@/server/services/cms-data.service";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBannerPage({ params }: PageProps) {
  const { id } = await params;
  const record = await getBannerCms(id);
  if (!record) notFound();
  const row = record as {
    id: string;
    title: string;
    subtitle?: string | null;
    imageUrl: string;
    linkUrl?: string | null;
    position?: string;
    status?: "DRAFT" | "PUBLISHED" | "ARCHIVED" | "SCHEDULED";
    sortOrder?: number;
    startsAt?: string | null;
    endsAt?: string | null;
  };

  return (
    <>
      <PageHeader title={`Edit banner: ${row.title}`} subtitle={`Position: ${row.position ?? "homepage"}`} />
      <BannerForm initial={row} />
    </>
  );
}
