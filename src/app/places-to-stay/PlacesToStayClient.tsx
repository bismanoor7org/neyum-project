"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Building2,
  Gem,
  Headphones,
  Home,
  Ship,
  Star,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PalmTreeDecor } from "@/components/shared/PalmTreeDecor";
import { ValueProps } from "@/components/sections/ValueProps";
import { Container, Section } from "@/components/shared";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { localizeResort } from "@/lib/i18n/content";
import type { Resort } from "@/lib/content/types";
import { CMS_ROUTES } from "@/lib/cms/public-routes";
import { images } from "@/lib/images";
import { ds } from "@/lib/design-system";
import { cn } from "@/lib/utils";

export function PlacesToStayClient({ resorts }: { resorts: Resort[] }) {
  const { locale } = useLocale();
  const t = useT();

  const categories = [
    {
      title: t.stays.catLuxuryTitle,
      description: t.stays.catLuxuryDesc,
      image: images.dealResort,
      href: CMS_ROUTES.stays.detail("likuliku-lagoon"),
      icon: Building2,
    },
    {
      title: t.stays.catVillasTitle,
      description: t.stays.catVillasDesc,
      image: images.denarau,
      href: CMS_ROUTES.stays.detail("hilton-fiji"),
      icon: Gem,
    },
    {
      title: t.stays.catIslandTitle,
      description: t.stays.catIslandDesc,
      image: images.luxury,
      href: CMS_ROUTES.stays.detail("tokoriki-island"),
      icon: Ship,
    },
    {
      title: t.stays.catOverwaterTitle,
      description: t.stays.catOverwaterDesc,
      image: images.dealOverwater,
      href: CMS_ROUTES.stays.detail("likuliku-lagoon"),
      icon: Home,
    },
  ];

  return (
    <PageLayout activeHref={CMS_ROUTES.stays.index} stickyCta>
      <Section variant="cream-compact" decor={false} className="relative overflow-hidden pb-12">
        <PalmTreeDecor side="right" />
        <Container>
          <header className="mb-14 text-center lg:mb-20">
            <div className="mx-auto max-w-3xl">
              <h1 className="font-serif text-[2.35rem] leading-[1.08] tracking-[-0.03em] text-navy sm:text-[2.65rem] md:text-[3.15rem] lg:text-[3.35rem]">
                {t.pages.staysTitle}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-[1.8] text-foreground/58 sm:text-base sm:leading-[1.85]">
                {t.pages.staysSubtitle}
              </p>
            </div>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={cat.href}
                  className="group block overflow-hidden rounded-3xl bg-white shadow-[0_2px_16px_rgba(8,43,75,0.06)] transition-shadow hover:shadow-[0_8px_28px_rgba(8,43,75,0.1)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy shadow-sm">
                      <cat.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-5">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-serif text-xl text-navy">{cat.title}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-foreground/65">
                        {cat.description}
                      </p>
                    </div>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream text-navy transition-colors group-hover:bg-gold group-hover:text-navy">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <Section compact>
        <Container>
          <h2 className={cn(ds.headingSection, "mb-8 text-center")}>{t.pages.featuredStays}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {resorts.map((resort) => {
              const stay = localizeResort(resort, locale);
              return (
                <Link
                  key={stay.slug}
                  href={CMS_ROUTES.stays.detail(stay.slug)}
                  className="group overflow-hidden rounded-2xl bg-white shadow-[0_2px_16px_rgba(8,43,75,0.06)] transition-shadow hover:shadow-[0_8px_28px_rgba(8,43,75,0.1)]"
                >
                  <div className="relative h-52">
                    <Image
                      src={stay.heroImage}
                      alt={stay.title}
                      fill
                      className="object-cover"
                      sizes="33vw"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-gold">{stay.location}</p>
                    <h3 className="mt-1 font-serif text-lg text-navy">{stay.title}</h3>
                    <p className="mt-2 line-clamp-2 text-xs text-foreground/60">{stay.overview}</p>
                    <p className="mt-3 text-sm font-semibold text-navy">
                      {t.common.from} {stay.priceFrom} {t.common.perNight}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      <ValueProps
        items={[
          {
            icon: Award,
            title: t.stays.valueHandpickedTitle,
            description: t.stays.valueHandpickedDesc,
          },
          {
            icon: Star,
            title: t.stays.valuePriceTitle,
            description: t.stays.valuePriceDesc,
          },
          {
            icon: Building2,
            title: t.stays.valueFlexibleTitle,
            description: t.stays.valueFlexibleDesc,
          },
          {
            icon: Headphones,
            title: t.stays.valueConciergeTitle,
            description: t.stays.valueConciergeDesc,
          },
        ]}
      />
    </PageLayout>
  );
}
