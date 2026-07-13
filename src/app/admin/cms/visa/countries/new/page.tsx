import { PageHeader } from "@/components/admin/ui/AdminUi";
import { VisaCountryForm } from "@/components/cms/forms/VisaCountryForm";

export default function NewVisaCountryPage() {
  return (
    <>
      <PageHeader title="Add Country" subtitle="New nationality for visa intelligence." />
      <VisaCountryForm />
    </>
  );
}
