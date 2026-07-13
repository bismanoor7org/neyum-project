import type { Metadata } from "next";
import { staticPageSeo } from "@/lib/seo/pages";

export const metadata: Metadata = staticPageSeo.search;

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
