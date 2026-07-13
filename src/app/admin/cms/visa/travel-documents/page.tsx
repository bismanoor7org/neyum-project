import { PageHeader } from "@/components/admin/ui/AdminUi";
import { TravelDocumentForm } from "@/components/cms/forms/TravelDocumentForm";

export default function VisaTravelDocumentsPage() {
  return (
    <>
      <PageHeader
        title="Travel Document Requirements"
        subtitle="Per-nationality passport, ticket, funds and insurance rules."
      />
      <TravelDocumentForm />
    </>
  );
}
