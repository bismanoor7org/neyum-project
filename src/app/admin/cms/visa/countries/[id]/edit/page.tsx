import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/ui/AdminUi";
import { VisaCountryForm } from "@/components/cms/forms/VisaCountryForm";
import { getCountryById } from "@/server/services/visa-intelligence.service";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditVisaCountryPage({ params }: PageProps) {
  const { id } = await params;
  let row;
  try {
    row = await getCountryById(id);
  } catch {
    notFound();
  }
  if (!row) notFound();

  return (
    <>
      <PageHeader title={`Edit ${row.name}`} subtitle={`Slug: ${row.slug}`} />
      <VisaCountryForm initial={row} />
    </>
  );
}
