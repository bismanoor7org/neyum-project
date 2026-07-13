"use client";

import { useEffect, useRef, useState } from "react";
import {
  Crosshair,
  Loader2,
  MapPin,
  Navigation,
  Plane,
  Route,
} from "lucide-react";
import {
  FIJI_TRAVEL_DESTINATION_LABELS,
  FIJI_TRAVEL_DESTINATION_SLUGS,
  type FijiTravelDestinationSlug,
} from "@/lib/fiji-travel-intelligence";
import { useFijiTravelIntelligence } from "@/components/map/FijiTravelIntelligenceProvider";
import { cn } from "@/lib/utils";

function formatDistance(km: number) {
  if (km < 100) return `${Math.round(km)} km`;
  return `${km.toLocaleString(undefined, { maximumFractionDigits: 0 })} km`;
}

export function FijiFullscreenTravelPanel() {
  const {
    userLocation,
    locationStatus,
    locationError,
    destinationSlug,
    travelPlan,
    locationQuery,
    setLocationQuery,
    locationResults,
    detectUserLocation,
    selectLocationResult,
    selectDestination,
    clearUserLocation,
  } = useFijiTravelIntelligence();

  const [resultsOpen, setResultsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) {
        setResultsOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (activeIndex < 0 || !listRef.current) return;
    listRef.current
      .querySelector(`[data-result-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const handleSelectResult = (index: number) => {
    const result = locationResults[index];
    if (!result) return;
    selectLocationResult(result);
    setResultsOpen(false);
    setActiveIndex(-1);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setResultsOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (!resultsOpen || locationResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i < locationResults.length - 1 ? i + 1 : i));
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i > 0 ? i - 1 : -1));
      return;
    }

    if (e.key === "Enter" && activeIndex >= 0 && activeIndex < locationResults.length) {
      e.preventDefault();
      handleSelectResult(activeIndex);
    }
  };

  return (
    <div
      className={cn(
        "pointer-events-auto absolute z-20 flex flex-col gap-3",
        "bottom-4 left-4 right-4 max-h-[calc(100%-4rem)] sm:bottom-auto sm:left-5 sm:right-auto sm:top-[4rem]",
        "w-auto sm:w-[min(100%,20rem)]",
      )}
    >
      <div className="max-h-[inherit] overflow-y-auto rounded-xl border border-white/40 bg-white/92 shadow-xl backdrop-blur-md">
        <div className="border-b border-navy/8 px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
            Travel Intelligence
          </p>
          <h2 className="mt-0.5 font-serif text-base text-navy">Plan your route to Fiji</h2>
        </div>

        <div className="space-y-4 px-4 py-4">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-navy/55">
              Current location
            </p>
            <button
              type="button"
              onClick={detectUserLocation}
              disabled={locationStatus === "loading"}
              className="mb-2 flex w-full items-center justify-center gap-2 rounded-lg border border-teal/25 bg-teal/8 px-3 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-teal/12 disabled:opacity-60"
            >
              {locationStatus === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin text-teal" />
              ) : (
                <Crosshair className="h-4 w-4 text-teal" strokeWidth={1.5} />
              )}
              Detect my location
            </button>

            <div ref={wrapRef} className="relative">
              <div className="flex items-center gap-2 rounded-lg border border-navy/10 bg-white px-3 py-2">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-navy/40" />
                <input
                  type="search"
                  value={locationQuery}
                  onChange={(e) => {
                    setLocationQuery(e.target.value);
                    setResultsOpen(true);
                    setActiveIndex(-1);
                  }}
                  onFocus={() => setResultsOpen(true)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Or search city / country…"
                  className="w-full bg-transparent text-sm text-navy placeholder:text-navy/40 focus:outline-none"
                  aria-label="Search your location"
                  aria-expanded={resultsOpen && locationResults.length > 0}
                  aria-autocomplete="list"
                  role="combobox"
                />
              </div>

              {resultsOpen && locationResults.length > 0 && (
                <div
                  ref={listRef}
                  role="listbox"
                  className="absolute z-30 mt-1 max-h-40 w-full overflow-y-auto rounded-lg border border-navy/10 bg-white py-1 shadow-lg"
                >
                  {locationResults.map((r, i) => (
                    <button
                      key={r.id}
                      type="button"
                      data-result-index={i}
                      role="option"
                      aria-selected={i === activeIndex}
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => handleSelectResult(i)}
                      className={cn(
                        "flex w-full px-3 py-2 text-left text-sm text-navy transition-colors hover:bg-teal/8",
                        i === activeIndex && "bg-teal/8",
                      )}
                    >
                      <span className="font-medium">{r.name}</span>
                      {r.subtitle && (
                        <span className="ml-1.5 text-xs text-navy/50">{r.subtitle}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {locationError && (
              <p className="mt-2 text-xs text-red-600/90">{locationError}</p>
            )}

            {userLocation && (
              <div className="mt-2 flex items-start justify-between gap-2 rounded-lg bg-cream/80 px-3 py-2">
                <p className="text-xs leading-relaxed text-navy/75">{userLocation.label}</p>
                <button
                  type="button"
                  onClick={clearUserLocation}
                  className="shrink-0 text-[10px] font-medium text-navy/45 hover:text-navy"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-navy/55">
              Fiji destination
            </p>
            <div className="flex flex-wrap gap-1.5">
              {FIJI_TRAVEL_DESTINATION_SLUGS.map((slug) => (
                <button
                  key={slug}
                  type="button"
                  onClick={() => selectDestination(slug)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                    destinationSlug === slug
                      ? "bg-gold text-navy shadow-sm"
                      : "border border-navy/12 bg-white text-navy/70 hover:border-gold/35",
                  )}
                >
                  {FIJI_TRAVEL_DESTINATION_LABELS[slug as FijiTravelDestinationSlug]}
                </button>
              ))}
            </div>
          </div>

          {travelPlan && (
            <div className="space-y-3 border-t border-navy/8 pt-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-navy/55">
                Travel summary
              </p>

              <InfoRow
                icon={MapPin}
                label="Current location"
                value={travelPlan.user.label}
              />
              <InfoRow
                icon={Navigation}
                label="Selected destination"
                value={travelPlan.destination.label}
              />
              <InfoRow
                icon={Route}
                label="Distance"
                value={formatDistance(travelPlan.distanceKm)}
              />
              <InfoRow
                icon={Plane}
                label="Est. flight to Fiji"
                value={travelPlan.estimatedFlightLabel}
              />
              <InfoRow
                icon={MapPin}
                label="Nearest airport"
                value={`${travelPlan.nearestAirport.name} (${travelPlan.nearestAirport.iata})`}
              />
              <InfoRow
                icon={Route}
                label="Suggested route"
                value={travelPlan.suggestedRoute}
              />
              <p className="rounded-lg bg-navy/5 px-3 py-2 text-xs leading-relaxed text-navy/70">
                {travelPlan.routeSummary}
              </p>
            </div>
          )}

          {!userLocation && (
            <p className="text-xs leading-relaxed text-navy/50">
              Detect your location or search manually to see distance, flight time, and route on
              the map.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-2.5">
      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.5} />
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-navy/45">{label}</p>
        <p className="text-sm leading-snug text-navy">{value}</p>
      </div>
    </div>
  );
}
