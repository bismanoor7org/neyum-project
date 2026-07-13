import type { Metadata } from "next";
import { staticPageSeo } from "@/lib/seo/pages";

export const metadata: Metadata = staticPageSeo.explore;

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
