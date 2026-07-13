"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BedDouble, Loader2, Package, Sparkles } from "lucide-react";
import { BookingDateField } from "@/components/booking/BookingDateField";
import {
  BookingDestinationField,
  resolveDestinationTitle,
} from "@/components/booking/BookingDestinationField";
import { BookingTextSuggestField } from "@/components/booking/BookingTextSuggestField";
import { BookingTravellersField } from "@/components/booking/BookingTravellersField";
import { useT } from "@/components/providers/LocaleProvider";
import {
  searchExperienceTypes,
  searchPackageStyles,
} from "@/lib/booking/destinations";
import {
  addRecentSearch,
  buildSearchUrl,
  loadBookingDraft,
  saveBookingDraft,
} from "@/lib/booking/storage";
import type { BookingDraft, BookingTab, ValidationErrors } from "@/lib/booking/types";
import { DEFAULT_BOOKING_DRAFT } from "@/lib/booking/types";
import {
  firstValidationMessage,
  hasValidationErrors,
  validateBookingDraft,
} from "@/lib/booking/validate";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "stay", icon: BedDouble },
  { id: "experiences", icon: Sparkles },
  { id: "packages", icon: Package },
] as const;

type TabId = (typeof tabs)[number]["id"];

/** Solid luxury shell — avoids opacity utilities that fail to paint on cream pages */
const WIDGET_SHELL =
  "booking-widget relative z-[1] w-full max-w-md overflow-visible rounded-3xl border p-8 text-white lg:p-9";

export function BookingWidget({ className }: { className?: string }) {
  const t = useT();
  const router = useRouter();
  const [draft, setDraft] = useState<BookingDraft>(DEFAULT_BOOKING_DRAFT);
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const saved = loadBookingDraft();
    if (saved.destinationSlug && !saved.destinationTitle) {
      saved.destinationTitle = resolveDestinationTitle(saved.destinationSlug);
    }
    setDraft(saved);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveBookingDraft(draft);
  }, [draft, hydrated]);

  const updateDraft = useCallback((patch: Partial<BookingDraft>) => {
    setDraft((prev) => ({ ...prev, ...patch }));
    setErrors({});
    setSubmitError(null);
  }, []);

  const tabLabels: Record<TabId, string> = {
    stay: t.booking.stay,
    experiences: t.booking.experiences,
    packages: t.booking.packages,
  };

  const handleSearch = async () => {
    const validation = validateBookingDraft(draft);
    setErrors(validation);

    if (hasValidationErrors(validation)) {
      setSubmitError(firstValidationMessage(validation));
      return;
    }

    setLoading(true);
    setSubmitError(null);

    const destination =
      draft.tab === "stay"
        ? draft.destinationSlug!
        : draft.tab === "experiences"
          ? "fiji"
          : "fiji";

    if (draft.tab === "stay" && draft.destinationSlug && draft.destinationTitle) {
      addRecentSearch({
        tab: "stay",
        destinationSlug: draft.destinationSlug,
        destinationTitle: draft.destinationTitle,
      });
    }

    const url = buildSearchUrl({
      tab: draft.tab,
      destination,
      checkin: draft.checkIn!,
      checkout: draft.checkOut!,
      adults: draft.travellers.adults,
      children: draft.travellers.children,
      infants: draft.travellers.infants,
      rooms: draft.travellers.rooms,
      experience: draft.experienceType ?? undefined,
      package: draft.packageStyle ?? undefined,
    });

    await new Promise((r) => setTimeout(r, 450));
    router.push(url);
  };

  if (!hydrated) {
    return (
      <div
        className={cn(WIDGET_SHELL, className, "min-h-[440px] animate-pulse")}
        aria-hidden
      />
    );
  }

  return (
    <div className={cn(WIDGET_SHELL, className)}>
      <div className="booking-widget-glow pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
        aria-hidden
      />

      <div className="relative">
        <p className="eyebrow-gold">{t.booking.title}</p>
        <h2 className="mt-2.5 font-serif text-[1.75rem] leading-tight tracking-[-0.02em] text-white lg:text-[2rem]">
          {t.hero.planJourney}
        </h2>

        <div className="booking-widget-tabs mt-7 flex gap-1 rounded-full p-1">
          {tabs.map(({ id, icon: Icon }) => {
            const active = draft.tab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => updateDraft({ tab: id as BookingTab })}
                className={cn(
                  "booking-widget-tab inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2.5 text-xs font-semibold sm:text-[13px]",
                  active && "booking-widget-tab--active",
                )}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={1.25} />
                {tabLabels[id]}
              </button>
            );
          })}
        </div>

        <div className="mt-6 space-y-3.5">
          {draft.tab === "stay" && (
            <BookingDestinationField
              label={t.booking.whereTo}
              placeholder={t.booking.selectDestination}
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
          )}

          {draft.tab === "experiences" && (
            <BookingTextSuggestField
              label={t.booking.experienceType}
              placeholder={t.booking.experiencePlaceholder}
              value={draft.experienceType}
              onChange={(experienceType) => updateDraft({ experienceType })}
              searchFn={searchExperienceTypes}
              icon={Sparkles}
              error={errors.experience}
            />
          )}

          {draft.tab === "packages" && (
            <BookingTextSuggestField
              label={t.booking.packageStyle}
              placeholder={t.booking.packagePlaceholder}
              value={draft.packageStyle}
              onChange={(packageStyle) => updateDraft({ packageStyle })}
              searchFn={searchPackageStyles}
              icon={Package}
              error={errors.package}
            />
          )}

          <BookingDateField
            label={
              draft.tab === "experiences"
                ? t.booking.when
                : draft.tab === "packages"
                  ? t.booking.travelDates
                  : t.booking.checkInOut
            }
            placeholder={
              draft.tab === "experiences"
                ? t.booking.chooseDates
                : draft.tab === "packages"
                  ? t.booking.flexibleDates
                  : t.booking.addDates
            }
            checkIn={draft.checkIn}
            checkOut={draft.checkOut}
            onChange={(checkIn, checkOut) => updateDraft({ checkIn, checkOut })}
            error={errors.dates}
          />

          <BookingTravellersField
            label={draft.tab === "experiences" ? t.booking.groupSize : t.booking.travellers}
            placeholder={
              draft.tab === "experiences"
                ? t.booking.adultsPlaceholder
                : t.booking.travellersPlaceholder
            }
            value={draft.travellers}
            onChange={(travellers) => updateDraft({ travellers })}
            showRooms={draft.tab !== "experiences"}
            error={errors.travellers}
          />
        </div>

        {submitError && (
          <p className="mt-4 text-center text-[11px] text-red-300">{submitError}</p>
        )}

        <button
          type="button"
          onClick={handleSearch}
          disabled={loading}
          className="hero-cta-primary mt-7 flex w-full items-center justify-center gap-2 py-4 text-sm disabled:cursor-wait disabled:opacity-80"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
          ) : (
            t.booking.searchAvailability
          )}
        </button>

        <p className="mt-5 text-center text-[11px] tracking-wide text-white/55">
          {t.booking.guarantee}
        </p>
      </div>
    </div>
  );
}
