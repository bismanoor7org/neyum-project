import { PageLayout } from "@/components/layout/PageLayout";
import { FijiExploreMapClient } from "@/components/map/FijiExploreMapClient";

export default function ExploreMapPage() {
  return (
    <PageLayout activeHref="/explore-map" >
      <FijiExploreMapClient />
    </PageLayout>
  );
}
