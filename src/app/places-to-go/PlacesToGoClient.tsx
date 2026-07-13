"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { DestinationMarketplaceCard } from "@/components/destinations/DestinationMarketplaceCard";
import { Container, Section } from "@/components/shared";
import { useT } from "@/components/providers/LocaleProvider";
import type { DestinationListingItem } from "@/lib/content/types";
import type { DestinationsPageConfig } from "@/lib/cms/types";
import { cn } from "@/lib/utils";

const TAB_KEYS = ["mainland", "islands"] as const;

export function PlacesToGoClient({
  destinations,
  basePath = "/destinations",
  pageCopy,
}: {
  destinations: DestinationListingItem[];
  basePath?: string;
  pageCopy?: DestinationsPageConfig | null;
}) {
  const t = useT();
  const [tab, setTab] = useState<"mainland" | "islands">("mainland");

  const mainlandDestinations = useMemo(
    () => destinations.filter((d) => d.region === "mainland"),
    [destinations],
  );
  const islandDestinations = useMemo(
    () => destinations.filter((d) => d.region === "islands"),
    [destinations],
  );
  const list = tab === "mainland" ? mainlandDestinations : islandDestinations;

  return (
    <PageLayout activeHref={basePath} stickyCta>
      <Section variant="cream-compact" decor={false}>
        <Container>
          <header className="mb-14 text-center lg:mb-20">
            <div className="mx-auto max-w-3xl">
              <p className="eyebrow-gold">
                {pageCopy?.eyebrow ?? t.pages.destinationsMarketplaceEyebrow}
              </p>
              <h1 className="mt-4 font-serif text-[2.35rem] leading-[1.08] tracking-[-0.03em] text-navy sm:text-[2.65rem] md:text-[3.15rem] lg:text-[3.35rem]">
                {pageCopy?.title ?? t.pages.destinationsMarketplaceTitle}
              </h1>
              <div className="mt-5 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-gold/50" aria-hidden />
                <Sparkles className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} aria-hidden />
                <span className="h-px w-10 bg-gold/50" aria-hidden />
              </div>
              <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-[1.8] text-foreground/58 sm:text-base sm:leading-[1.85]">
                {pageCopy?.subtitle ?? t.pages.destinationsMarketplaceSubtitle}
              </p>

              <div className="mt-8 flex justify-center md:mt-9">
                <div
                  className="inline-flex shrink-0 rounded-full border border-navy/[0.06] bg-white/80 p-1 shadow-[0_4px_24px_rgba(8,43,75,0.06)] backdrop-blur-md"
                  role="tablist"
                  aria-label="Destination region"
                >
                  {TAB_KEYS.map((tabKey) => {
                    const isActive = tab === tabKey;
                    return (
                      <button
                        key={tabKey}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setTab(tabKey)}
                        className={cn(
                          "rounded-full px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-all duration-300",
                          isActive
                            ? "bg-navy text-white shadow-[0_6px_20px_rgba(8,43,75,0.22)] ring-1 ring-gold/20"
                            : "text-navy/50 hover:text-navy",
                        )}
                      >
                        {tabKey === "mainland" ? t.pages.mainland : t.pages.islands}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </header>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:gap-7 xl:grid-cols-3"
            >
              {list.map((d, i) => (
                <motion.div
                  key={d.slug}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.35, ease: "easeOut" }}
                  className="h-full"
                >
                  <DestinationMarketplaceCard
                    destination={d}
                    href={`${basePath}/${d.slug}`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </Container>
      </Section>
    </PageLayout>
  );
}
