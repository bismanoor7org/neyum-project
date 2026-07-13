import { PageLayout } from "@/components/layout/PageLayout";
import { ExploreWorldClient } from "./ExploreWorldClient";
import type { ContinentSlug } from "@/lib/content/world/types";

interface ExplorePageProps {
  searchParams: Promise<{ continent?: string }>;
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const params = await searchParams;
  const continent = (params.continent as ContinentSlug) || null;

  return (
    <PageLayout>
      <ExploreWorldClient initialContinent={continent} />
    </PageLayout>
  );
}
