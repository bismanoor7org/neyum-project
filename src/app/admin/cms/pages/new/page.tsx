import { PageHeader } from "@/components/admin/ui/AdminUi";
import { ContentEditorForm } from "@/components/cms/editor/ContentEditorForm";

export default function NewCmsPagePage() {
  return (
    <>
      <PageHeader title="New page" subtitle="Create a freeform page with the rich text editor." />
      <ContentEditorForm mode="page" apiBase="/api/v1/admin/cms/pages" />
    </>
  );
}
