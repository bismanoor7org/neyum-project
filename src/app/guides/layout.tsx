import type { Metadata } from "next";
import { GuidesJsonLd } from "@/components/seo/GuidesJsonLd";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/json-ld";
import { staticPageSeo } from "@/lib/seo/pages";

export const metadata: Metadata = staticPageSeo.guides;

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Travel Guides", path: "/guides" },
        ])}
      />
      <GuidesJsonLd />
      {children}
    </>
  );
}
