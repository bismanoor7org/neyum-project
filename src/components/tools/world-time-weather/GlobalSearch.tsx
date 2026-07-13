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
import { Loader2, Search } from "lucide-react";
import {
  fetchLocationWeatherAction,
  searchLocationsAction,
} from "@/server/actions/world-time-weather";
import { POPULAR_CITIES } from "@/lib/tools/world-time-weather/constants";
import {
  formatLocationSearchLabel,
  resolveWeatherPlace,
} from "@/lib/tools/world-time-weather/location-labels";
import type { LocationSearchResult, LocationWeather } from "@/lib/tools/world-time-weather/types";
import { ds } from "@/lib/design-system";
import { cn } from "@/lib/utils";

function scrollItemIntoList(item: HTMLElement) {
  item.scrollIntoView({ block: "nearest", behavior: "smooth" });
}

const DROPDOWN_MAX_HEIGHT = 320;
const DROPDOWN_GAP = 8;

type DropdownPosition = {
  top: number;
  left: number;
  width: number;
  maxHeight: number;
  placement: "above" | "below";
};

interface GlobalSearchProps {
  onResult: (data: LocationWeather | null) => void;
  onError: (message: string) => void;
  onLoading: (loading: boolean) => void;
}

export function GlobalSearch({ onResult, onError, onLoading }: GlobalSearchProps) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [mounted, setMounted] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition | null>(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<LocationSearchResult[]>([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const [isPending, startTransition] = useTransition();

  const showSuggestions =
    suggestionsOpen && query.trim().length >= 1 && (suggestionsLoading || suggestions.length > 0);

  const selectSuggestion = useCallback(
    (item: LocationSearchResult) => {
      setQuery(formatLocationSearchLabel(item));
      setSuggestionsOpen(false);
      setHighlight(0);

      const { city: weatherCity, country: weatherCountry } = resolveWeatherPlace(item);

      onLoading(true);
      onError("");
      startTransition(async () => {
        const result = await fetchLocationWeatherAction(
          item.latitude,
          item.longitude,
          weatherCity,
          weatherCountry,
          {
            kind: item.kind,
            admin: item.admin,
            timezone: item.timezone,
            iata: item.iata,
          },
        );
        onLoading(false);
        if (result.ok) {
          onResult(result.data);
        } else {
          onResult(null);
          onError(result.error);
        }
      });
    },
    [onError, onLoading, onResult],
  );

  const runSearch = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      if (trimmed.length < 2) return;

      setSuggestionsOpen(false);
      onError("");
      startTransition(async () => {
        const results = await searchLocationsAction(trimmed);
        if (results.length === 0) {
          onResult(null);
          onError(`No results found for "${trimmed}". Try another city or country.`);
          return;
        }
        selectSuggestion(results[0]);
      });
    },
    [onError, onResult, selectSuggestion],
  );

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 1) {
      setSuggestions([]);
      setSuggestionsOpen(false);
      setSuggestionsLoading(false);
      return;
    }

    let cancelled = false;
    const timer = setTimeout(() => {
      setSuggestionsLoading(true);
      setSuggestionsOpen(true);
      searchLocationsAction(trimmed)
        .then((results) => {
          if (cancelled) return;
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
          if (!cancelled) setSuggestionsLoading(false);
        });
    }, 200);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = 0;
  }, [suggestions]);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      if (
        !rootRef.current?.contains(target) &&
        !dropdownRef.current?.contains(target)
      ) {
        setSuggestionsOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [suggestionsOpen]);

  useEffect(() => {
    if (!suggestionsOpen || !listRef.current) return;
    const el = listRef.current.children[highlight] as HTMLElement | undefined;
    if (el) scrollItemIntoList(el);
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
      selectSuggestion(suggestions[highlight]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runSearch(query);
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
            className="booking-scroll overflow-y-auto overscroll-contain scroll-smooth py-2 [scrollbar-gutter:stable]"
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
                  onClick={() => selectSuggestion(item)}
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
    <div className="card-luxury overflow-visible p-6 md:p-8">
      <p className={ds.eyebrowGold}>Global Search</p>
      <h2 className={cn(ds.headingCard, "mt-2 text-2xl")}>Search City or Country</h2>
      <p className="mt-2 text-sm text-foreground/60">
        London, Sydney, Dubai, Tokyo, New York — or any destination worldwide.
      </p>

      <form onSubmit={handleSubmit} className="mt-6" role="search" aria-label="Search city or country">
        <div ref={rootRef} className="flex flex-col gap-3 sm:flex-row">
          <div ref={anchorRef} className="relative z-[1] min-w-0 flex-1">
            <label htmlFor="wtw-search" className="sr-only">
              Search city or country
            </label>
            <input
              ref={inputRef}
              id="wtw-search"
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
              placeholder="Search city or country…"
              autoComplete="off"
              className={cn(
                ds.radiusInput,
                "w-full border border-[var(--border)] bg-[var(--card-surface)] px-4 py-3.5 text-sm text-navy placeholder:text-foreground/40 focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20",
              )}
            />
            {dropdownPanel}
          </div>
          <button
            type="submit"
            disabled={isPending || query.trim().length < 2}
            className={cn(ds.btnBase, ds.btnGold, "shrink-0 disabled:opacity-50")}
            aria-busy={isPending}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <Search className="h-4 w-4" aria-hidden />
            )}
            Search
          </button>
        </div>
      </form>

      <div className="mt-5 flex flex-wrap gap-2" aria-label="Popular cities">
        {POPULAR_CITIES.map((city) => (
          <button
            key={city.query}
            type="button"
            onClick={() => {
              setQuery(city.query);
              runSearch(city.query);
            }}
            className="rounded-full border border-[var(--border)] bg-[var(--hover-bg)] px-3.5 py-1.5 text-xs font-medium text-navy transition-colors hover:border-gold/40 hover:text-gold"
          >
            {city.label}
          </button>
        ))}
      </div>
    </div>
  );
}
