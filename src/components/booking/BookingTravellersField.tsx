"use client";

import { useEffect, useRef, useState } from "react";
import { Minus, Plus, Users } from "lucide-react";
import type { TravellerCounts } from "@/lib/booking/types";
import { BookingFieldShell, BookingPopover, type BookingFieldVariant } from "@/components/booking/BookingFieldShell";
import { cn } from "@/lib/utils";

interface BookingTravellersFieldProps {
  label: string;
  placeholder: string;
  value: TravellerCounts;
  onChange: (value: TravellerCounts) => void;
  showRooms?: boolean;
  error?: string;
  variant?: BookingFieldVariant;
}

function formatTravellersDisplay(
  value: TravellerCounts,
  showRooms: boolean,
  variant: BookingFieldVariant,
): string {
  const total = value.adults + value.children + value.infants;
  const hasMinors = value.children > 0 || value.infants > 0;

  if (variant === "hero-inline") {
    const party = hasMinors
      ? `${total} Traveler${total === 1 ? "" : "s"}`
      : `${value.adults} Adult${value.adults === 1 ? "" : "s"}`;

    if (showRooms) {
      return `${party} · ${value.rooms} Room${value.rooms === 1 ? "" : "s"}`;
    }
    return party;
  }

  const guestParts = [
    `${value.adults} Adult${value.adults === 1 ? "" : "s"}`,
    ...(value.children > 0
      ? [`${value.children} Child${value.children === 1 ? "" : "ren"}`]
      : []),
    ...(value.infants > 0
      ? [`${value.infants} Infant${value.infants === 1 ? "" : "s"}`]
      : []),
  ];

  if (showRooms) {
    return `${guestParts.join(", ")} · ${value.rooms} Room${value.rooms === 1 ? "" : "s"}`;
  }
  return guestParts.join(", ");
}

export function BookingTravellersField({
  label,
  placeholder,
  value,
  onChange,
  showRooms = true,
  error,
  variant = "dark",
}: BookingTravellersFieldProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const total = value.adults + value.children + value.infants;
  const display =
    total > 0
      ? formatTravellersDisplay(value, showRooms, variant)
      : "";

  const update = (patch: Partial<TravellerCounts>) => {
    onChange({ ...value, ...patch });
  };

  const isLight = variant === "light" || variant === "hero-inline";

  return (
    <div ref={wrapRef} className="relative">
      <BookingFieldShell
        label={label}
        value={display}
        placeholder={placeholder}
        icon={Users}
        open={open}
        onClick={() => setOpen((o) => !o)}
        error={error}
        variant={variant}
      />

      {open && (
        <BookingPopover variant={variant} className="bottom-[calc(100%+8px)] top-auto">
          <CounterRow
            label="Adults"
            hint="Ages 13+"
            value={value.adults}
            min={1}
            max={9}
            onChange={(adults) => update({ adults })}
            variant={variant}
          />
          <CounterRow
            label="Children"
            hint="Ages 2–12"
            value={value.children}
            min={0}
            max={8}
            onChange={(children) => update({ children })}
            variant={variant}
          />
          <CounterRow
            label="Infants"
            hint="Under 2"
            value={value.infants}
            min={0}
            max={4}
            onChange={(infants) => update({ infants })}
            variant={variant}
          />
          {showRooms && (
            <CounterRow
              label="Rooms"
              hint="Separate rooms"
              value={value.rooms}
              min={1}
              max={5}
              onChange={(rooms) => update({ rooms })}
              variant={variant}
            />
          )}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-3 w-full rounded-full bg-gold py-2.5 text-sm font-semibold text-navy transition-all hover:brightness-105"
          >
            Done
          </button>
        </BookingPopover>
      )}
    </div>
  );
}

function CounterRow({
  label,
  hint,
  value,
  min,
  max,
  onChange,
  variant = "dark",
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
  variant?: BookingFieldVariant;
}) {
  const isLight = variant === "light" || variant === "hero-inline";

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 border-b py-2.5 last:border-0",
        isLight ? "border-navy/8" : "border-white/8",
      )}
    >
      <div className="min-w-0">
        <p className={cn("text-sm font-medium", isLight ? "text-navy/90" : "text-white/90")}>
          {label}
        </p>
        <p className={cn("text-[11px]", isLight ? "text-navy/45" : "text-white/45")}>{hint}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2.5">
        <button
          type="button"
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full border transition-colors disabled:opacity-30",
            isLight
              ? "border-navy/12 text-navy/60 hover:border-gold/40 hover:text-navy"
              : "border-white/15 text-white/70 hover:border-gold/40 hover:text-white",
          )}
          aria-label={`Decrease ${label}`}
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span
          className={cn(
            "w-6 text-center text-sm font-semibold tabular-nums",
            isLight ? "text-navy" : "text-white",
          )}
        >
          {value}
        </span>
        <button
          type="button"
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full border transition-colors disabled:opacity-30",
            isLight
              ? "border-navy/12 text-navy/60 hover:border-gold/40 hover:text-navy"
              : "border-white/15 text-white/70 hover:border-gold/40 hover:text-white",
          )}
          aria-label={`Increase ${label}`}
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
