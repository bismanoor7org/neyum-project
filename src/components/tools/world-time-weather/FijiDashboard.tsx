import type { LocationWeather } from "@/lib/tools/world-time-weather/types";
import { FIJI_TIMEZONE } from "@/lib/tools/world-time-weather/constants";
import {
  formatHumidity,
  formatSunTime,
  formatTemperature,
  formatTimezoneLabel,
  formatWindSpeed,
} from "@/lib/tools/world-time-weather/format";
import { ds } from "@/lib/design-system";
import { cn } from "@/lib/utils";
import { Droplets, Sunrise, Sunset, Wind } from "lucide-react";
import { LiveClock } from "./LiveClock";
import { WeatherIcon } from "./WeatherIcon";
import { ForecastRow } from "./ForecastRow";

interface FijiDashboardProps {
  data: LocationWeather;
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-surface)] px-4 py-3">
      <div className="flex items-center gap-2 text-foreground/50">
        <Icon className="h-4 w-4 text-gold" strokeWidth={1.5} aria-hidden />
        <span className="text-[11px] font-medium uppercase tracking-[0.14em]">{label}</span>
      </div>
      <p className="mt-2 text-lg font-medium text-navy">{value}</p>
    </div>
  );
}

export function FijiDashboard({ data }: FijiDashboardProps) {
  return (
    <div className="card-luxury overflow-hidden p-6 md:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className={ds.eyebrowGold}>Fiji Live</p>
          <h2 className={cn(ds.headingCard, "mt-2 text-2xl md:text-3xl")}>
            {data.city}, {data.country}
          </h2>
          <p className="mt-1 text-sm text-foreground/55">
            {formatTimezoneLabel(data.timezone || FIJI_TIMEZONE)}
          </p>
          <div className="mt-5">
            <LiveClock timezone={data.timezone || FIJI_TIMEZONE} />
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--hover-bg)] px-5 py-4">
          <WeatherIcon icon={data.icon} className="h-12 w-12" />
          <div>
            <p className="font-serif text-4xl tracking-tight text-navy">
              {formatTemperature(data.temperature)}
            </p>
            <p className="text-sm capitalize text-foreground/65">{data.description}</p>
            <p className="text-xs text-foreground/50">
              Feels like {formatTemperature(data.feelsLike)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric icon={Droplets} label="Humidity" value={formatHumidity(data.humidity)} />
        <Metric icon={Wind} label="Wind" value={formatWindSpeed(data.windSpeed)} />
        <Metric
          icon={Sunrise}
          label="Sunrise"
          value={formatSunTime(data.sunrise, data.timezone)}
        />
        <Metric
          icon={Sunset}
          label="Sunset"
          value={formatSunTime(data.sunset, data.timezone)}
        />
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground/50">
          5-Day Forecast
        </h3>
        <ForecastRow days={data.forecast} className="mt-4" />
      </div>
    </div>
  );
}
