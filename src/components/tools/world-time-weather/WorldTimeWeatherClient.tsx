"use client";

import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";
import { ToolFaq } from "./ToolFaq";
import { TOOLS_HREF } from "@/lib/nav/tools-nav";
import { ds } from "@/lib/design-system";
import { cn } from "@/lib/utils";
import { TOOL_FAQ } from "@/lib/tools/world-time-weather/constants";
import { worldTimeWeatherJsonLd } from "@/lib/tools/world-time-weather/seo";
import type { LocationWeather } from "@/lib/tools/world-time-weather/types";
import { FijiDashboard } from "./FijiDashboard";
import { GlobalSearch } from "./GlobalSearch";
import { SearchResults } from "./SearchResults";
import { TimeDifferenceTool } from "./TimeDifferenceTool";
import { ForecastRow } from "./ForecastRow";
import { TravelInsights } from "./TravelInsights";
import { EmptyState } from "./EmptyState";
import { SearchResultsSkeleton } from "./Skeletons";
import { ToolErrorBoundary } from "./ToolErrorBoundary";

interface WorldTimeWeatherClientProps {
  fijiData: LocationWeather;
}

export function WorldTimeWeatherClient({ fijiData }: WorldTimeWeatherClientProps) {
  const [searchResult, setSearchResult] = useState<LocationWeather | null>(null);
  const [searchError, setSearchError] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const insightsLocation = searchResult ?? fijiData;

  return (
    <PageLayout activeHref={TOOLS_HREF}>
      <JsonLd data={worldTimeWeatherJsonLd()} />

      <PageHero
        variant="plain"
        eyebrow="Travel Tools"
        title="World Time & Weather"
        subtitle="Live Fiji time and island conditions — plus global city clocks, forecasts, and timezone comparison for discerning travellers."
        align="center"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: TOOLS_HREF },
          { label: "World Time & Weather" },
        ]}
      />

      <Section variant="cream" id="fiji-live" reveal={false}>
        <div className={ds.containerNarrow}>
          <ToolErrorBoundary>
            <FijiDashboard data={fijiData} />
          </ToolErrorBoundary>
        </div>
      </Section>

      <Section variant="sand" id="search">
        <div className={cn(ds.containerNarrow, "space-y-6")}>
          <GlobalSearch
            onResult={setSearchResult}
            onError={setSearchError}
            onLoading={setSearchLoading}
          />

          {searchError && (
            <div
              className="rounded-2xl border border-coral/30 bg-coral/5 px-5 py-4 text-sm text-navy"
              role="alert"
            >
              {searchError}
            </div>
          )}

          {searchLoading && <SearchResultsSkeleton />}

          {!searchLoading && searchResult && (
            <ToolErrorBoundary>
              <SearchResults data={searchResult} />
            </ToolErrorBoundary>
          )}

          {!searchLoading && !searchResult && !searchError && (
            <EmptyState message="Search any city or country above to view live time, weather, and a five-day forecast." />
          )}
        </div>
      </Section>

      <Section variant="cream" id="time-difference">
        <div className={ds.containerNarrow}>
          <ToolErrorBoundary>
            <TimeDifferenceTool selected={searchResult} />
          </ToolErrorBoundary>
        </div>
      </Section>

      <Section variant="sand" id="forecast">
        <div className={ds.containerNarrow}>
          <p className={ds.eyebrowGold}>Weather Forecast</p>
          <h2 className={cn(ds.headingSection, "mt-2")}>
            {insightsLocation.city} — 5-Day Outlook
          </h2>
          <p className="mt-3 text-sm text-foreground/65">
            Daily highs, lows, and conditions refreshed every ten minutes.
          </p>
          <div className="mt-6 card-luxury p-6 md:p-8">
            <ToolErrorBoundary>
              <ForecastRow days={insightsLocation.forecast} />
            </ToolErrorBoundary>
          </div>
        </div>
      </Section>

      <Section variant="cream" id="insights">
        <div className={ds.containerNarrow}>
          <ToolErrorBoundary>
            <TravelInsights location={insightsLocation} />
          </ToolErrorBoundary>
        </div>
      </Section>

      <Section variant="sand" id="faq" decor={false}>
        <div className={ds.containerNarrow}>
          <p className={ds.eyebrowGold}>FAQ</p>
          <h2 className={cn(ds.headingSection, "mt-2")}>
            World Time & Weather
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-foreground/65">
            Quick answers on Fiji timezones, forecasts, and planning across global destinations.
          </p>
          <div className="mt-8 card-luxury p-6 md:p-8">
            <ToolFaq items={[...TOOL_FAQ]} />
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
