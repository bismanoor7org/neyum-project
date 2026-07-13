import { PageHeader } from "@/components/admin/ui/AdminUi";
import { HomepageSectionForm } from "@/components/cms/forms/HomepageSectionForm";

interface PageProps {
  searchParams: Promise<{ preset?: string }>;
}

export default async function NewHomepageSectionPage({ searchParams }: PageProps) {
  const { preset } = await searchParams;
  return (
    <>
      <PageHeader
        title="New homepage section"
        subtitle="Add a block to the homepage builder — hero, featured content, or CTAs."
      />
      <HomepageSectionForm presetKey={preset} />
    </>
  );
}
