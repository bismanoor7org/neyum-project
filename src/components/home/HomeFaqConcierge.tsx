"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Search } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/shared";
import { useT } from "@/components/providers/LocaleProvider";
import type { FAQItem } from "@/lib/content/types";
import { siteEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

type FaqHubItem = FAQItem & {
  id?: string;
  category?: string | null;
};

function FaqRow({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqHubItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-navy/[0.06] last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="group flex w-full items-center justify-between gap-6 py-5 text-left md:py-6"
        aria-expanded={isOpen}
      >
        <span className="font-medium leading-snug text-navy transition-colors group-hover:text-navy/80 md:text-[15px]">
          {item.question}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-foreground/35 transition-transform duration-300 ease-out",
            isOpen && "rotate-180 text-gold",
          )}
          strokeWidth={1.75}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: siteEase }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-[1.75] text-foreground/60 md:pb-6 md:pr-10">
              {item.answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function HomeFaqConcierge({
  items: dbItems,
  section,
}: {
  items?: FaqHubItem[];
  section?: { title?: string; subtitle?: string };
}) {
  const t = useT();
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const allItems: FaqHubItem[] = useMemo(() => {
    if (dbItems && dbItems.length > 0) return dbItems;
    return [
      {
        id: "fb-1",
        question: t.home.faqCurrencyQ,
        answer: t.home.faqCurrencyA,
      },
      {
        id: "fb-2",
        question: t.home.faqVisaQ,
        answer: t.home.faqVisaA,
      },
      {
        id: "fb-3",
        question: t.home.faqInsuranceQ,
        answer: t.home.faqInsuranceA,
      },
      {
        id: "fb-4",
        question: t.home.faqCustomQ,
        answer: t.home.faqCustomA,
      },
      {
        id: "fb-5",
        question: t.home.faqHub.fallbackTransportQ,
        answer: t.home.faqHub.fallbackTransportA,
      },
      {
        id: "fb-6",
        question: t.home.faqHub.fallbackToursQ,
        answer: t.home.faqHub.fallbackToursA,
      },
    ];
  }, [dbItems, t]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allItems;
    return allItems.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q),
    );
  }, [allItems, query]);

  return (
    <Section variant="cream" decor={false} reveal={false} className="py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            title={section?.title ?? t.home.faqTitle}
            subtitle={section?.subtitle ?? t.home.faqSubtitle}
            align="center"
            size="compact"
            className="mb-12 md:mb-16"
          />

          <div className="relative mb-10">
            <Search
              className="pointer-events-none absolute left-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-foreground/30"
              strokeWidth={1.75}
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.home.faqHub.searchPlaceholder}
              className="w-full border-b border-navy/[0.08] bg-transparent py-2.5 pl-6 text-sm text-navy placeholder:text-foreground/35 focus:border-gold/40 focus:outline-none"
              aria-label={t.home.faqHub.searchPlaceholder}
            />
          </div>

          {filtered.length === 0 ? (
            <p className="py-8 text-center text-sm text-foreground/50">
              {t.home.faqHub.noResults}
            </p>
          ) : (
            <div className="rounded-2xl border border-navy/[0.06] bg-white/80 px-5 shadow-[0_1px_24px_rgba(26,39,68,0.04)] backdrop-blur-sm md:px-8">
              {filtered.map((item, i) => {
                const id = item.id ?? `faq-${i}`;
                return (
                  <FaqRow
                    key={id}
                    item={item}
                    isOpen={openId === id}
                    onToggle={() => setOpenId(openId === id ? null : id)}
                  />
                );
              })}
            </div>
          )}

          <div className="mt-12 flex justify-center md:mt-14">
            <Link
              href="/faq"
              className="group inline-flex items-center gap-2 text-sm font-medium text-navy/70 transition-colors hover:text-gold"
            >
              {t.common.fullFaq}
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={1.75}
              />
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/** @deprecated Use HomeFaqConcierge — kept for homepage dynamic import */
export const FAQPreview = HomeFaqConcierge;
