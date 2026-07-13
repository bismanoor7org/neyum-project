"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { BookingDateField } from "@/components/booking/BookingDateField";
import {
  BookingDestinationField,
  resolveDestinationTitle,
} from "@/components/booking/BookingDestinationField";
import { JourneyBudgetField } from "@/components/booking/JourneyBudgetField";
import { BookingTextSuggestField } from "@/components/booking/BookingTextSuggestField";
import { BookingTravellersField } from "@/components/booking/BookingTravellersField";
import { useT } from "@/components/providers/LocaleProvider";
import { searchExperienceTypes } from "@/lib/booking/destinations";
import { homeEase } from "@/components/home/home-motion";
import type { Messages } from "@/lib/i18n/messages";
import { cn } from "@/lib/utils";

import {
  DEFAULT_JOURNEY_DRAFT,
  type JourneyDraft,
} from "@/lib/journey/types";

const JOURNEY_DRAFT_KEY = "neyum-journey-draft";

type JourneyErrors = Partial<Record<"destination" | "dates", string>>;

function loadJourneyDraft(): JourneyDraft {
  if (typeof window === "undefined") return DEFAULT_JOURNEY_DRAFT;
  try {
    const raw = localStorage.getItem(JOURNEY_DRAFT_KEY);
    if (!raw) return DEFAULT_JOURNEY_DRAFT;
    const parsed = JSON.parse(raw) as Partial<JourneyDraft>;
    return {
      ...DEFAULT_JOURNEY_DRAFT,
      ...parsed,
      travellers: { ...DEFAULT_JOURNEY_DRAFT.travellers, ...parsed.travellers },
    };
  } catch {
    return DEFAULT_JOURNEY_DRAFT;
  }
}

function saveJourneyDraft(draft: JourneyDraft) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(JOURNEY_DRAFT_KEY, JSON.stringify(draft));
  } catch {
    /* ignore */
  }
}

function buildJourneyContactUrl(draft: JourneyDraft, message: string): string {
  const params = new URLSearchParams({ source: "journey" });
  if (draft.destinationSlug) params.set("destination", draft.destinationSlug);
  if (draft.checkIn) params.set("checkin", draft.checkIn);
  if (draft.checkOut) params.set("checkout", draft.checkOut);
  if (draft.budget) params.set("budget", draft.budget);
  if (draft.experienceType) params.set("experience", draft.experienceType);
  params.set("adults", String(draft.travellers.adults));
  params.set("children", String(draft.travellers.children));
  params.set("message", encodeURIComponent(message));
  return `/contact?${params.toString()}`;
}

function validateDraft(draft: JourneyDraft, t: Messages): JourneyErrors {
  const errors: JourneyErrors = {};
  if (!draft.destinationSlug) errors.destination = t.journeyPlanner.errors.destination;
  if (!draft.checkIn || !draft.checkOut) errors.dates = t.journeyPlanner.errors.dates;
  return errors;
}

export function JourneyPlanner({ className }: { className?: string }) {
  const t = useT();
  const router = useRouter();
  const [draft, setDraft] = useState<JourneyDraft>(DEFAULT_JOURNEY_DRAFT);
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<JourneyErrors>({});

  useEffect(() => {
    const saved = loadJourneyDraft();
    if (saved.destinationSlug && !saved.destinationTitle) {
      saved.destinationTitle = resolveDestinationTitle(saved.destinationSlug);
    }
    setDraft(saved);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveJourneyDraft(draft);
  }, [draft, hydrated]);

  const updateDraft = useCallback((patch: Partial<JourneyDraft>) => {
    setDraft((prev) => ({ ...prev, ...patch }));
    setErrors({});
  }, []);

  const buildEnquiryMessage = useCallback(() => {
    const parts: string[] = [t.journeyPlanner.enquiryIntro];
    if (draft.destinationTitle) {
      parts.push(`${t.journeyPlanner.destination}: ${draft.destinationTitle}`);
    }
    if (draft.checkIn && draft.checkOut) {
      parts.push(`${t.journeyPlanner.travelDates}: ${draft.checkIn} – ${draft.checkOut}`);
    }
    const guestCount =
      draft.travellers.adults +
      draft.travellers.children +
      draft.travellers.infants;
    parts.push(`${t.journeyPlanner.travelers}: ${guestCount}`);
    if (draft.budget) {
      const budgetLabel = t.journeyPlanner.budgetOptions[draft.budget];
      parts.push(`${t.journeyPlanner.budget}: ${budgetLabel}`);
    }
    if (draft.experienceType) {
      parts.push(`${t.journeyPlanner.experienceType}: ${draft.experienceType}`);
    }
    return parts.join("\n");
  }, [draft, t]);

  const handlePlan = async () => {
    const validation = validateDraft(draft, t);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setLoading(true);
    const url = buildJourneyContactUrl(draft, buildEnquiryMessage());
    await new Promise((r) => setTimeout(r, 400));
    router.push(url);
  };

  if (!hydrated) {
    return (
      <div
        className={cn("journey-planner min-h-[420px] animate-pulse rounded-[2rem]", className)}
        aria-hidden
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.9, ease: homeEase }}
      className={cn("journey-planner", className)}
    >
      <div className="journey-planner-glow pointer-events-none absolute inset-0 rounded-[2rem]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent"
        aria-hidden
      />

      <div className="relative grid gap-4 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-4">
        <BookingDestinationField
          variant="light"
          label={t.journeyPlanner.destination}
          placeholder={t.journeyPlanner.destinationPlaceholder}
          value={
            draft.destinationSlug && draft.destinationTitle
              ? { slug: draft.destinationSlug, title: draft.destinationTitle }
              : null
          }
          onChange={({ slug, title }) =>
            updateDraft({ destinationSlug: slug, destinationTitle: title })
          }
          error={errors.destination}
        />

        <BookingDateField
          variant="light"
          label={t.journeyPlanner.travelDates}
          placeholder={t.journeyPlanner.datesPlaceholder}
          checkIn={draft.checkIn}
          checkOut={draft.checkOut}
          onChange={(checkIn, checkOut) => updateDraft({ checkIn, checkOut })}
          error={errors.dates}
        />

        <BookingTravellersField
          variant="light"
          label={t.journeyPlanner.travelers}
          placeholder={t.journeyPlanner.travelersPlaceholder}
          value={draft.travellers}
          onChange={(travellers) => updateDraft({ travellers })}
          showRooms={false}
        />

        <JourneyBudgetField
          label={t.journeyPlanner.budget}
          placeholder={t.journeyPlanner.budgetPlaceholder}
          value={draft.budget}
          options={t.journeyPlanner.budgetOptions}
          onChange={(budget) => updateDraft({ budget })}
        />

        <div className="sm:col-span-2">
          <BookingTextSuggestField
            variant="light"
            label={t.journeyPlanner.experienceType}
            placeholder={t.journeyPlanner.experiencePlaceholder}
            value={draft.experienceType}
            onChange={(experienceType) => updateDraft({ experienceType })}
            searchFn={searchExperienceTypes}
            icon={Sparkles}
          />
        </div>
      </div>

      <div className="relative mt-8 flex flex-col gap-3 border-t border-navy/[0.06] pt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <button
          type="button"
          onClick={handlePlan}
          disabled={loading}
          className="journey-cta-primary inline-flex w-full items-center justify-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-semibold tracking-[0.02em] transition-all duration-500 disabled:cursor-wait disabled:opacity-80 sm:w-auto sm:min-w-[220px]"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
          ) : (
            <>
              {t.journeyPlanner.planCta}
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </>
          )}
        </button>

        <Link
          href="/contact"
          className="journey-cta-secondary inline-flex w-full items-center justify-center gap-2 rounded-full border px-8 py-4 text-[14px] font-medium tracking-[0.02em] transition-all duration-500 sm:w-auto"
        >
          {t.journeyPlanner.conciergeCta}
        </Link>
      </div>
    </motion.div>
  );
}
