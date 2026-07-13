import { PageLayout } from "@/components/layout/PageLayout";
import { PremiumComingSoonPage } from "@/components/shared/PremiumComingSoonPage";
import { FijiVisaAssistant } from "@/components/visa/assistant/FijiVisaAssistant";
import { aiVisaAssistantMetadata, AI_VISA_ASSISTANT_FAQ } from "@/lib/visa/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/seo/json-ld";
import { isVisaComingSoon, VISA_COMING_SOON_PAGES } from "@/lib/visa/coming-soon";
import { TOOLS_HREF } from "@/lib/nav/tools-nav";

export const metadata = aiVisaAssistantMetadata();

export default function AiFijiVisaAssistantPage() {
  if (isVisaComingSoon("aiVisaAssistant")) {
    return <PremiumComingSoonPage config={VISA_COMING_SOON_PAGES.aiVisaAssistant} />;
  }

  const faq = faqSchema([...AI_VISA_ASSISTANT_FAQ]);

  return (
    <PageLayout activeHref={TOOLS_HREF} stickyCta heroOverlap>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tools", path: TOOLS_HREF },
            { name: "AI Fiji Visa Assistant", path: "/ai-fiji-visa-assistant" },
          ]),
          webPageSchema({
            name: "AI Fiji Visa Assistant",
            description: "Premium AI-powered Fiji visa consultant with readiness scoring and personalised checklists.",
            path: "/ai-fiji-visa-assistant",
          }),
          ...(faq ? [faq] : []),
        ]}
      />
      <FijiVisaAssistant variant="hub" />
    </PageLayout>
  );
}
