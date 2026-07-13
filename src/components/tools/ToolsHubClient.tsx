"use client";

import Link from "next/link";
import { ChevronRight, ClipboardList } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { useLocale } from "@/components/providers/LocaleProvider";
import { TOOLS_HREF, TOOLS_NAV_DROPDOWN } from "@/lib/nav/tools-nav";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/json-ld";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";

export function ToolsHubClient() {
  const { t } = useLocale();

  const items = TOOLS_NAV_DROPDOWN.map((item) => ({
    href: item.href,
    label: t.nav[item.labelKey],
    description: t.nav[item.descriptionKey],
    iconVariant: item.icon === "ai-badge" ? ("ai" as const) : ("default" as const),
  }));

  return (
    <PageLayout activeHref={TOOLS_HREF}>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Travel Tools", path: TOOLS_HREF },
          ]),
          webPageSchema({
            name: "Travel Tools",
            description:
              "Premium Fiji travel tools — visa, time, weather, currency, and trip planning.",
            path: TOOLS_HREF,
          }),
        ]}
      />
      <PageHero
        variant="plain"
        eyebrow="Travel Tools"
        title="Plan Smarter for Fiji"
        subtitle="Visa intelligence, local time, weather, currency, and trip planning — curated tools for discerning travellers."
        align="center"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools" },
        ]}
      />

      <section className={cn(ds.section, "bg-cream")}>
        <div className={cn(ds.container, "max-w-4xl")}>
          <ul className="grid list-none gap-3 sm:grid-cols-2">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-start gap-3 rounded-2xl border border-navy/8 bg-white/80 px-4 py-4 transition-[border-color,box-shadow] duration-200 hover:border-gold/35 hover:shadow-md"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy/5 text-navy/70 group-hover:bg-gold/10 group-hover:text-gold">
                    <ClipboardList className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-medium text-navy group-hover:text-teal">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block text-[13px] leading-snug text-navy/55">
                      {item.description}
                    </span>
                  </span>
                  <ChevronRight
                    className="mt-1 h-4 w-4 shrink-0 text-navy/25 transition-colors group-hover:text-gold"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageLayout>
  );
}
