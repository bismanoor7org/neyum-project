import { FijiTimeClient } from "@/components/tools/fiji-time/FijiTimeClient";
import { fijiTimeMetadata } from "@/lib/tools/fiji-time/seo";

export const metadata = fijiTimeMetadata();

export default function FijiTimePage() {
  return <FijiTimeClient />;
}
