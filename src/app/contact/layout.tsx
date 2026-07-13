import type { Metadata } from "next";
import { staticPageSeo } from "@/lib/seo/pages";

export const metadata: Metadata = staticPageSeo.contact;

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
