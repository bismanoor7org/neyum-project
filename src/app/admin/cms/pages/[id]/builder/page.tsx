import { notFound } from "next/navigation";
import { PageBuilderWorkspace } from "@/components/cms/builder/PageBuilderWorkspace";
import { getCmsPage } from "@/server/services/cms-wp/content.service";
import type { PageBuilderSection } from "@/lib/cms/page-builder";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPageBuilderPage({ params }: PageProps) {
  const { id } = await params;
  const page = await getCmsPage(id);
  if (!page) notFound();
  const content = (page.content ?? {}) as { sections?: PageBuilderSection[] };

  return (
    <PageBuilderWorkspace
      initial={{
        id: page.id,
        title: page.title,
        slug: page.slug,
        status: page.status,
        sections: content.sections ?? [],
        seo: (page.seo as Record<string, unknown>) ?? {},
      }}
    />
  );
}
