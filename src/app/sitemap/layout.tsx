import type { Metadata } from "next";
import { staticPageSeo } from "@/lib/seo/pages";

export const metadata: Metadata = staticPageSeo.sitemap;

export default function SitemapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
