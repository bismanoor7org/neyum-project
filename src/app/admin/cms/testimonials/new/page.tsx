import { PageHeader } from "@/components/admin/ui/AdminUi";
import { TestimonialForm } from "@/components/cms/forms/TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <>
      <PageHeader title="New testimonial" subtitle="Appears on homepage customer stories when published." />
      <TestimonialForm />
    </>
  );
}
