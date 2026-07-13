import { organizationSchema, websiteSchema } from "@/lib/seo/json-ld";
import { JsonLd } from "./JsonLd";

/** Sitewide Organization + TravelAgency + WebSite schema */
export function SiteJsonLd() {
  return <JsonLd data={[organizationSchema(), websiteSchema()]} />;
}
