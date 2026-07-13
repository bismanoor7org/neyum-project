import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/ui/AdminUi";
import { ContentEditorForm } from "@/components/cms/editor/ContentEditorForm";
import {
  getCmsPost,
  listCategories,
  listRevisions,
  listTags,
} from "@/server/services/cms-wp/content.service";
import type { CmsSeoFields } from "@/lib/cms/wp-types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCmsPostPage({ params }: PageProps) {
  const { id } = await params;
  const [post, categories, tags, revisions] = await Promise.all([
    getCmsPost(id),
    listCategories(),
    listTags(),
    listRevisions("POST", id),
  ]);
  if (!post) notFound();

  return (
    <>
      <PageHeader
        title={`Edit: ${post.title}`}
        subtitle={`${revisions.length} revision(s) · ${post.readingTimeMin} min read`}
      />
      <ContentEditorForm
        mode="post"
        apiBase="/api/v1/admin/cms/posts"
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        tags={tags.map((t) => ({ id: t.id, name: t.name }))}
        initial={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? "",
          contentHtml: post.contentHtml ?? "",
          content: post.content,
          featuredImage: post.featuredImage ?? "",
          status: post.status,
          scheduledAt: post.scheduledAt ? post.scheduledAt.toISOString().slice(0, 16) : "",
          featured: post.featured,
          categoryId: post.categoryId ?? "",
          tagIds: post.tags.map((t) => t.tagId),
          seo: (post.seo as CmsSeoFields) ?? {},
        }}
      />
    </>
  );
}
