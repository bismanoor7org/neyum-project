"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useT } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";

interface NotifyMeFieldProps {
  topic?: string;
  className?: string;
}

/** Pill email capture for coming-soon pages — mirrors cinematic newsletter styling */
export function NotifyMeField({ topic, className }: NotifyMeFieldProps) {
  const t = useT();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2.5 rounded-full border border-gold/35 bg-gold/12 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md",
          className,
        )}
      >
        <Check className="h-4 w-4 text-gold" strokeWidth={2} aria-hidden />
        You&apos;re on the list — we&apos;ll notify you when this launches.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        ds.emailPillDark,
        "border-white/25 bg-white/10 p-1.5 shadow-[0_8px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl",
        className,
      )}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={topic ? `Email for ${topic} updates` : t.common.emailPlaceholder}
        className={cn(ds.emailInput, "min-w-[200px] py-3.5 text-[15px] sm:min-w-[260px]")}
        aria-label={topic ? `Email for ${topic} launch notification` : "Email for launch notification"}
      />
      <button
        type="submit"
        className={cn(
          ds.emailSubmitGold,
          "h-12 gap-2 px-5 text-xs font-semibold uppercase tracking-[0.12em]",
        )}
      >
        Notify Me
        <ArrowRight className="h-4 w-4" aria-hidden />
      </button>
    </form>
  );
}
