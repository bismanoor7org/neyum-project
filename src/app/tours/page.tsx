import type { Metadata } from "next";
import { ThingsToDoIndexClient } from "@/components/things-to-do/ThingsToDoIndexClient";
import { staticPageSeo } from "@/lib/seo/pages";

export const metadata: Metadata = staticPageSeo.tours;

export default function ToursIndexPage() {
  return <ThingsToDoIndexClient />;
}
