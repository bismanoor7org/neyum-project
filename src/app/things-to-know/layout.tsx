import type { Metadata } from "next";
import { staticPageSeo } from "@/lib/seo/pages";

export const metadata: Metadata = staticPageSeo.thingsToKnow;

export default function ThingsToKnowLayout({ children }: { children: React.ReactNode }) {
  return children;
}
