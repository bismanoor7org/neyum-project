import type { Metadata } from "next";
import { PlacesToGoJsonLd } from "@/components/seo/PlacesToGoJsonLd";
import { staticPageSeo } from "@/lib/seo/pages";

export const metadata: Metadata = staticPageSeo.placesToGo;

export default function PlacesToGoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PlacesToGoJsonLd />
      {children}
    </>
  );
}
