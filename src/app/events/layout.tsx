import type { Metadata } from "next";
import { staticPageSeo } from "@/lib/seo/pages";

export const metadata: Metadata = staticPageSeo.events;

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
