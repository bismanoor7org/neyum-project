import { getPublishedAccommodations } from "@/server/services/public-content.service";
import { PlacesToStayClient } from "./PlacesToStayClient";

export const dynamic = "force-dynamic";

export default async function PlacesToStayPage() {
  const resorts = await getPublishedAccommodations();
  return <PlacesToStayClient resorts={resorts} />;
}
