"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { createPortal } from "react-dom";
import { ArrowLeftRight, Clock, Loader2, Search } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";
import { TOOLS_HREF } from "@/lib/nav/tools-nav";
import { ds } from "@/lib/design-system";
import { cn } from "@/lib/utils";
import { searchLocationsAction } from "@/server/actions/world-time-weather";
import type { LocationSearchResult } from "@/lib/tools/world-time-weather/types";
import {
  computeTimeDifference,
  formatDateInTimezone,
  formatTimeInTimezone,
  formatUtcOffset,
  friendlyTimezoneName,
  getDaylightSavingStatus,
} from "@/lib/tools/world-time-weather/format";
import {
  formatLocationDisplayName,
  formatLocationSearchLabel,
} from "@/lib/tools/world-time-weather/location-labels";
import { FIJI_TIMEZONE } from "@/lib/tools/world-time-weather/constants";
import { timezoneFinderJsonLd } from "@/lib/tools/timezone-finder/seo";

type CitySlot = LocationSearchResult | null;

const DROPDOWN_MAX_HEIGHT = 320;
const DROPDOWN_GAP = 8;
const SEARCH_DEBOUNCE_MS = 200;

type DropdownPosition = {
  top: number;
  left: number;
  width: number;
  maxHeight: number;
  placement: "above" | "below";
};

export function TimezoneFinderClient() {
  const [cityA, setCityA] = useState<CitySlot>(null);
  const [cityB, setCityB] = useState<CitySlot>(null);
  const [queryA, setQueryA] = useState("");
  const [queryB, setQueryB] = useState("");
  const [error, setError] = useState("");
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const selectCity = useCallback((slot: "A" | "B", item: LocationSearchResult) => {
    setError("");
    if (slot === "A") {
      setCityA(item);
      setQueryA(formatLocationSearchLabel(item));
    } else {
      setCityB(item);
      setQueryB(formatLocationSearchLabel(item));
    }
  }, []);

  const diff =
    cityA && cityB
      ? computeTimeDifference(
          cityA.timezone,
          formatLocationDisplayName(cityA),
          cityB.timezone,
          formatLocationDisplayName(cityB),
          now,
        )
      : null;

  const fijiDiff = cityA
    ? computeTimeDifference(
        cityA.timezone,
        formatLocationDisplayName(cityA),
        FIJI_TIMEZONE,
        "Fiji",
        now,
      )
    : null;

  return (
    <PageLayout activeHref={TOOLS_HREF}>
      <JsonLd data={timezoneFinderJsonLd()} />

      <PageHero
        variant="plain"
        eyebrow="Travel Tools"
        title="Timezone Finder"
        subtitle="Search any city or country for its IANA timezone, compare offsets with Fiji, and calculate live time differences."
        align="center"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: TOOLS_HREF },
          { label: "Timezone Finder" },
        ]}
      />

      <Section variant="cream" reveal={false}>
        <div className={ds.containerNarrow}>
          <div className="card-luxury overflow-visible p-6 md:p-8">
            <p className={ds.eyebrowGold}>Location Search</p>
            <h2 className={cn(ds.headingCard, "mt-2 text-2xl")}>Find IANA Timezones</h2>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <CitySearch
                label="Destination 1"
                query={queryA}
                setQuery={setQueryA}
                onSelect={(item) => selectCity("A", item)}
                onError={setError}
                selected={cityA}
              />
              <CitySearch
                label="Destination 2"
                query={queryB}
                setQuery={setQueryB}
                onSelect={(item) => selectCity("B", item)}
                onError={setError}
                selected={cityB}
              />
            </div>

            {error && (
              <p className="mt-4 text-sm text-coral" role="alert">
                {error}
              </p>
            )}

            {diff && (
              <div className="mt-8 rounded-2xl border border-gold/25 bg-gold/5 px-5 py-4">
                <div className="flex items-center gap-2">
                  <ArrowLeftRight className="h-5 w-5 text-gold" strokeWidth={1.5} />
                  <p className="font-semibold text-navy">
                    {cityB!.city} is {diff.differenceLabel} of {cityA!.city}
                  </p>
                </div>
                <p className="mt-2 text-sm text-foreground/65">
                  Best contact time: {diff.bestTimeToContact}
                </p>
              </div>
            )}
          </div>

          {(cityA || cityB) && (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[cityA, cityB].filter(Boolean).map((city) => (
                <LocationTimezoneCard key={`${city!.city}-${city!.country}`} city={city!} now={now} />
              ))}
            </div>
          )}

          {fijiDiff && (
            <div className="mt-6 card-luxury p-6 md:p-8">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gold" strokeWidth={1.5} />
                <p className={ds.eyebrowGold}>Fiji Comparison</p>
              </div>
              <p className="mt-3 text-sm text-foreground/65">
                Fiji is {fijiDiff.differenceLabel} of {cityA!.city}. {fijiDiff.bestTimeToContact}
              </p>
            </div>
          )}
        </div>
      </Section>
    </PageLayout>
  );
}

function LocationTimezoneCard({ city, now }: { city: LocationSearchResult; now: Date }) {
  const displayName = formatLocationDisplayName(city);
  const cityLabel = city.kind === "country" ? (city.admin ?? city.city) : city.city;
  const countryLabel = city.kind === "country" ? city.city : city.country;

  return (
    <div className="card-luxury p-5 md:p-6">
      <div className="text-center">
        <p className="text-lg font-semibold text-navy">{cityLabel}</p>
        <p className="text-sm text-foreground/55">{countryLabel}</p>
        <p className="mt-4 font-serif text-3xl tracking-tight text-navy md:text-4xl" aria-live="polite">
          {formatTimeInTimezone(city.timezone, now, true)}
        </p>
        <p className="mt-1 text-sm text-foreground/65">
          {formatDateInTimezone(city.timezone, now)}
        </p>
      </div>

      <dl className="mt-5 space-y-2 border-t border-[var(--border)] pt-4 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-foreground/50">IANA Timezone</dt>
          <dd className="text-right font-medium text-navy">{city.timezone}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-foreground/50">UTC Offset</dt>
          <dd className="text-right font-medium text-navy">{formatUtcOffset(city.timezone, now)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-foreground/50">Daylight Saving</dt>
          <dd className="text-right font-medium text-navy">
            {getDaylightSavingStatus(city.timezone, now)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-foreground/50">Display Name</dt>
          <dd className="text-right text-foreground/70">{displayName}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-foreground/50">Zone Label</dt>
          <dd className="text-right text-foreground/70">{friendlyTimezoneName(city.timezone)}</dd>
        </div>
      </dl>
    </div>
  );
}

function CitySearch({
  label,
  query,
  setQuery,
  onSelect,
  onError,
  selected,
}: {
  label: string;
  query: string;
  setQuery: (v: string) => void;
  onSelect: (item: LocationSearchResult) => void;
  onError: (message: string) => void;
  selected: CitySlot;
}) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const pendingQueryRef = useRef<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition | null>(null);
  const [suggestions, setSuggestions] = useState<LocationSearchResult[]>([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const [isPending, startTransition] = useTransition();

  const showSuggestions =
    suggestionsOpen && query.trim().length >= 1 && (suggestionsLoading || suggestions.length > 0);

  const pickSuggestion = useCallback(
    (item: LocationSearchResult) => {
      setSuggestionsOpen(false);
      setHighlight(0);
      onSelect(item);
    },
    [onSelect],
  );

  const runSearch = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      if (trimmed.length < 1) return;

      setSuggestionsOpen(false);
      onError("");
      startTransition(async () => {
        const results = await searchLocationsAction(trimmed);
        if (results.length === 0) {
          onError(`No results for "${trimmed}". Try another city or country.`);
          return;
        }
        pickSuggestion(results[0]);
      });
    },
    [onError, pickSuggestion],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 1) {
      setSuggestions([]);
      setSuggestionsOpen(false);
      setSuggestionsLoading(false);
      pendingQueryRef.current = null;
      return;
    }

    let cancelled = false;
    const timer = setTimeout(() => {
      pendingQueryRef.current = trimmed;
      setSuggestionsLoading(true);
      setSuggestionsOpen(true);
      searchLocationsAction(trimmed)
        .then((results) => {
          if (cancelled || pendingQueryRef.current !== trimmed) return;
          setSuggestions(results);
          setSuggestionsOpen(results.length > 0);
          setHighlight(0);
        })
        .catch(() => {
          if (!cancelled) {
            setSuggestions([]);
            setSuggestionsOpen(false);
          }
        })
        .finally(() => {
          if (!cancelled && pendingQueryRef.current === trimmed) {
            setSuggestionsLoading(false);
          }
        });
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = 0;
  }, [suggestions]);

  const updateDropdownPosition = useCallback(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    const rect = anchor.getBoundingClientRect();
    const viewportPadding = 12;
    const spaceBelow = window.innerHeight - rect.bottom - DROPDOWN_GAP - viewportPadding;
    const spaceAbove = rect.top - DROPDOWN_GAP - viewportPadding;
    const openBelow = spaceBelow >= Math.min(DROPDOWN_MAX_HEIGHT, 160) || spaceBelow >= spaceAbove;
    const available = openBelow ? spaceBelow : spaceAbove;

    setDropdownPosition({
      left: rect.left,
      width: rect.width,
      placement: openBelow ? "below" : "above",
      top: openBelow ? rect.bottom + DROPDOWN_GAP : rect.top - DROPDOWN_GAP,
      maxHeight: Math.max(120, Math.min(DROPDOWN_MAX_HEIGHT, available)),
    });
  }, []);

  useLayoutEffect(() => {
    if (!showSuggestions) {
      setDropdownPosition(null);
      return;
    }

    updateDropdownPosition();

    const onLayoutChange = () => updateDropdownPosition();
    window.addEventListener("resize", onLayoutChange);
    window.addEventListener("scroll", onLayoutChange, true);
    return () => {
      window.removeEventListener("resize", onLayoutChange);
      window.removeEventListener("scroll", onLayoutChange, true);
    };
  }, [showSuggestions, updateDropdownPosition, suggestions.length, suggestionsLoading]);

  useEffect(() => {
    if (!suggestionsOpen) return;
    const onDoc = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!rootRef.current?.contains(target) && !dropdownRef.current?.contains(target)) {
        setSuggestionsOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [suggestionsOpen]);

  useEffect(() => {
    if (!suggestionsOpen || !listRef.current) return;
    const el = listRef.current.children[highlight] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [highlight, suggestionsOpen]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      if (suggestions.length === 0) return;
      e.preventDefault();
      if (!suggestionsOpen) {
        setSuggestionsOpen(true);
        return;
      }
      setHighlight((h) => Math.min(h + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      if (suggestions.length === 0) return;
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Escape") {
      setSuggestionsOpen(false);
    } else if (e.key === "Enter" && suggestionsOpen && !suggestionsLoading && suggestions[highlight]) {
      e.preventDefault();
      pickSuggestion(suggestions[highlight]);
    }
  };

  const dropdownPanel =
    mounted &&
    showSuggestions &&
    dropdownPosition &&
    createPortal(
      <div
        ref={dropdownRef}
        className="pointer-events-auto fixed z-[200]"
        style={{
          top: dropdownPosition.top,
          left: dropdownPosition.left,
          width: dropdownPosition.width,
          transform: dropdownPosition.placement === "above" ? "translateY(-100%)" : undefined,
        }}
      >
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card-elevated)] shadow-[var(--shadow-elevated)]">
          <ul
            ref={listRef}
            id={`${listboxId}-list`}
            role="listbox"
            aria-label="Location suggestions"
            className="booking-scroll overflow-y-auto overflow-x-hidden overscroll-contain scroll-smooth py-2 [scrollbar-gutter:stable]"
            style={{ maxHeight: dropdownPosition.maxHeight }}
            onMouseDown={(e) => e.preventDefault()}
          >
            {suggestionsLoading ? (
              <li className="px-4 py-3 text-sm text-foreground/50">Searching locations…</li>
            ) : (
              suggestions.map((item, idx) => (
                <li
                  key={`${item.kind ?? "city"}-${item.latitude}-${item.longitude}-${item.city}-${item.iata ?? ""}`}
                  id={`${listboxId}-option-${idx}`}
                  role="option"
                  aria-selected={highlight === idx}
                  onMouseEnter={() => setHighlight(idx)}
                  onClick={() => pickSuggestion(item)}
                  className={cn(
                    "cursor-pointer px-4 py-2.5 text-sm transition-colors",
                    highlight === idx
                      ? "bg-gold/10 text-navy"
                      : "text-navy/80 hover:bg-[var(--hover-bg)]",
                  )}
                >
                  {formatLocationSearchLabel(item)}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>,
      document.body,
    );

  return (
    <div ref={rootRef}>
      <label className="text-xs font-medium uppercase tracking-[0.14em] text-foreground/50">
        {label}
      </label>
      <form
        className="mt-2 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          runSearch(query);
        }}
      >
        <div ref={anchorRef} className="relative z-[1] min-w-0 flex-1">
          <input
            type="search"
            role="combobox"
            aria-expanded={showSuggestions}
            aria-controls={`${listboxId}-list`}
            aria-autocomplete="list"
            aria-activedescendant={
              showSuggestions && suggestions[highlight]
                ? `${listboxId}-option-${highlight}`
                : undefined
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (suggestions.length > 0) setSuggestionsOpen(true);
            }}
            onKeyDown={onKeyDown}
            placeholder="Country, city, or region…"
            autoComplete="off"
            className={cn(
              ds.radiusInput,
              "w-full border border-[var(--border)] bg-[var(--card-surface)] px-4 py-3 text-sm text-navy",
            )}
          />
          {dropdownPanel}
        </div>
        <button
          type="submit"
          disabled={isPending || query.trim().length < 1}
          className={cn(ds.btnBase, ds.btnGold, "shrink-0 disabled:opacity-50")}
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </button>
      </form>
      {selected && (
        <p className="mt-2 text-xs text-foreground/55">
          {formatLocationDisplayName(selected)} — {selected.timezone} ({formatUtcOffset(selected.timezone)})
        </p>
      )}
    </div>
  );
}
