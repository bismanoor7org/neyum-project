import type { Metadata } from "next";
import { staticPageSeo } from "@/lib/seo/pages";

export const metadata: Metadata = staticPageSeo.tripPlanner;

export default function TripPlannerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
