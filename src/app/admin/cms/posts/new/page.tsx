import { PageHeader } from "@/components/admin/ui/AdminUi";
import { ContentEditorForm } from "@/components/cms/editor/ContentEditorForm";
import { listCategories, listTags } from "@/server/services/cms-wp/content.service";

export default async function NewCmsPostPage() {
  const [categories, tags] = await Promise.all([listCategories(), listTags()]);
  return (
    <>
      <PageHeader title="New blog post" subtitle="Write and schedule editorial content." />
      <ContentEditorForm
        mode="post"
        apiBase="/api/v1/admin/cms/posts"
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        tags={tags.map((t) => ({ id: t.id, name: t.name }))}
      />
    </>
  );
}
