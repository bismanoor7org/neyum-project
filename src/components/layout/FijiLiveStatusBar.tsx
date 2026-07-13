"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { WeatherIcon } from "@/components/tools/world-time-weather/WeatherIcon";
import { FIJI_TIMEZONE, TOOL_PATH } from "@/lib/tools/world-time-weather/constants";
import {
  formatShortDateInTimezone,
  formatTemperature,
  formatTimeInTimezone,
} from "@/lib/tools/world-time-weather/format";
import type { FijiLiveStatus } from "@/lib/tools/world-time-weather/types";
import { friendlyWeatherLabel } from "@/lib/tools/world-time-weather/weather-codes";
import { cn } from "@/lib/utils";
import "./fiji-live-status-bar.css";

const WEATHER_REFRESH_MS = 15 * 60 * 1000;
const STATUS_ENDPOINT = "/api/v1/public/fiji-live-status";

interface FijiLiveStatusBarProps {
  belowFloatingNav?: boolean;
}

function Dot() {
  return <span aria-hidden className="fiji-live-status-bar__dot">•</span>;
}

export function FijiLiveStatusBar({ belowFloatingNav = false }: FijiLiveStatusBarProps) {
  const router = useRouter();
  const [now, setNow] = useState<Date | null>(null);
  const [weather, setWeather] = useState<FijiLiveStatus | null>(null);
  const [weatherError, setWeatherError] = useState(false);
  const lastClickRef = useRef(0);

  const loadWeather = useCallback(async () => {
    try {
      const res = await fetch(STATUS_ENDPOINT, { cache: "no-store" });
      if (!res.ok) throw new Error("Weather unavailable");
      const data = (await res.json()) as FijiLiveStatus;
      setWeather(data);
      setWeatherError(false);
    } catch {
      setWeatherError(true);
    }
  }, []);

  useEffect(() => {
    router.prefetch(TOOL_PATH);
  }, [router]);

  useEffect(() => {
    void loadWeather();
    const refreshId = window.setInterval(() => {
      void loadWeather();
    }, WEATHER_REFRESH_MS);
    return () => window.clearInterval(refreshId);
  }, [loadWeather]);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const openDetails = useCallback(() => {
    router.push(`${TOOL_PATH}#fiji-live`);
  }, [router]);

  const handleActivate = useCallback(() => {
    const ts = Date.now();
    if (ts - lastClickRef.current < 350) {
      openDetails();
      lastClickRef.current = 0;
      return;
    }
    lastClickRef.current = ts;
  }, [openDetails]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        openDetails();
      }
    },
    [openDetails],
  );

  const timeLabel = now ? formatTimeInTimezone(FIJI_TIMEZONE, now) : "—";
  const dateLabel = now ? formatShortDateInTimezone(FIJI_TIMEZONE, now) : "—";
  const dateLabelShort = dateLabel.replace(/,\s*\d{4}$/, "");
  const conditionLabel = weather
    ? friendlyWeatherLabel(weather.description, weather.icon)
    : weatherError
      ? "Weather unavailable"
      : "Loading weather";

  const ariaLabel = weather
    ? `Fiji live status: ${formatTemperature(weather.temperature)}, ${timeLabel}, ${dateLabel}, ${conditionLabel}. Double-click or press Enter to open World Time and Weather.`
    : `Fiji live time: ${timeLabel}, ${dateLabel}. ${conditionLabel}. Double-click or press Enter to open World Time and Weather.`;

  return (
    <div
      className={cn(
        "fiji-live-status-bar",
        belowFloatingNav ? "fiji-live-status-bar--hero" : "fiji-live-status-bar--flow",
      )}
    >
      <div
        role="status"
        tabIndex={0}
        aria-label={ariaLabel}
        aria-live="polite"
        onClick={handleActivate}
        onKeyDown={handleKeyDown}
        className="fiji-live-status-bar__group"
      >
        <div className="fiji-live-status-bar__pill">
          <time
            className="fiji-live-status-bar__label shrink-0"
            dateTime={now?.toISOString()}
            suppressHydrationWarning
          >
            {timeLabel}
          </time>
          <Dot />
          <span className="fiji-live-status-bar__meta hidden shrink-0 sm:inline">{dateLabel}</span>
          <span className="fiji-live-status-bar__meta shrink-0 sm:hidden">{dateLabelShort}</span>
          {weather ? (
            <>
              <Dot />
              <span className="fiji-live-status-bar__weather inline-flex min-w-0 items-center gap-1.5">
                <WeatherIcon
                  icon={weather.icon}
                  className="fiji-live-status-bar__icon h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5"
                  strokeWidth={1.65}
                />
                <span className="fiji-live-status-bar__meta min-w-0 truncate capitalize">
                  {conditionLabel}
                </span>
                <span className="fiji-live-status-bar__label shrink-0 tabular-nums">
                  {formatTemperature(weather.temperature)}
                </span>
              </span>
            </>
          ) : (
            <>
              <Dot />
              <span className="fiji-live-status-bar__meta min-w-0 truncate capitalize">
                {conditionLabel}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
