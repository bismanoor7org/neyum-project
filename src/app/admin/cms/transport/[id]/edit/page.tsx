import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/ui/AdminUi";
import { TransportForm } from "@/components/cms/forms/TransportForm";
import { getTransportCms } from "@/server/services/cms/cms.service";
import { listSuppliersForCms } from "@/server/services/cms/cms-platform.service";
import type { TransportCmsStatus } from "@/lib/cms/transport-content";
import type { TransportType } from "@prisma/client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTransportPage({ params }: PageProps) {
  const { id } = await params;
  const record = await getTransportCms(id);
  if (!record) notFound();
  const suppliers = await listSuppliersForCms();

  const row = record as {
    id: string;
    title: string;
    type: TransportType;
    description?: string | null;
    capacity: number;
    price: number | { toString(): string };
    currency: string;
    image?: string | null;
    featured: boolean;
    status: TransportCmsStatus;
    supplier?: { id: string };
  };

  return (
    <>
      <PageHeader title={`Edit: ${row.title}`} subtitle="Transportation service" />
      <TransportForm
        initial={{
          ...row,
          price: typeof row.price === "object" ? Number(row.price.toString()) : row.price,
          supplierId: row.supplier?.id,
        }}
        suppliers={suppliers}
      />
    </>
  );
}
