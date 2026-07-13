"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Globe2, Headphones, Sparkles } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import {
  Container,
  CTABanner,
  PageHero,
  Section,
  SplitFeature,
} from "@/components/shared";
import { useT } from "@/components/providers/LocaleProvider";
import { images } from "@/lib/images";
import { ABOUT_VIDEO } from "@/lib/videos";
import { ds } from "@/lib/design-system";
import { cn } from "@/lib/utils";

const PILLARS = [
  { icon: Globe2, key: "p1" as const },
  { icon: Sparkles, key: "p2" as const },
  { icon: Headphones, key: "p3" as const },
  { icon: Award, key: "p4" as const },
] as const;

export default function AboutPage() {
  const t = useT();

  return (
    <PageLayout activeHref="/about" stickyCta >
      <PageHero
        image={images.heroHome}
        eyebrow={t.about.eyebrow}
        title={t.about.title}
        subtitle={t.about.p1.slice(0, 120) + "…"}
        breadcrumbs={[
          { label: t.common.home, href: "/" },
          { label: t.nav.about },
        ]}
      />

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl space-y-6 text-[15px] leading-[1.85] text-foreground/70">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>
          </div>
        </Container>
      </Section>

      <SplitFeature
        image={images.storyKayak}
        imageAlt="Fiji lagoon experience"
        eyebrow={t.home.storyEyebrow}
        title={t.home.storyTitle}
        description={t.home.storyDesc}
        cta={{ label: t.home.storyCta, href: "/places-to-go" }}
        video={ABOUT_VIDEO}
      />

      <Section variant="cream-alt">
        <Container>
          <p className="mb-10 text-center eyebrow-gold">{t.trustBar.title}</p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map(({ icon: Icon }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-foreground/6 bg-white p-7 text-center shadow-[var(--shadow-card)]"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 bg-gold/8">
                  <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                </div>
                <p className="text-sm leading-relaxed text-foreground/65">
                  {i === 0 ? t.about.p1.slice(0, 80) + "…" : t.trustBar.expertDesc}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/contact" className={cn(ds.btnBase, ds.btnGold, "inline-flex px-10")}>
              {t.about.cta}
            </Link>
          </div>
        </Container>
      </Section>

      <CTABanner
        image={images.luxury}
        title={t.luxuryCta.title}
        description={t.luxuryCta.subtitle}
        ctaLabel={t.luxuryCta.primary}
        ctaHref="/contact"
      />
    </PageLayout>
  );
}
