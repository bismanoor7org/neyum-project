"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { searchExperienceTypes } from "@/lib/booking/destinations";
import { BookingFieldShell, BookingPopover, type BookingFieldVariant } from "@/components/booking/BookingFieldShell";
import { cn } from "@/lib/utils";

interface BookingTextSuggestFieldProps {
  label: string;
  placeholder: string;
  value: string | null;
  onChange: (value: string) => void;
  searchFn: (query: string, limit?: number) => string[];
  icon?: typeof Sparkles;
  error?: string;
  variant?: BookingFieldVariant;
}

export function BookingTextSuggestField({
  label,
  placeholder,
  value,
  onChange,
  searchFn,
  icon = Sparkles,
  error,
  variant = "dark",
}: BookingTextSuggestFieldProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value ?? "");
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value ?? "");
  }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const suggestions = searchFn(query, 8);

  const pick = (item: string) => {
    onChange(item);
    setQuery(item);
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className="relative">
      <BookingFieldShell
        label={label}
        value={value ?? ""}
        placeholder={placeholder}
        icon={icon}
        open={open}
        onClick={() => setOpen((o) => !o)}
        error={error}
        variant={variant}
      />

      {open && (
        <BookingPopover variant={variant}>
          <div
            className={cn(
              "flex items-center gap-2 rounded-lg border px-3 py-2",
              variant === "light"
                ? "border-navy/10 bg-cream/60"
                : "border-white/12 bg-white/5",
            )}
          >
            <Search className="h-3.5 w-3.5 text-gold/80" strokeWidth={1.5} />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (e.target.value.trim()) onChange(e.target.value.trim());
              }}
              placeholder={placeholder}
              className={cn(
                "w-full bg-transparent text-sm focus:outline-none",
                variant === "light"
                  ? "text-navy/90 placeholder:text-navy/40"
                  : "text-white/90 placeholder:text-white/40",
              )}
              autoFocus
            />
          </div>
          <div className="booking-scroll mt-2 max-h-44 overflow-y-auto pr-1">
            {suggestions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => pick(item)}
                className={cn(
                  "flex w-full rounded-lg px-2 py-2 text-left text-sm transition-colors",
                  variant === "light"
                    ? "text-navy/85 hover:bg-gold/[0.08]"
                    : "text-white/85 hover:bg-white/8",
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </BookingPopover>
      )}
    </div>
  );
}
