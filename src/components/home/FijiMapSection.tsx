"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/shared";
import { FijiInteractiveMap } from "@/components/home/FijiInteractiveMap";
import { homeEase, homeStagger, homeStaggerItem } from "@/components/home/home-motion";
import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { destinations, getDestination } from "@/lib/content/destinations";
import { FIJI_GLOBE_DESTINATIONS } from "@/lib/fiji-globe-data";
import { localizeDestination } from "@/lib/i18n/content";
import { cn } from "@/lib/utils";

export function FijiMapSection() {
  const t = useT();
  const { locale } = useLocale();
  const [active, setActive] = useState(FIJI_GLOBE_DESTINATIONS[0].slug);

  const activeContent = getDestination(active);
  const activeGlobe = FIJI_GLOBE_DESTINATIONS.find((d) => d.slug === active);
  const localized = activeContent
    ? localizeDestination(activeContent, locale)
    : null;

  const handleSelect = useCallback((slug: string) => setActive(slug), []);

  const cardTitle = localized?.title ?? activeGlobe?.title ?? active;
  const cardTagline = localized?.tagline ?? activeGlobe?.tagline ?? "";
  const cardOverview =
    localized?.overview ?? activeGlobe?.overview ?? "";
  const cardImage =
    activeContent?.cardImage ?? activeGlobe?.image ?? "/hero-luxury.png";
  const cardHighlights =
    localized?.highlights ?? activeGlobe?.highlights ?? [];

  return (
    <Section variant="cream" decor={false} id="explore-map" reveal={false}>
      <Container>
        <SectionHeader
          title={t.fijiMap.title}
          subtitle={t.fijiMap.subtitle}
          align="center"
          size="compact"
          action={{ label: `${t.fijiMap.fullMap} →`, href: "/explore-map" }}
        />

        <motion.div
          variants={homeStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mb-6 flex flex-wrap justify-center gap-2 lg:mb-8"
        >
          {FIJI_GLOBE_DESTINATIONS.map((d) => {
            const loc = getDestination(d.slug);
            const label = loc
              ? localizeDestination(loc, locale).title
              : d.title;
            return (
              <motion.button
                key={d.slug}
                variants={homeStaggerItem}
                type="button"
                onClick={() => handleSelect(d.slug)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-300",
                  active === d.slug
                    ? "bg-gold text-navy shadow-[0_4px_16px_rgba(212,175,55,0.35)]"
                    : "border border-navy/12 bg-[var(--card-surface)] text-navy/70 hover:border-gold/40 hover:text-navy",
                )}
              >
                {label}
              </motion.button>
            );
          })}
        </motion.div>

        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="relative isolate h-[380px] overflow-hidden rounded-3xl border border-navy/[0.08] shadow-[var(--shadow-editorial)] sm:h-[440px] lg:h-[520px]">
              <FijiInteractiveMap
                active={active}
                onSelect={handleSelect}
                className="h-full w-full rounded-3xl"
              />
            </div>
          </div>

          <div className="flex flex-col lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.45, ease: homeEase }}
                className="flex flex-1 flex-col overflow-hidden rounded-3xl border border-navy/[0.05] bg-[var(--card-elevated)] shadow-[var(--shadow-card)] transition-shadow duration-500 hover:shadow-[var(--shadow-card-hover)]"
              >
                <div className="relative h-52 shrink-0 overflow-hidden sm:h-56">
                  <Image
                    src={cardImage}
                    alt={cardTitle}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 35vw"
                  />
                  <div className="gradient-card-overlay absolute inset-0" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                      {cardTagline}
                    </p>
                    <h3 className="mt-1 font-serif text-2xl text-white lg:text-[1.65rem]">
                      {cardTitle}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 lg:p-7">
                  <p className="flex-1 text-sm leading-relaxed text-foreground/70">
                    {cardOverview.slice(0, 200)}…
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {cardHighlights.slice(0, 3).map((h) => (
                      <span
                        key={h}
                        className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[11px] font-medium text-gold"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={
                      activeContent
                        ? `/places-to-go/${active}`
                        : "/explore-map"
                    }
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-all hover:gap-3"
                  >
                    <MapPin className="h-4 w-4" />
                    {t.fijiMap.exploreDestination}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  );
}
