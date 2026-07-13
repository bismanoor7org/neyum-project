"use client";

import Link from "next/link";
import Image from "next/image";
import { PageLayout } from "@/components/layout/PageLayout";
import { Container, Section, SectionHeader } from "@/components/shared";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { CMS_ROUTES } from "@/lib/cms/public-routes";
import { localizeExperience } from "@/lib/i18n/content";
import type { Experience } from "@/lib/content/types";

type ToursIndexClientProps = {
  tours: Experience[];
};

export function ToursIndexClient({ tours }: ToursIndexClientProps) {
  const { locale } = useLocale();
  const t = useT();

  return (
    <PageLayout activeHref={CMS_ROUTES.tours.index} stickyCta>
      <Section variant="cream">
        <Container>
          <SectionHeader
            eyebrow={t.pages.experiencesEyebrow}
            title={t.pages.toursLuxuryTitle}
            subtitle={t.pages.toursCmsSubtitle}
            align="split"
            size="compact"
          />
          {tours.length === 0 ? (
            <p className="text-center text-sm text-foreground/55">
              {t.pages.toursEmpty}{" "}
              <Link href="/admin/cms/tours/new" className="text-gold underline">
                {t.pages.toursCmsLink}
              </Link>
              .
            </p>
          ) : (
            <ul className="grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tours.map((tour) => {
                const localized = localizeExperience(tour, locale);
                return (
                  <li key={tour.slug}>
                    <Link
                      href={CMS_ROUTES.tours.detail(tour.slug)}
                      className="group block overflow-hidden rounded-2xl border border-foreground/8 bg-white shadow-sm transition-shadow hover:shadow-md"
                    >
                      {localized.heroImage && (
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={localized.heroImage}
                            alt={localized.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <p className="text-xs font-medium uppercase tracking-wider text-gold">
                          {localized.category} · {localized.duration}
                        </p>
                        <h2 className="mt-1 font-serif text-xl text-navy">
                          {localized.title}
                        </h2>
                        <p className="mt-2 line-clamp-2 text-sm text-foreground/60">
                          {localized.overview}
                        </p>
                        <p className="mt-3 text-sm font-semibold text-navy">
                          {t.common.from} {localized.priceFrom}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Container>
      </Section>
    </PageLayout>
  );
}
