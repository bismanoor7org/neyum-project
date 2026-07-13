"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarRange, ChevronLeft, ChevronRight } from "lucide-react";
import {
  CALENDAR_LEGEND,
  formatDateRange,
  getCalendarGrid,
  getDayMeta,
  isPastDate,
} from "@/lib/booking/calendar";
import { BookingFieldShell, BookingPopover, type BookingFieldVariant } from "@/components/booking/BookingFieldShell";
import { cn } from "@/lib/utils";

interface BookingDateFieldProps {
  label: string;
  placeholder: string;
  checkIn: string | null;
  checkOut: string | null;
  onChange: (checkIn: string | null, checkOut: string | null) => void;
  error?: string;
  variant?: BookingFieldVariant;
}

export function BookingDateField({
  label,
  placeholder,
  checkIn,
  checkOut,
  onChange,
  error,
  variant = "dark",
}: BookingDateFieldProps) {
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(() => new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth());
  const [selecting, setSelecting] = useState<"in" | "out">("in");
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const display = formatDateRange(checkIn, checkOut) || "";

  const handleDayClick = (date: Date) => {
    const iso = toIso(date);
    if (isPastDate(iso)) return;

    if (selecting === "in" || !checkIn || (checkIn && checkOut)) {
      onChange(iso, null);
      setSelecting("out");
      return;
    }

    if (iso <= checkIn) {
      onChange(iso, null);
      setSelecting("out");
      return;
    }

    onChange(checkIn, iso);
    setSelecting("in");
    setOpen(false);
  };

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  const isLight = variant === "light";

  return (
    <div ref={wrapRef} className="relative">
      <BookingFieldShell
        label={label}
        value={display}
        placeholder={placeholder}
        icon={CalendarRange}
        open={open}
        onClick={() => setOpen((o) => !o)}
        error={error}
        variant={variant}
      />

      {open && (
        <BookingPopover variant={variant} className="bottom-[calc(100%+8px)] top-auto p-4 sm:min-w-0">
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={prevMonth}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border transition-colors",
                isLight
                  ? "border-navy/10 text-navy/50 hover:border-gold/30 hover:bg-gold/[0.06] hover:text-navy"
                  : "border-white/10 text-white/55 hover:border-gold/30 hover:bg-white/6 hover:text-white",
              )}
              aria-label="Previous month"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <p
              className={cn(
                "font-serif text-sm tracking-wide",
                isLight ? "text-navy" : "text-white",
              )}
            >
              {monthLabel}
            </p>
            <button
              type="button"
              onClick={nextMonth}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border transition-colors",
                isLight
                  ? "border-navy/10 text-navy/50 hover:border-gold/30 hover:bg-gold/[0.06] hover:text-navy"
                  : "border-white/10 text-white/55 hover:border-gold/30 hover:bg-white/6 hover:text-white",
              )}
              aria-label="Next month"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-7">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <span
                key={d}
                className={cn(
                  "flex h-6 items-center justify-center text-[9px] font-semibold uppercase tracking-[0.16em]",
                  isLight ? "text-navy/40" : "text-white/45",
                )}
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
                <div
                  key={iso}
                  className={cn(
                    "relative flex h-10 items-center justify-center",
                    hasRange && inRange && "before:absolute before:inset-y-[0.45rem] before:inset-x-0 before:bg-gold/14",
                    hasRange &&
                      isStart &&
                      !isEnd &&
                      "before:absolute before:inset-y-[0.45rem] before:left-1/2 before:right-0 before:rounded-l-full before:bg-gold/14",
                    hasRange &&
                      isEnd &&
                      !isStart &&
                      "before:absolute before:inset-y-[0.45rem] before:left-0 before:right-1/2 before:rounded-r-full before:bg-gold/14",
                  )}
                >
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() => handleDayClick(date)}
                    title={meta.label}
                    className={cn(
                      "relative z-10 flex h-8 w-8 items-center justify-center text-xs font-medium leading-none transition-all duration-200",
                      disabled &&
                        (isLight ? "cursor-not-allowed text-navy/25" : "cursor-not-allowed text-white/32"),
                      !disabled &&
                        !isEndpoint &&
                        !inRange &&
                        (isLight
                          ? "rounded-full text-navy/70 hover:bg-navy/[0.06] hover:text-navy"
                          : "rounded-full text-white/72 hover:bg-white/8 hover:text-white"),
                      inRange && !isEndpoint && (isLight ? "text-navy/90" : "text-white/92"),
                      isEndpoint &&
                        "rounded-full bg-gold font-semibold text-navy shadow-[0_2px_8px_rgba(212,175,55,0.32)] hover:bg-gold",
                    )}
                  >
                    {date.getDate()}
                  </button>
                  {meta.insights.length > 0 && !disabled && !isEndpoint && (
                    <span className="pointer-events-none absolute bottom-0.5 left-1/2 z-10 flex -translate-x-1/2 gap-0.5">
                      {meta.insights.slice(0, 2).map((insight) => (
                        <span
                          key={insight}
                          className={cn(
                            "h-0.5 w-0.5 shrink-0 rounded-full",
                            insight === "best-season" && "bg-teal/90",
                            insight === "public-holiday" && "bg-gold",
                            insight === "peak" && "bg-white/55",
                            insight === "low-price" && "bg-emerald-400/90",
                          )}
                        />
                      ))}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div
            className={cn(
              "mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-t pt-2.5",
              isLight ? "border-navy/8" : "border-white/10",
            )}
          >
            {CALENDAR_LEGEND.map(({ label: legLabel, color }) => (
              <span
                key={legLabel}
                className={cn(
                  "inline-flex items-center gap-1.5 text-[10px]",
                  isLight ? "text-navy/45" : "text-white/50",
                )}
              >
                <span className={cn("h-1 w-1 shrink-0 rounded-full", color)} />
                {legLabel}
              </span>
            ))}
          </div>
        </BookingPopover>
      )}
    </div>
  );
}

function toIso(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
