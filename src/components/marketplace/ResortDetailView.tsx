"use client";

import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import {
  ContentBlock,
  InquiryCTA,
  RelatedCards,
} from "@/components/marketplace/DetailSections";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { localizeResort } from "@/lib/i18n/content";
import { Container, Section } from "@/components/shared";
import type { Resort } from "@/lib/content/types";
import { CMS_ROUTES } from "@/lib/cms/public-routes";
import { ds } from "@/lib/design-system";
import { cn } from "@/lib/utils";

export function ResortDetailView({
  resort,
  relatedResorts = [],
}: {
  resort: Resort;
  relatedResorts?: Resort[];
}) {
  const { locale } = useLocale();
  const t = useT();
  const stay = localizeResort(resort, locale);

  const related = relatedResorts.map((r) => {
    const loc = localizeResort(r, locale);
    return {
      title: loc.title,
      href: CMS_ROUTES.stays.detail(loc.slug),
      image: loc.heroImage,
    };
  });

  return (
    <>
      <Section variant="cream-compact" decor={false}>
        <Container>
          <header className="text-center">
            <nav className="mb-6 flex flex-wrap items-center justify-center gap-2 text-xs text-foreground/50">
              {[
                { label: t.common.home, href: "/" },
                { label: t.pages.staysTitle, href: CMS_ROUTES.stays.index },
                { label: stay.title, href: CMS_ROUTES.stays.detail(stay.slug) },
              ].map((crumb, i) => (
                <span key={crumb.href} className="inline-flex items-center gap-2">
                  {i > 0 && <span className="text-foreground/30">/</span>}
                  <Link href={crumb.href} className="transition-colors hover:text-gold">
                    {crumb.label}
                  </Link>
                </span>
              ))}
            </nav>

            <h1 className="mx-auto max-w-3xl font-serif text-[2.35rem] leading-[1.08] tracking-[-0.03em] text-navy sm:text-[2.65rem] md:text-[3.15rem]">
              {stay.title}
            </h1>

            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-4 py-2 text-sm text-foreground/70 shadow-sm">
                <MapPin className="h-3.5 w-3.5 text-gold" />
                <strong className="font-medium text-foreground/50">{t.detail.location}:</strong>{" "}
                {stay.location}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-4 py-2 text-sm text-foreground/70 shadow-sm">
                <MapPin className="h-3.5 w-3.5 text-gold" />
                <strong className="font-medium text-foreground/50">{t.detail.fromPrice}:</strong>{" "}
                {stay.priceFrom}
                {t.detail.perNight}
              </span>
            </div>

            <Link
              href="/contact"
              className={cn(ds.btnBase, ds.btnGold, "mt-8 inline-flex gap-2 px-9")}
            >
              {t.detail.checkAvailability}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </header>
        </Container>
      </Section>

      <Section compact>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[15px] leading-[1.85] text-foreground/70">{stay.overview}</p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            <ContentBlock title={t.detail.amenities} items={stay.amenities} />
            <ContentBlock title={t.detail.signatureExperiences} items={stay.experiences} />
          </div>

          {related.length > 0 && (
            <div className="mt-20">
              <RelatedCards title={t.detail.similarStays} items={related} centered />
            </div>
          )}

          <div className="mt-20">
            <InquiryCTA title={t.detail.reserveStay} />
          </div>
        </Container>
      </Section>
    </>
  );
}
