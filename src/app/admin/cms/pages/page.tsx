"use client";

import Link from "next/link";
import { CmsContentList } from "@/components/cms/list/CmsContentList";
import { AdminButton, PageHeader } from "@/components/admin/ui/AdminUi";

export default function CmsPagesPage() {
  return (
    <div>
      <PageHeader
        title="Pages"
        subtitle="Classic editor + visual page builder. Frontend design stays unchanged."
        actions={
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/cms/pages/new">
              <AdminButton variant="secondary">Rich text page</AdminButton>
            </Link>
            <Link href="/admin/cms/pages/builder">
              <AdminButton>Visual builder</AdminButton>
            </Link>
          </div>
        }
      />
      <CmsContentList
        title=""
        subtitle=""
        apiBase="/api/v1/admin/cms/pages"
        createHref="/admin/cms/pages/builder"
        editHref={(id) => `/admin/cms/pages/${id}/builder`}
        entity="page"
      />
    </div>
  );
}
