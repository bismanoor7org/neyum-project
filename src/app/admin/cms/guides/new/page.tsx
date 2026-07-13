import { PageHeader } from "@/components/admin/ui/AdminUi";
import { GuideForm } from "@/components/cms/forms/GuideForm";

export default function NewGuidePage() {
  return (
    <>
      <PageHeader
        title="New travel guide"
        subtitle="Publishes to /guides/[slug] automatically."
      />
      <GuideForm />
    </>
  );
}
