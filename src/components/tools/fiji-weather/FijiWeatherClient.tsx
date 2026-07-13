"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";
import { ForecastRow } from "@/components/tools/world-time-weather/ForecastRow";
import { WeatherIcon } from "@/components/tools/world-time-weather/WeatherIcon";
import { ToolFaq } from "@/components/tools/world-time-weather/ToolFaq";
import { TOOLS_HREF } from "@/lib/nav/tools-nav";
import { ds } from "@/lib/design-system";
import { cn } from "@/lib/utils";
import type { LocationWeather } from "@/lib/tools/world-time-weather/types";
import {
  formatHumidity,
  formatTemperature,
  formatWindSpeed,
} from "@/lib/tools/world-time-weather/format";
import { FIJI_WEATHER_FAQ, fijiWeatherJsonLd } from "@/lib/tools/fiji-weather/seo";
import { Droplets, Wind } from "lucide-react";

interface FijiWeatherClientProps {
  regions: LocationWeather[];
}

export function FijiWeatherClient({ regions }: FijiWeatherClientProps) {
  const primary = regions[0];

  return (
    <PageLayout activeHref={TOOLS_HREF}>
      <JsonLd data={fijiWeatherJsonLd()} />

      <PageHero
        variant="plain"
        eyebrow="Travel Tools"
        title="Fiji Weather"
        subtitle="Live conditions and 5-day forecasts for Fiji's main travel hubs — sourced from Open-Meteo and refreshed every ten minutes."
        align="center"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: TOOLS_HREF },
          { label: "Fiji Weather" },
        ]}
      />

      {primary && (
        <Section variant="cream" id="fiji-weather-live" reveal={false}>
          <div className={ds.containerNarrow}>
            <div className="card-luxury p-6 md:p-8">
              <p className={ds.eyebrowGold}>Current Conditions</p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <WeatherIcon icon={primary.icon} className="h-14 w-14" />
                <div>
                  <h2 className={cn(ds.headingCard, "text-2xl md:text-3xl")}>
                    {primary.city}, {primary.country}
                  </h2>
                  <p className="font-serif text-4xl tracking-tight text-navy">
                    {formatTemperature(primary.temperature)}
                  </p>
                  <p className="text-sm capitalize text-foreground/65">{primary.description}</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Metric icon={Droplets} label="Humidity" value={formatHumidity(primary.humidity)} />
                <Metric icon={Wind} label="Wind" value={formatWindSpeed(primary.windSpeed)} />
              </div>
              <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground/50">
                  5-Day Forecast — {primary.city}
                </h3>
                <ForecastRow days={primary.forecast} className="mt-4" />
              </div>
            </div>
          </div>
        </Section>
      )}

      <Section variant="sand" id="fiji-regions">
        <div className={ds.containerNarrow}>
          <p className={ds.eyebrowGold}>Regional Outlook</p>
          <h2 className={cn(ds.headingSection, "mt-2")}>Fiji Travel Hubs</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {regions.map((region) => (
              <div key={region.city} className="card-luxury p-5 md:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-xl text-navy">{region.city}</h3>
                    <p className="text-sm capitalize text-foreground/60">{region.description}</p>
                  </div>
                  <WeatherIcon icon={region.icon} className="h-10 w-10 shrink-0" />
                </div>
                <p className="mt-3 font-serif text-3xl text-navy">
                  {formatTemperature(region.temperature)}
                </p>
                <ForecastRow days={region.forecast.slice(0, 3)} className="mt-4" compact />
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section variant="cream" id="faq" decor={false}>
        <div className={ds.containerNarrow}>
          <div className="card-luxury p-6 md:p-8">
            <ToolFaq items={[...FIJI_WEATHER_FAQ]} />
          </div>
        </div>
      </Section>
    </PageLayout>
  );
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
