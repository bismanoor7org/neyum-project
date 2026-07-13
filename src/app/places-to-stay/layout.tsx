import type { Metadata } from "next";
import { staticPageSeo } from "@/lib/seo/pages";

export const metadata: Metadata = staticPageSeo.placesToStay;

export default function PlacesToStayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
