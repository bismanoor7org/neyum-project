"use client";

import { useEffect, useState } from "react";
import {
  formatDateInTimezone,
  formatTimeInTimezone,
  formatTimezoneLabel,
} from "@/lib/tools/world-time-weather/format";
import { cn } from "@/lib/utils";

interface LiveClockProps {
  timezone: string;
  showDate?: boolean;
  showTimezone?: boolean;
  timeClassName?: string;
  dateClassName?: string;
  tick?: boolean;
}

export function LiveClock({
  timezone,
  showDate = true,
  showTimezone = false,
  timeClassName = "font-serif text-3xl tracking-tight text-navy md:text-4xl",
  dateClassName = "text-sm text-foreground/65",
  tick = true,
}: LiveClockProps) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    if (!tick) return;
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, [tick]);

  return (
    <div aria-live="polite" aria-atomic="true">
      <time className={timeClassName} dateTime={now.toISOString()}>
        {formatTimeInTimezone(timezone, now, tick)}
      </time>
      {showDate && (
        <p className={cn("mt-1", dateClassName)}>
          {formatDateInTimezone(timezone, now)}
        </p>
      )}
      {showTimezone && (
        <p className="mt-1 text-xs text-foreground/50">
          {formatTimezoneLabel(timezone, now)}
        </p>
      )}
    </div>
  );
}
