import type { Metadata } from "next";
import { staticPageSeo } from "@/lib/seo/pages";

export const metadata: Metadata = staticPageSeo.itineraries;

export default function ItinerariesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
