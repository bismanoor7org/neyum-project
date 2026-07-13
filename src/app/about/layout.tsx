import type { Metadata } from "next";
import { staticPageSeo } from "@/lib/seo/pages";

export const metadata: Metadata = staticPageSeo.about;

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
