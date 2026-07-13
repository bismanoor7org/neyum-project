import type { ForecastDay } from "@/lib/tools/world-time-weather/types";
import { formatTemperature } from "@/lib/tools/world-time-weather/format";
import { WeatherIcon } from "./WeatherIcon";
import { cn } from "@/lib/utils";

interface ForecastRowProps {
  days: ForecastDay[];
  compact?: boolean;
  className?: string;
}

export function ForecastRow({ days, compact, className }: ForecastRowProps) {
  if (days.length === 0) return null;

  return (
    <div
      className={cn(
        "grid gap-3",
        compact ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" : "sm:grid-cols-2 lg:grid-cols-5",
        className,
      )}
      role="list"
      aria-label="5-day weather forecast"
    >
      {days.map((day) => (
        <div
          key={day.date}
          role="listitem"
          className="rounded-2xl border border-[var(--border)] bg-[var(--card-surface)] px-4 py-3 text-center shadow-[var(--shadow-card)]"
        >
          <p className="text-xs font-medium text-foreground/55">{day.label}</p>
          <WeatherIcon icon={day.icon} className="mx-auto mt-2 h-6 w-6" />
          <p className="mt-2 text-sm font-medium text-navy">{formatTemperature(day.tempMax)}</p>
          <p className="text-xs text-foreground/50">{formatTemperature(day.tempMin)}</p>
          <p className="mt-1 text-[11px] leading-snug text-foreground/45">{day.description}</p>
        </div>
      ))}
    </div>
  );
}
