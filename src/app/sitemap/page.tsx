"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Compass,
  HelpCircle,
  MapPin,
  Sparkles,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Container, PageHero, Section } from "@/components/shared";
import { useLocale } from "@/components/providers/LocaleProvider";
import { NAV_LINKS } from "@/lib/constants";
import { NAV_LABEL_KEYS } from "@/lib/i18n/messages";
import { destinations } from "@/lib/content/destinations";
import { images } from "@/lib/images";
import { ds } from "@/lib/design-system";
import { cn } from "@/lib/utils";

const extraLinks = [
  { href: "/guides", icon: BookOpen, key: "guides" as const },
  { href: "/about", icon: Compass, key: "about" as const },
  { href: "/contact", icon: Sparkles, key: "contact" as const },
  { href: "/faq", icon: HelpCircle, labelKey: "faq" as const },
  { href: "/events", icon: Sparkles, labelKey: "events" as const },
  { href: "/itineraries", icon: MapPin, labelKey: "itineraries" as const },
];

export default function SitemapPage() {
  const { t } = useLocale();

  const extraLabels: Record<string, string> = {
    "/faq": t.guideTabs.faq,
    "/events": t.guideTabs.events,
    "/itineraries": t.guideTabs.itineraries,
  };

  return (
    <PageLayout >
      <PageHero
        image={images.heroThingsToDo}
        eyebrow={t.sitemap.eyebrow}
        title={t.sitemap.title}
        breadcrumbs={[
          { label: t.common.home, href: "/" },
          { label: t.sitemap.title },
        ]}
        overlay="light"
        minHeight="min-h-[36vh] lg:min-h-[40vh]"
      />

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-foreground/6 bg-white p-7 shadow-[var(--shadow-card)]"
            >
              <h2 className={cn(ds.headingCard, "mb-5")}>{t.sitemap.explore}</h2>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between text-sm text-foreground/70 transition-colors hover:text-teal"
                    >
                      {t.nav[NAV_LABEL_KEYS[link.href]]}
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
                {extraLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between text-sm text-foreground/70 transition-colors hover:text-teal"
                    >
                      {"key" in link && link.key
                        ? t.nav[link.key]
                        : extraLabels[link.href]}
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="rounded-2xl border border-foreground/6 bg-white p-7 shadow-[var(--shadow-card)]"
            >
              <h2 className={cn(ds.headingCard, "mb-5")}>{t.nav.destinations}</h2>
              <ul className="space-y-3">
                {destinations.map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={`/places-to-go/${d.slug}`}
                      className="group flex items-center justify-between text-sm text-foreground/70 hover:text-teal"
                    >
                      {d.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 }}
              className="rounded-2xl border border-foreground/6 bg-white p-7 shadow-[var(--shadow-card)]"
            >
              <h2 className={cn(ds.headingCard, "mb-5")}>{t.sitemap.support}</h2>
              <ul className="space-y-3">
                {[
                  { href: "/login", label: t.nav.login },
                  { href: "/privacy", label: t.footer.privacy },
                  { href: "/contact", label: t.nav.contact },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between text-sm text-foreground/70 hover:text-teal"
                    >
                      {link.label}
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}
