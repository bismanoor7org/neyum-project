import { getDestinationsWithMarketplaceStats } from "@/server/services/destination-marketplace.service";
import { getDestinationsPageConfig } from "@/server/services/public-content.service";
import { PlacesToGoClient } from "@/app/places-to-go/PlacesToGoClient";
import { staticPageSeo } from "@/lib/seo/pages";

export const metadata = staticPageSeo.destinations;
export const dynamic = "force-dynamic";

export default async function DestinationsIndexPage() {
  const [destinations, pageCopy] = await Promise.all([
    getDestinationsWithMarketplaceStats(),
    getDestinationsPageConfig(),
  ]);
  return (
    <PlacesToGoClient destinations={destinations} basePath="/destinations" pageCopy={pageCopy} />
  );
}
