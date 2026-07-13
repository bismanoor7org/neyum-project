import { getPublishedFaqs } from "@/server/services/public-content.service";
import { FAQPageClient } from "./FAQPageClient";

export const dynamic = "force-dynamic";

export default async function FAQPage() {
  const dbFaqs = await getPublishedFaqs();
  return <FAQPageClient dbFaqs={dbFaqs} />;
}
