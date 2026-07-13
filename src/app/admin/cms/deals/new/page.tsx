import { PageHeader } from "@/components/admin/ui/AdminUi";
import { DealForm } from "@/components/cms/forms/DealForm";

export default function NewDealPage() {
  return (
    <>
      <PageHeader title="New deal" subtitle="Publishes to /deals-and-offers when status is Published." />
      <DealForm />
    </>
  );
}
