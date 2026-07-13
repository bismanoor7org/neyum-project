"use client";

import { ArrowRight } from "lucide-react";
import { useT } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";

type EmailFieldVariant = "newsletter" | "footer" | "cinematic";

interface EmailFieldProps {
  placeholder?: string;
  variant?: EmailFieldVariant;
  className?: string;
}

/** Pill email input from Home newsletter bar + footer */
export function EmailField({
  placeholder,
  variant = "newsletter",
  className,
}: EmailFieldProps) {
  const t = useT();
  const resolvedPlaceholder = placeholder ?? t.common.emailPlaceholder;

  return (
    <div
      className={cn(
        variant === "newsletter" || variant === "cinematic"
          ? ds.emailPillDark
          : ds.emailPillFooter,
        variant === "cinematic" && "border-white/30 bg-white/12",
        className,
      )}
    >
      <input
        type="email"
        placeholder={resolvedPlaceholder}
        className={cn(ds.emailInput, variant === "cinematic" && "py-3.5 text-[15px]")}
      />
      <button
        type="button"
        className={cn(
          variant === "footer" ? ds.emailSubmitWhite : ds.emailSubmitGold,
          variant === "cinematic" && "h-12 w-12 shadow-[0_4px_16px_rgba(212,175,55,0.3)]",
        )}
        aria-label={t.common.subscribe}
      >
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
