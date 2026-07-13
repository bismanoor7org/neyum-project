import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/ui/AdminUi";
import { ContentEditorForm } from "@/components/cms/editor/ContentEditorForm";
import { getCmsPage, listRevisions } from "@/server/services/cms-wp/content.service";
import type { CmsSeoFields } from "@/lib/cms/wp-types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCmsPagePage({ params }: PageProps) {
  const { id } = await params;
  const page = await getCmsPage(id);
  if (!page) notFound();
  const revisions = await listRevisions("PAGE", id);

  return (
    <>
      <PageHeader
        title={`Edit: ${page.title}`}
        subtitle={`${revisions.length} revision(s) saved · slug /${page.slug}`}
      />
      <ContentEditorForm
        mode="page"
        apiBase="/api/v1/admin/cms/pages"
        initial={{
          id: page.id,
          title: page.title,
          slug: page.slug,
          excerpt: page.excerpt ?? "",
          contentHtml: page.contentHtml ?? "",
          content: page.content,
          featuredImage: page.featuredImage ?? "",
          status: page.status,
          scheduledAt: page.scheduledAt ? page.scheduledAt.toISOString().slice(0, 16) : "",
          seo: (page.seo as CmsSeoFields) ?? {},
        }}
      />
    </>
  );
}
