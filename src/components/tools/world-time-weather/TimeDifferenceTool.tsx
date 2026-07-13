"use client";

import { useEffect, useState } from "react";
import { ArrowLeftRight, Clock } from "lucide-react";
import type { LocationWeather } from "@/lib/tools/world-time-weather/types";
import { FIJI_TIMEZONE } from "@/lib/tools/world-time-weather/constants";
import { computeTimeDifference, formatTimeInTimezone } from "@/lib/tools/world-time-weather/format";
import { formatLocationDisplayName } from "@/lib/tools/world-time-weather/location-labels";
import { ds } from "@/lib/design-system";
import { cn } from "@/lib/utils";

interface TimeDifferenceToolProps {
  selected: LocationWeather | null;
  fijiTimezone?: string;
}

export function TimeDifferenceTool({
  selected,
  fijiTimezone = FIJI_TIMEZONE,
}: TimeDifferenceToolProps) {
  const [userTimezone, setUserTimezone] = useState("UTC");
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTimezone(tz);
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const compareTz = selected?.timezone ?? fijiTimezone;
  const compareLabel = selected ? formatLocationDisplayName(selected) : "Fiji";
  const userLabel = friendlyCityFromTz(userTimezone);

  const diff = computeTimeDifference(
    userTimezone,
    userLabel,
    compareTz,
    compareLabel,
    now,
  );

  return (
    <div className="card-luxury p-6 md:p-8">
      <div className="flex items-center gap-2">
        <ArrowLeftRight className="h-5 w-5 text-gold" strokeWidth={1.5} aria-hidden />
        <p className={ds.eyebrowGold}>Time Difference</p>
      </div>
      <h2 className={cn(ds.headingCard, "mt-2 text-2xl")}>Compare Your Location</h2>
      <p className="mt-2 text-sm text-foreground/60">
        See how your local time aligns with {compareLabel} — and when to reach your concierge.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <TimeCard
          label="Your Location"
          sublabel={userTimezone.replace(/_/g, " ")}
          time={formatTimeInTimezone(userTimezone, now)}
        />
        <TimeCard
          label={compareLabel}
          sublabel={compareTz.replace(/_/g, " ")}
          time={formatTimeInTimezone(compareTz, now)}
        />
      </div>

      <div className="mt-6 rounded-2xl border border-gold/25 bg-gold/5 px-5 py-4">
        <div className="flex flex-wrap items-start gap-3">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} aria-hidden />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-navy">
                {compareLabel} is {diff.differenceLabel}
              </p>
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em]",
                  diff.direction === "ahead" && "bg-success/15 text-success",
                  diff.direction === "behind" && "bg-coral/15 text-coral",
                  diff.direction === "same" && "bg-gold/15 text-gold",
                )}
                aria-label={`Time difference: ${diff.differenceLabel}`}
              >
                {diff.direction === "ahead"
                  ? "Ahead"
                  : diff.direction === "behind"
                    ? "Behind"
                    : "Same"}
              </span>
            </div>
            <p className="mt-1 text-sm text-foreground/65">
              Best time to contact: {diff.bestTimeToContact}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimeCard({
  label,
  sublabel,
  time,
}: {
  label: string;
  sublabel: string;
  time: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-surface)] px-5 py-4">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-foreground/50">{label}</p>
      <p className="mt-1 text-xs text-foreground/40">{sublabel}</p>
      <p className="mt-3 font-serif text-2xl tracking-tight text-navy">{time}</p>
    </div>
  );
}

function friendlyCityFromTz(tz: string): string {
  const part = tz.split("/").pop()?.replace(/_/g, " ");
  return part ?? "Your location";
}
