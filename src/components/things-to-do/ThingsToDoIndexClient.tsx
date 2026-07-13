"use client";

import { useMemo, useState } from "react";
import { Compass, Shield, Ship, Sparkles } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { ValueProps } from "@/components/sections/ValueProps";
import { Container, FilterPills, Section } from "@/components/shared";
import { useT } from "@/components/providers/LocaleProvider";
import { CMS_ROUTES, legacyTourHref } from "@/lib/cms/public-routes";
import { CATEGORY_PAGE_CONFIG } from "@/lib/content/things-to-do-category-page";
import {
  THINGS_TO_DO_BY_FILTER,
  THINGS_TO_DO_FILTERS,
  type ThingsToDoExperience,
  type ThingsToDoFilterKey,
} from "@/lib/content/things-to-do-categories";
import { ExperienceEditorialCard } from "./ExperienceEditorialCard";
import { ExperiencePremiumCta } from "./ExperiencePremiumCta";

function mapExperience(exp: ThingsToDoExperience): ThingsToDoExperience {
  return { ...exp, href: legacyTourHref(exp.href) };
}

export function ThingsToDoIndexClient() {
  const t = useT();
  const [activeFilter, setActiveFilter] =
    useState<ThingsToDoFilterKey>("filterAdventure");

  const config = CATEGORY_PAGE_CONFIG[activeFilter];
  const experiences = useMemo(
    () => THINGS_TO_DO_BY_FILTER[activeFilter].map(mapExperience),
    [activeFilter],
  );

  const filterPills = useMemo(
    () =>
      THINGS_TO_DO_FILTERS.map((key) => ({
        key,
        label: t.experiences[key],
        active: key === activeFilter,
      })),
    [activeFilter, t],
  );

  const valueProps = [
    {
      icon: Compass,
      title: t.experiences.valueGuidesTitle,
      description: t.experiences.valueGuidesDesc,
    },
    {
      icon: Sparkles,
      title: t.experiences.valueCuratedTitle,
      description: t.experiences.valueCuratedDesc,
    },
    {
      icon: Ship,
      title: t.experiences.valueOceanTitle,
      description: t.experiences.valueOceanDesc,
    },
    {
      icon: Shield,
      title: t.experiences.valuePrivateTitle,
      description: t.experiences.valuePrivateDesc,
    },
  ];

  return (
    <PageLayout activeHref={CMS_ROUTES.tours.index} stickyCta>
      <div className="bg-white">
        <FilterPills
          items={filterPills.map(({ label, active }) => ({ label, active }))}
          barClassName="border-b border-foreground/10 bg-white pt-8"
          onSelect={(label) => {
            const match = filterPills.find((pill) => pill.label === label);
            if (match) setActiveFilter(match.key);
          }}
        />

        <Section variant="cream" decor={false} className="bg-white" reveal={false}>
          <Container className="space-y-10 lg:space-y-12">
            {experiences.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {experiences.map((experience, index) => (
                  <ExperienceEditorialCard
                    key={experience.href}
                    experience={experience}
                    cta={`${t.experiences.explorePrefix} →`}
                    index={index}
                  />
                ))}
              </div>
            ) : null}
          </Container>
        </Section>

        <ValueProps items={valueProps} />

        <ExperiencePremiumCta title={config.ctaTitle} subtitle={config.ctaSubtitle} />
      </div>
    </PageLayout>
  );
}
