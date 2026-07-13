import { TimezoneFinderClient } from "@/components/tools/timezone-finder/TimezoneFinderClient";
import { timezoneFinderMetadata } from "@/lib/tools/timezone-finder/seo";

export const metadata = timezoneFinderMetadata();

export default function TimezoneFinderPage() {
  return <TimezoneFinderClient />;
}
