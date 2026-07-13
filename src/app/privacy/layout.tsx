import type { Metadata } from "next";
import { staticPageSeo } from "@/lib/seo/pages";

export const metadata: Metadata = staticPageSeo.privacy;

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
