import type { Metadata } from "next";
import { staticPageSeo } from "@/lib/seo/pages";

export const metadata: Metadata = staticPageSeo.exploreMap;

export default function ExploreMapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
