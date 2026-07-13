"use client";

import { useEffect, useRef, useState } from "react";
import { Wallet } from "lucide-react";
import type { JourneyBudget } from "@/lib/journey/types";
import { BookingFieldShell, BookingPopover } from "@/components/booking/BookingFieldShell";

interface JourneyBudgetFieldProps {
  label: string;
  placeholder: string;
  value: JourneyBudget | null;
  options: Record<JourneyBudget, string>;
  onChange: (value: JourneyBudget) => void;
  error?: string;
}

export function JourneyBudgetField({
  label,
  placeholder,
  value,
  options,
  onChange,
  error,
}: JourneyBudgetFieldProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const display = value ? options[value] : "";

  return (
    <div ref={wrapRef} className="relative">
      <BookingFieldShell
        variant="light"
        label={label}
        value={display}
        placeholder={placeholder}
        icon={Wallet}
        open={open}
        onClick={() => setOpen((o) => !o)}
        error={error}
      />

      {open && (
        <BookingPopover variant="light">
          <div className="space-y-1">
            {(Object.entries(options) as [JourneyBudget, string][]).map(([key, optionLabel]) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  onChange(key);
                  setOpen(false);
                }}
                className="flex w-full rounded-xl px-3 py-3 text-left text-sm text-navy/85 transition-all duration-300 hover:bg-gold/[0.08] hover:text-navy"
              >
                {optionLabel}
              </button>
            ))}
          </div>
        </BookingPopover>
      )}
    </div>
  );
}
