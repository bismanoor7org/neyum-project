import type { Metadata } from "next";
import { ThingsToDoJsonLd } from "@/components/seo/ThingsToDoJsonLd";
import { staticPageSeo } from "@/lib/seo/pages";

export const metadata: Metadata = staticPageSeo.thingsToDo;

export default function ThingsToDoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThingsToDoJsonLd />
      {children}
    </>
  );
}
