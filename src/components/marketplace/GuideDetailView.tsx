"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  DetailHero,
  InquiryCTA,
  RelatedCards,
} from "@/components/marketplace/DetailSections";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { Container, Section } from "@/components/shared";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import type { Guide } from "@/lib/content/types";
import { guides } from "@/lib/content/guides";
import { localizeGuide } from "@/lib/i18n/content";
import { getGuideHeroAlt } from "@/lib/seo/content-meta";
import { ds } from "@/lib/design-system";
import { cn } from "@/lib/utils";

export function GuideDetailView({ guide: raw }: { guide: Guide }) {
  const t = useT();
  const { locale } = useLocale();
  const guide = localizeGuide(raw, locale);

  const related = raw.relatedSlugs
    .map((s) => guides.find((g) => g.slug === s))
    .filter(Boolean)
    .map((g) => {
      const loc = localizeGuide(g!, locale);
      return { title: loc.title, href: `/guides/${g!.slug}`, image: g!.heroImage };
    });

  return (
    <>
      <DetailHero
        title={guide.title}
        tagline={raw.category}
        image={raw.heroImage}
        imageAlt={getGuideHeroAlt(raw.slug, guide.title)}
        breadcrumb={[
          { label: t.common.home, href: "/" },
          { label: t.detail.travelGuides, href: "/guides" },
          { label: guide.title, href: `/guides/${raw.slug}` },
        ]}
        cta={{ label: t.detail.requestItinerary, href: "/contact" }}
      />

      <Section compact>
        <Container>
          <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-foreground/70">
            {raw.overview}
          </p>

          <div className="mt-14 space-y-8">
            {raw.sections.map((section, i) => (
              <motion.article
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-foreground/6 bg-white p-7 shadow-[var(--shadow-card)] lg:p-9"
              >
                <h2 className={cn(ds.headingCard, "text-xl")}>{section.title}</h2>
                <p className="mt-4 text-[15px] leading-[1.85] text-foreground/70">
                  {section.body}
                </p>
                {section.items && (
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 rounded-xl border border-gold/15 bg-gold/5 px-4 py-3 text-sm text-navy"
                      >
                        <span className="mt-2 h-1 w-3 shrink-0 rounded-full bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.article>
            ))}
          </div>

          <div className="mt-20">
            <h2 className={cn(ds.headingSection, "mb-8")}>{t.common.faqs}</h2>
            <FAQAccordion items={raw.faqs} columns={1} />
          </div>

          <div className="mt-20">
            <RelatedCards title={t.detail.relatedGuides} items={related} />
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/guides"
              className={cn(ds.linkGoldArrow, "inline-flex text-sm")}
            >
              {t.detail.viewAllGuides}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-20">
            <InquiryCTA />
          </div>
        </Container>
      </Section>
    </>
  );
}
