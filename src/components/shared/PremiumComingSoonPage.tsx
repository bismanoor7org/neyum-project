import { Sparkles } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/shared/PageHero";
import { NotifyMeField } from "@/components/shared/NotifyMeField";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/json-ld";
import type { ToolComingSoonConfig } from "@/lib/tools/coming-soon";
import type { VisaComingSoonConfig } from "@/lib/visa/coming-soon";
import { TOOLS_HREF } from "@/lib/nav/tools-nav";

interface PremiumComingSoonPageProps {
  config: VisaComingSoonConfig | ToolComingSoonConfig;
}

/** Intentional luxury placeholder — routes stay live with HTTP 200 and preserved SEO metadata. */
export function PremiumComingSoonPage({ config }: PremiumComingSoonPageProps) {
  return (
    <PageLayout activeHref={TOOLS_HREF} heroOverlap>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: config.jsonLdName, path: config.path },
          ]),
          webPageSchema({
            name: config.jsonLdName,
            description: config.jsonLdDescription,
            path: config.path,
          }),
        ]}
      />
      <PageHero
        image={config.heroImage}
        imageAlt={config.heroImageAlt}
        eyebrow={config.eyebrow}
        title={config.title}
        subtitle={config.description}
        align="center"
        overlay="strong"
        minHeight="min-h-[72vh] lg:min-h-[78vh]"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: config.jsonLdName },
        ]}
      >
        <div className="flex w-full max-w-2xl flex-col items-center gap-8">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-gold/45 bg-gold/15 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
            Coming Soon
          </span>

          <div className="flex w-full flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <NotifyMeField topic={config.notifyTopic} className="w-full sm:flex-1" />
            <Button
              href="/destinations"
              variant="outline-white"
              className="shrink-0 px-8 py-3.5 sm:w-auto"
            >
              Explore Destinations
            </Button>
          </div>
        </div>
      </PageHero>
    </PageLayout>
  );
}
