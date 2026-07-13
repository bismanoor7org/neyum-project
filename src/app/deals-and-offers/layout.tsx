import type { Metadata } from "next";
import { staticPageSeo } from "@/lib/seo/pages";

export const metadata: Metadata = staticPageSeo.deals;

export default function DealsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
