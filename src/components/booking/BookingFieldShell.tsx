"use client";

import type { LucideIcon } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type BookingFieldVariant = "dark" | "light" | "hero-inline";

interface BookingFieldShellProps {
  label: string;
  value: string;
  placeholder: string;
  icon: LucideIcon;
  open?: boolean;
  onClick: () => void;
  error?: string;
  variant?: BookingFieldVariant;
}

/** Preserves exact booking widget field styling */
export function BookingFieldShell({
  label,
  value,
  placeholder,
  icon: Icon,
  open,
  onClick,
  error,
  variant = "dark",
}: BookingFieldShellProps) {
  const hasValue = Boolean(value);
  const isLight = variant === "light";
  const isHeroInline = variant === "hero-inline";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onClick}
        aria-expanded={open}
        className={cn(
          "group flex w-full items-center text-left transition-all duration-300",
          isHeroInline
            ? [
                "hero-search-cell gap-3 px-4 py-4 sm:px-5 sm:py-[1.125rem]",
                "hover:bg-navy/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/15",
                open && "bg-navy/[0.04]",
              ]
            : [
                "gap-3.5 rounded-2xl border px-4 py-4 sm:px-5 sm:py-[1.125rem]",
                isLight
                  ? [
                      "journey-field border-navy/[0.08] bg-white/55 backdrop-blur-md",
                      "hover:border-gold/28 hover:bg-white/72 hover:shadow-[0_8px_32px_rgba(26,39,68,0.07)]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/35 focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
                      open && "border-gold/35 bg-white/80 shadow-[0_12px_40px_rgba(26,39,68,0.08)]",
                    ]
                  : [
                      "border-white/12 bg-[#0c3238]/70 hover:border-[#c5a44e]/35 hover:bg-[#0c3238]/90",
                      open && "border-[#c5a44e]/40 bg-[#0c3238]/95",
                    ],
              ],
          error && !isHeroInline && (isLight ? "border-red-400/60" : "border-red-400/50"),
        )}
      >
        <Icon
          className={cn(
            "shrink-0",
            isHeroInline ? "h-[18px] w-[18px] text-navy/45" : "hidden",
          )}
          strokeWidth={1.35}
        />
        {!isHeroInline ? (
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-500",
              isLight
                ? "border-gold/22 bg-gold/[0.08] group-hover:border-gold/35 group-hover:bg-gold/[0.12]"
                : "border-[#c5a44e]/30 bg-[#c5a44e]/15",
              (open || hasValue) &&
                (isLight
                  ? "border-gold/40 bg-gold/[0.14]"
                  : "border-[#c5a44e]/45 bg-[#c5a44e]/22"),
            )}
          >
            <Icon className="h-4 w-4 text-gold" strokeWidth={1.25} />
          </div>
        ) : null}
        <span className="min-w-0 flex-1">
          <span
            className={cn(
              "block font-semibold",
              isHeroInline
                ? "text-[13px] leading-none text-navy"
                : "text-[10px] font-bold uppercase tracking-[0.14em] text-gold/85",
            )}
          >
            {label}
          </span>
          <span
            className={cn(
              "mt-1 block truncate leading-snug",
              isHeroInline ? "text-[13px]" : "mt-0.5 text-[15px]",
              hasValue
                ? isHeroInline || isLight
                  ? "font-medium text-navy"
                  : "font-medium text-white"
                : isHeroInline || isLight
                  ? "text-navy/45"
                  : "text-white/60",
            )}
          >
            {value || placeholder}
          </span>
        </span>
        {!isHeroInline ? (
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 transition-transform duration-300",
              isLight ? "text-navy/30" : "text-white/35",
              open && "rotate-180 text-gold",
            )}
          />
        ) : null}
      </button>
      {error && (
        <p
          className={cn(
            "mt-1.5 px-1 text-[11px]",
            isLight ? "text-red-600/80" : "text-red-300",
          )}
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function BookingPopover({
  children,
  className,
  variant = "dark",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: BookingFieldVariant;
}) {
  return (
    <div
      className={cn(
        "absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-visible rounded-2xl border p-5",
        variant === "light" || variant === "hero-inline"
          ? "journey-popover border-navy/[0.08] bg-white/95 shadow-[0_24px_64px_rgba(26,39,68,0.12)] backdrop-blur-xl"
          : "border-[#c5a44e]/20 bg-[#062429] shadow-[0_24px_64px_rgba(0,0,0,0.45)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
