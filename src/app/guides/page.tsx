import { getPublishedGuides } from "@/server/services/public-content.service";
import { GuidesHubClient } from "./GuidesHubClient";

export const dynamic = "force-dynamic";

export default async function GuidesHubPage() {
  const guides = await getPublishedGuides();
  return <GuidesHubClient guides={guides} />;
}
