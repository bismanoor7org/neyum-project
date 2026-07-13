"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, MapPin, Search, Star } from "lucide-react";
import {
  getBookingDestination,
  searchBookingDestinations,
} from "@/lib/booking/destinations";
import { loadRecentSearches } from "@/lib/booking/storage";
import type { BookingDestination, RecentSearch } from "@/lib/booking/types";
import {
  BookingFieldShell,
  BookingPopover,
  type BookingFieldVariant,
} from "@/components/booking/BookingFieldShell";
import { cn } from "@/lib/utils";

interface BookingDestinationFieldProps {
  label: string;
  placeholder: string;
  value: { slug: string; title: string } | null;
  onChange: (dest: { slug: string; title: string }) => void;
  error?: string;
  variant?: BookingFieldVariant;
}

export function BookingDestinationField({
  label,
  placeholder,
  value,
  onChange,
  error,
  variant = "dark",
}: BookingDestinationFieldProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<RecentSearch[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) setRecent(loadRecentSearches().filter((r) => r.tab === "stay"));
  }, [open]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const suggestions = searchBookingDestinations(query, 8);
  const popular = query.trim() ? [] : suggestions.filter((d) => d.popular);
  const filtered = query.trim() ? suggestions : [];

  const pick = (d: BookingDestination | RecentSearch) => {
    const slug = "destinationSlug" in d ? d.destinationSlug : d.slug;
    const title = "destinationTitle" in d ? d.destinationTitle : d.title;
    onChange({ slug, title });
    setQuery("");
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className="relative">
      <BookingFieldShell
        label={label}
        value={value?.title ?? ""}
        placeholder={placeholder}
        icon={MapPin}
        open={open}
        onClick={() => setOpen((o) => !o)}
        error={error}
        variant={variant}
      />

      {open && (
        <BookingPopover
          variant={variant}
          className={variant === "hero-inline" ? "bottom-[calc(100%+8px)] top-auto" : undefined}
        >
          <div
            className={cn(
              "flex items-center gap-2 rounded-lg border px-3 py-2",
              variant === "light" || variant === "hero-inline"
                ? "border-navy/10 bg-cream/60"
                : "border-white/12 bg-white/5",
            )}
          >
            <Search className="h-3.5 w-3.5 text-gold/80" strokeWidth={1.5} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Fiji destinations…"
              className={cn(
                "w-full bg-transparent text-sm focus:outline-none",
                variant === "light" || variant === "hero-inline"
                  ? "text-navy/90 placeholder:text-navy/40"
                  : "text-white/90 placeholder:text-white/40",
              )}
              autoFocus
            />
          </div>

          <div className="booking-scroll mt-3 max-h-52 overflow-y-auto pr-1">
            {!query.trim() && recent.length > 0 && (
              <SuggestionGroup title="Recent searches" variant={variant}>
                {recent.map((r) => (
                  <SuggestionRow
                    key={r.id}
                    icon={Clock}
                    title={r.destinationTitle}
                    onClick={() => pick(r)}
                    variant={variant}
                  />
                ))}
              </SuggestionGroup>
            )}

            {!query.trim() && popular.length > 0 && (
              <SuggestionGroup title="Popular destinations" variant={variant}>
                {popular.map((d) => (
                  <SuggestionRow
                    key={d.slug}
                    icon={Star}
                    title={d.title}
                    subtitle={d.tagline}
                    popular
                    onClick={() => pick(d)}
                    variant={variant}
                  />
                ))}
              </SuggestionGroup>
            )}

            {query.trim() && filtered.length > 0 && (
              <SuggestionGroup title="Suggestions" variant={variant}>
                {filtered.map((d) => (
                  <SuggestionRow
                    key={d.slug}
                    icon={MapPin}
                    title={d.title}
                    subtitle={d.tagline}
                    popular={d.popular}
                    onClick={() => pick(d)}
                    variant={variant}
                  />
                ))}
              </SuggestionGroup>
            )}

            {query.trim() && filtered.length === 0 && (
              <p
                className={cn(
                  "px-2 py-3 text-center text-xs",
                  variant === "light" || variant === "hero-inline" ? "text-navy/45" : "text-white/45",
                )}
              >
                No destinations found — try Nadi, Denarau, or Mamanuca
              </p>
            )}
          </div>
        </BookingPopover>
      )}
    </div>
  );
}

function SuggestionGroup({
  title,
  children,
  variant = "dark",
}: {
  title: string;
  children: React.ReactNode;
  variant?: BookingFieldVariant;
}) {
  return (
    <div className="mb-2 last:mb-0">
      <p
        className={cn(
          "px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider",
          variant === "light" || variant === "hero-inline" ? "text-navy/40" : "text-white/40",
        )}
      >
        {title}
      </p>
      {children}
    </div>
  );
}

function SuggestionRow({
  icon: Icon,
  title,
  subtitle,
  popular,
  onClick,
  variant = "dark",
}: {
  icon: typeof MapPin;
  title: string;
  subtitle?: string;
  popular?: boolean;
  onClick: () => void;
  variant?: BookingFieldVariant;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-colors",
        variant === "light" || variant === "hero-inline" ? "hover:bg-gold/[0.08]" : "hover:bg-white/8",
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0 text-gold/80" strokeWidth={1.5} />
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "block text-sm font-medium",
            variant === "light" || variant === "hero-inline" ? "text-navy/90" : "text-white/90",
          )}
        >
          {title}
        </span>
        {subtitle && (
          <span
            className={cn(
              "block truncate text-[11px]",
              variant === "light" || variant === "hero-inline" ? "text-navy/45" : "text-white/45",
            )}
          >
            {subtitle}
          </span>
        )}
      </span>
      {popular && (
        <span className="shrink-0 text-[9px] font-semibold uppercase tracking-wider text-gold/80">
          Popular
        </span>
      )}
    </button>
  );
}

export function resolveDestinationTitle(slug: string | null): string | null {
  if (!slug) return null;
  return getBookingDestination(slug)?.title ?? slug.replace(/-/g, " ");
}
