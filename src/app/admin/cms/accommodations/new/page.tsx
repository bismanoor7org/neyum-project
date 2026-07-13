import { PageHeader } from "@/components/admin/ui/AdminUi";
import { AccommodationForm } from "@/components/cms/forms/AccommodationForm";

export default function NewAccommodationPage() {
  return (
    <>
      <PageHeader
        title="New property"
        subtitle="Publishes to /places-to-stay/[slug] when status is Published."
      />
      <AccommodationForm />
    </>
  );
}
