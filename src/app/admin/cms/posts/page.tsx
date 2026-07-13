"use client";

import { CmsContentList } from "@/components/cms/list/CmsContentList";

export default function CmsPostsPage() {
  return (
    <CmsContentList
      title="Blog Posts"
      subtitle="Articles with categories, tags, featured image, SEO and scheduled publish."
      apiBase="/api/v1/admin/cms/posts"
      createHref="/admin/cms/posts/new"
      editHref={(id) => `/admin/cms/posts/${id}/edit`}
      entity="post"
    />
  );
}
