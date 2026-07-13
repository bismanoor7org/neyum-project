"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { GuideTabsSection } from "@/components/ui/GuideTabs";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/shared";
import { useT } from "@/components/providers/LocaleProvider";
import { images } from "@/lib/images";
import { ds } from "@/lib/design-system";

const itineraryKeys = [
  { titleKey: "islandParadiseTitle", descKey: "islandParadiseDesc", durationKey: "days7", regionKey: "regionMamanucaYasawa", image: images.snorkel },
  { titleKey: "coralCoastTitle", descKey: "coralCoastDesc", durationKey: "days5", regionKey: "regionCoralCoast", image: images.coralCoast },
  { titleKey: "luxuryEscapeTitle", descKey: "luxuryEscapeDesc", durationKey: "days10", regionKey: "regionDenarauMamanuca", image: images.luxury },
  { titleKey: "familyFunTitle", descKey: "familyFunDesc", durationKey: "days8", regionKey: "regionDenarauCoral", image: images.family },
  { titleKey: "honeymoonTitle", descKey: "honeymoonDesc", durationKey: "days6", regionKey: "regionYasawa", image: images.romance },
  { titleKey: "cultureTitle", descKey: "cultureDesc", durationKey: "days5", regionKey: "regionVitiLevu", image: images.culture },
] as const;

export default function ItinerariesPage() {
  const t = useT();

  const itineraries = useMemo(
    () =>
      itineraryKeys.map((item) => ({
        title: t.itineraries[item.titleKey],
        description: t.itineraries[item.descKey],
        duration: t.itineraries[item.durationKey],
        region: t.itineraries[item.regionKey],
        image: item.image,
      })),
    [t],
  );

  return (
    <PageLayout activeHref="/itineraries" stickyCta >
      <GuideTabsSection activeHref="/itineraries" />

      <Section compact className="pb-16 pt-5" decor={false}>
        <Container className={ds.grid3}>
          {itineraries.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group overflow-hidden rounded-2xl border border-foreground/6 bg-white shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
            >
              <Link href="/contact">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="33vw"
                  />
                  <div className="gradient-card-overlay absolute inset-0 opacity-50" />
                </div>
                <div className="p-6 lg:p-7">
                  <h2 className="font-serif text-xl text-navy transition-colors group-hover:text-teal">
                    {item.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground/65">
                    {item.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-4 text-xs font-medium text-foreground/50">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-gold" /> {item.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-gold" /> {item.region}
                    </span>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-transform group-hover:translate-x-1">
                    {t.pages.viewItinerary}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </Container>

        <div className="mt-14 text-center">
          <Button href="/contact" variant="outline-gold">
            {t.pages.loadMoreItineraries}
          </Button>
        </div>
      </Section>
    </PageLayout>
  );
}
