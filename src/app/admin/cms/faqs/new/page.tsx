import { PageHeader } from "@/components/admin/ui/AdminUi";
import { FaqForm } from "@/components/cms/forms/FaqForm";

export default function NewFaqPage() {
  return (
    <>
      <PageHeader title="New FAQ" subtitle="Appears on /faq and homepage FAQ preview when published." />
      <FaqForm />
    </>
  );
}
