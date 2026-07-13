import { ToolsHubClient } from "@/components/tools/ToolsHubClient";
import { toolsHubMetadata } from "@/lib/tools/seo";

export const metadata = toolsHubMetadata();

export default function ToolsPage() {
  return <ToolsHubClient />;
}
