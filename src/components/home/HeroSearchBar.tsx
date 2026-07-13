"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Loader2, Search } from "lucide-react";
import { motion } from "framer-motion";
import {
  BookingDestinationField,
  resolveDestinationTitle,
} from "@/components/booking/BookingDestinationField";
import { BookingTravellersField } from "@/components/booking/BookingTravellersField";
import { BookingPopover } from "@/components/booking/BookingFieldShell";
import { useT } from "@/components/providers/LocaleProvider";
import { homeEase } from "@/components/home/home-motion";
import {
  formatDisplayDate,
  getCalendarGrid,
  getDayMeta,
  isPastDate,
} from "@/lib/booking/calendar";
import {
  addRecentSearch,
  buildSearchUrl,
  loadBookingDraft,
  saveBookingDraft,
} from "@/lib/booking/storage";
import type { BookingDraft, ValidationErrors } from "@/lib/booking/types";
import { DEFAULT_BOOKING_DRAFT } from "@/lib/booking/types";
import {
  firstValidationMessage,
  hasValidationErrors,
  validateBookingDraft,
} from "@/lib/booking/validate";
import { cn } from "@/lib/utils";

function toIso(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function HeroDateCell({
  label,
  value,
  placeholder,
  active,
  onClick,
}: {
  label: string;
  value: string;
  placeholder: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={active}
      className={cn(
        "hero-search-cell group flex w-full items-center gap-3 px-4 py-4 text-left transition-colors sm:px-5 sm:py-[1.125rem]",
        "hover:bg-navy/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/15",
        active && "bg-navy/[0.04]",
      )}
    >
      <Calendar className="h-[18px] w-[18px] shrink-0 text-navy/45" strokeWidth={1.35} />
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-semibold leading-none text-navy">{label}</span>
        <span
          className={cn(
            "mt-1 block truncate text-[13px] leading-snug",
            value ? "font-medium text-navy" : "text-navy/45",
          )}
        >
          {value || placeholder}
        </span>
      </span>
    </button>
  );
}

function HeroDatePopover({
  checkIn,
  checkOut,
  selecting,
  onSelect,
}: {
  checkIn: string | null;
  checkOut: string | null;
  selecting: "in" | "out";
  onSelect: (checkIn: string | null, checkOut: string | null) => void;
}) {
  const [viewYear, setViewYear] = useState(() => new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth());

  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  const handleDayClick = (date: Date) => {
    const iso = toIso(date);
    if (isPastDate(iso)) return;

    if (selecting === "in" || !checkIn || (checkIn && checkOut)) {
      onSelect(iso, null);
      return;
    }

    if (iso <= checkIn) {
      onSelect(iso, null);
      return;
    }

    onSelect(checkIn, iso);
  };

  return (
    <BookingPopover variant="hero-inline" className="left-0 right-auto min-w-[18rem] sm:min-w-[20rem]">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            if (viewMonth === 0) {
              setViewMonth(11);
              setViewYear((y) => y - 1);
            } else setViewMonth((m) => m - 1);
          }}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-navy/10 text-navy/50 transition-colors hover:border-gold/30 hover:bg-gold/[0.06] hover:text-navy"
          aria-label="Previous month"
        >
          ‹
        </button>
        <p className="font-serif text-sm tracking-wide text-navy">{monthLabel}</p>
        <button
          type="button"
          onClick={() => {
            if (viewMonth === 11) {
              setViewMonth(0);
              setViewYear((y) => y + 1);
            } else setViewMonth((m) => m + 1);
          }}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-navy/10 text-navy/50 transition-colors hover:border-gold/30 hover:bg-gold/[0.06] hover:text-navy"
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <span
            key={d}
            className="flex h-6 items-center justify-center text-[9px] font-semibold uppercase tracking-[0.16em] text-navy/40"
          >
            {d}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {getCalendarGrid(viewYear, viewMonth).map((date, i) => {
          if (!date) {
            return <span key={`e-${i}`} className="h-10" aria-hidden />;
          }
          const iso = toIso(date);
          const meta = getDayMeta(date);
          const disabled = isPastDate(iso);
          const isStart = checkIn === iso;
          const isEnd = checkOut === iso;
          const isEndpoint = isStart || isEnd;
          const hasRange = Boolean(checkIn && checkOut);
          const inRange = hasRange && iso > checkIn! && iso < checkOut!;

          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              onClick={() => handleDayClick(date)}
              className={cn(
                "relative flex h-10 items-center justify-center text-[13px] transition-colors",
                disabled && "cursor-not-allowed text-navy/20",
                !disabled && !isEndpoint && !inRange && "text-navy/75 hover:bg-navy/[0.05]",
                inRange && "bg-gold/14 text-navy",
                isEndpoint && "bg-navy font-semibold text-white",
                meta.insights.includes("peak") && !isEndpoint && "font-medium",
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </BookingPopover>
  );
}

/** Horizontal hero search bar — destination, dates, guests */
export function HeroSearchBar() {
  const t = useT();
  const router = useRouter();
  const heroSearch = "searchWhereTo" in t.hero ? t.hero : null;
  const searchLabels = {
    whereTo: heroSearch?.searchWhereTo ?? t.booking.whereTo,
    destination: heroSearch?.searchDestinationPlaceholder ?? t.booking.selectDestination,
    checkIn: heroSearch?.searchCheckIn ?? "Check in",
    checkOut: heroSearch?.searchCheckOut ?? "Check out",
    travelers: heroSearch?.searchTravelers ?? t.booking.travellers,
    guests: heroSearch?.searchGuestsPlaceholder ?? t.booking.travellersPlaceholder,
    addDates: heroSearch?.searchAddDates ?? t.booking.addDates,
  };
  const barRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState<BookingDraft>(DEFAULT_BOOKING_DRAFT);
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [dateOpen, setDateOpen] = useState(false);
  const [dateSelecting, setDateSelecting] = useState<"in" | "out">("in");

  useEffect(() => {
    const saved = loadBookingDraft();
    if (saved.destinationSlug && !saved.destinationTitle) {
      saved.destinationTitle = resolveDestinationTitle(saved.destinationSlug);
    }
    setDraft({ ...saved, tab: "stay" });
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveBookingDraft(draft);
  }, [draft, hydrated]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dateRef.current?.contains(e.target as Node)) setDateOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const updateDraft = useCallback((patch: Partial<BookingDraft>) => {
    setDraft((prev) => ({ ...prev, ...patch }));
    setErrors({});
  }, []);

  const openCheckIn = () => {
    setDateSelecting("in");
    setDateOpen(true);
  };

  const openCheckOut = () => {
    setDateSelecting("out");
    setDateOpen(true);
  };

  const handleDateSelect = (checkIn: string | null, checkOut: string | null) => {
    updateDraft({ checkIn, checkOut });
    if (checkIn && !checkOut) {
      setDateSelecting("out");
      return;
    }
    if (checkIn && checkOut) setDateOpen(false);
  };

  const handleSearch = async () => {
    const validation = validateBookingDraft({ ...draft, tab: "stay" });
    setErrors(validation);

    if (hasValidationErrors(validation)) return;

    setLoading(true);

    if (draft.destinationSlug && draft.destinationTitle) {
      addRecentSearch({
        tab: "stay",
        destinationSlug: draft.destinationSlug,
        destinationTitle: draft.destinationTitle,
      });
    }

    const url = buildSearchUrl({
      tab: "stay",
      destination: draft.destinationSlug!,
      checkin: draft.checkIn!,
      checkout: draft.checkOut!,
      adults: draft.travellers.adults,
      children: draft.travellers.children,
      infants: draft.travellers.infants,
      rooms: draft.travellers.rooms,
    });

    await new Promise((r) => setTimeout(r, 350));
    router.push(url);
  };

  if (!hydrated) {
    return (
      <div
        className="hero-search-bar mx-auto max-w-[72rem] animate-pulse"
        aria-hidden
      >
        <div className="h-[4.5rem] rounded-2xl bg-white/80" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.85, ease: homeEase }}
      className="hero-search-bar-wrap relative z-20 mx-auto w-full max-w-[72rem] px-6 lg:px-8"
    >
      <div ref={barRef} className="hero-search-bar">
        <div className="hero-search-bar__fields">
          <div className="hero-search-bar__cell hero-search-bar__cell--wide">
            <BookingDestinationField
              variant="hero-inline"
              label={searchLabels.whereTo}
              placeholder={searchLabels.destination}
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
          </div>

          <div ref={dateRef} className="hero-search-bar__cell hero-search-bar__cell--dates relative flex">
            <div className="min-w-0 flex-1">
              <HeroDateCell
                label={searchLabels.checkIn}
                value={formatDisplayDate(draft.checkIn)}
                placeholder={searchLabels.addDates}
                active={dateOpen && dateSelecting === "in"}
                onClick={openCheckIn}
              />
            </div>
            <div className="hero-search-bar__divider hidden sm:block" aria-hidden />
            <div className="min-w-0 flex-1">
              <HeroDateCell
                label={searchLabels.checkOut}
                value={formatDisplayDate(draft.checkOut)}
                placeholder={searchLabels.addDates}
                active={dateOpen && dateSelecting === "out"}
                onClick={openCheckOut}
              />
            </div>
            {dateOpen && (
              <div className="absolute bottom-[calc(100%+8px)] left-0 right-0 top-auto z-50 sm:left-auto sm:min-w-[20rem]">
                <HeroDatePopover
                  checkIn={draft.checkIn}
                  checkOut={draft.checkOut}
                  selecting={dateSelecting}
                  onSelect={handleDateSelect}
                />
              </div>
            )}
            {errors.dates && (
              <p className="absolute -bottom-5 left-4 text-[11px] text-red-600/80">{errors.dates}</p>
            )}
          </div>

          <div className="hero-search-bar__cell">
            <BookingTravellersField
              variant="hero-inline"
              label={searchLabels.travelers}
              placeholder={searchLabels.guests}
              value={draft.travellers}
              onChange={(travellers) => updateDraft({ travellers })}
              error={errors.travellers}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleSearch}
          disabled={loading}
          className="hero-search-bar__submit shrink-0"
          aria-label={t.common.search}
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
          ) : (
            <Search className="h-5 w-5" strokeWidth={2} aria-hidden />
          )}
        </button>
      </div>

      {firstValidationMessage(errors) && !errors.destination && !errors.dates && !errors.travellers && (
        <p className="mt-2 text-center text-[11px] text-red-600/80">
          {firstValidationMessage(errors)}
        </p>
      )}
    </motion.div>
  );
}
