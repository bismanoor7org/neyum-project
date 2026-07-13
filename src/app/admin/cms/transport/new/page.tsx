import { PageHeader } from "@/components/admin/ui/AdminUi";
import { TransportForm } from "@/components/cms/forms/TransportForm";
import { listSuppliersForCms } from "@/server/services/cms/cms-platform.service";

export default async function NewTransportPage() {
  const suppliers = await listSuppliersForCms();
  return (
    <>
      <PageHeader title="New transport service" subtitle="Airport transfers, boats and private drivers." />
      <TransportForm suppliers={suppliers} />
    </>
  );
}
