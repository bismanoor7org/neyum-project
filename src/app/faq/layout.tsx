import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchemaItems } from "@/lib/seo/faq-schema";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/json-ld";
import { staticPageSeo } from "@/lib/seo/pages";

export const metadata: Metadata = staticPageSeo.faq;

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Things to Know", path: "/things-to-know" },
            { name: "FAQ", path: "/faq" },
          ]),
          faqSchema(faqPageSchemaItems),
        ]}
      />
      {children}
    </>
  );
}
