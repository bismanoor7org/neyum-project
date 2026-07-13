"use client";

import { useEffect, useRef, useState } from "react";
import { Navigation, Search, MapPin, Plus, Minus, Lock, Unlock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  searchWorldMap,
  resolveFijiSlug,
  type MapSearchResult,
} from "@/lib/world-map-search";
import { useWorldExplorer } from "@/components/map/WorldExplorerContext";
import { cn } from "@/lib/utils";

export function WorldExplorerMapUI() {
  const {
    view,
    returnToFiji,
    flyTo,
    highlightLocation,
    zoomIn,
    zoomOut,
    setActiveFijiSlug,
    mapActivated,
    activateMap,
    lockMap,
    registerSearchReset,
    compact,
    fullscreenTravel,
  } = useWorldExplorer();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const results = query.trim().length >= 1 ? searchWorldMap(query, 10) : [];

  useEffect(() => {
    registerSearchReset(() => {
      setQuery("");
      setOpen(false);
      setActiveIndex(-1);
    });
  }, [registerSearchReset]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) {
        setOpen(false);
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

  const handleSelect = (r: MapSearchResult) => {
    flyTo(r.lat, r.lng, r.zoom);
    highlightLocation(r.lat, r.lng);
    const fijiSlug = resolveFijiSlug(r);
    if (fijiSlug) setActiveFijiSlug(fijiSlug);
    setQuery("");
    setOpen(false);
    setActiveIndex(-1);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (!open || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i < results.length - 1 ? i + 1 : i));
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i > 0 ? i - 1 : -1));
      return;
    }

    if (e.key === "Enter" && activeIndex >= 0 && activeIndex < results.length) {
      e.preventDefault();
      handleSelect(results[activeIndex]);
    }
  };

  return (
    <>
      {/* Activation overlay — blocks map gestures, allows page scroll */}
      {!mapActivated && (
        <div
          role="button"
          tabIndex={0}
          onClick={activateMap}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              activateMap();
            }
          }}
          className="pointer-events-auto absolute inset-0 z-[15] flex cursor-pointer touch-pan-y items-center justify-center bg-transparent"
          style={{ touchAction: "pan-y" }}
          aria-label="Click to interact with the map"
        >
          <span
            className={cn(
              "pointer-events-none rounded-xl border border-white/40 bg-white/80 px-4 py-2 text-sm font-medium text-navy/65 shadow-md backdrop-blur-sm transition-opacity duration-200",
              compact
                ? "opacity-70 group-hover:opacity-100"
                : "opacity-0 group-hover:opacity-100 max-md:opacity-70",
            )}
          >
            Click to interact with the map
          </span>
        </div>
      )}

      {/* Global search */}
      <div
        ref={wrapRef}
        className={cn(
          "pointer-events-auto absolute z-20",
          compact
            ? "left-3 right-3 top-3"
            : fullscreenTravel
              ? "left-1/2 top-4 w-80 max-w-[calc(100%-2rem)] -translate-x-1/2"
              : "left-4 right-4 top-4 sm:left-5 sm:right-auto sm:w-80",
        )}
      >
        <div
          className={cn(
            "flex items-center gap-2 rounded-xl border border-white/40 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md",
          )}
        >
          <Search className="h-4 w-4 shrink-0 text-teal" strokeWidth={1.5} />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
              setActiveIndex(-1);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleSearchKeyDown}
            placeholder="Search countries, cities, landmarks…"
            className="w-full bg-transparent text-sm text-navy placeholder:text-navy/45 focus:outline-none"
            aria-label="Search world map"
            aria-expanded={open && results.length > 0}
            aria-autocomplete="list"
            role="combobox"
          />
        </div>

        {open && results.length > 0 && (
          <div
            ref={listRef}
            role="listbox"
            className="mt-1 max-h-52 overflow-y-auto rounded-xl border border-white/30 bg-white/95 py-1 shadow-xl backdrop-blur-md"
          >
            {results.map((r, i) => (
              <button
                key={r.id}
                type="button"
                data-result-index={i}
                role="option"
                aria-selected={i === activeIndex}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => handleSelect(r)}
                className={cn(
                  "flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-navy transition-colors hover:bg-teal/8",
                  i === activeIndex && "bg-teal/8",
                )}
              >
                <ResultIcon type={r.type} />
                <span className="flex-1">
                  <span className="font-medium">{r.name}</span>
                  {r.subtitle && (
                    <span className="ml-1.5 text-xs text-navy/50">{r.subtitle}</span>
                  )}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Zoom controls */}
      <div
        className={cn(
          "map-zoom-controls pointer-events-auto absolute z-20 flex flex-col overflow-hidden rounded-xl border border-white/40 bg-white/90 shadow-lg",
          compact ? "right-3 top-[3.75rem]" : "right-5 top-5",
        )}
      >
        <button
          type="button"
          onClick={zoomIn}
          aria-label="Zoom in"
          className="flex h-9 w-9 items-center justify-center text-navy transition-colors hover:bg-teal/8 active:bg-teal/12"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
        </button>
        <div className="h-px bg-white/50" />
        <button
          type="button"
          onClick={zoomOut}
          aria-label="Zoom out"
          className="flex h-9 w-9 items-center justify-center text-navy transition-colors hover:bg-teal/8 active:bg-teal/12"
        >
          <Minus className="h-4 w-4" strokeWidth={2} />
        </button>
        <div className="h-px bg-white/50" />
        <button
          type="button"
          onClick={mapActivated ? lockMap : activateMap}
          aria-label={mapActivated ? "Lock map interaction" : "Unlock map interaction"}
          className="flex h-9 w-9 items-center justify-center text-navy transition-colors hover:bg-teal/8 active:bg-teal/12"
        >
          {mapActivated ? (
            <Lock className="h-3.5 w-3.5" strokeWidth={2} />
          ) : (
            <Unlock className="h-3.5 w-3.5" strokeWidth={2} />
          )}
        </button>
      </div>

      {/* Fiji badge when near Fiji */}
      <AnimatePresence>
        {view.nearFiji && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={cn(
              "pointer-events-none absolute z-10 rounded-full border border-gold/40 bg-white/85 px-3 py-1.5 shadow-md backdrop-blur-sm",
              compact ? "bottom-3 left-3" : "bottom-5 left-5",
            )}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold">
              Fiji Islands · Featured
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Return to Fiji + direction guide */}
      <AnimatePresence>
        {!view.nearFiji && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              onClick={returnToFiji}
              className={cn(
                "pointer-events-auto absolute z-20 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-white/92 px-4 py-2.5 text-sm font-semibold text-navy shadow-lg backdrop-blur-md transition-all hover:bg-gold/10",
                compact ? "bottom-4 right-4" : "bottom-5 right-5",
              )}
            >
              <MapPin className="h-4 w-4 text-gold" fill="currentColor" />
              Return to Fiji
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn(
                "pointer-events-none absolute z-10 flex flex-col items-center gap-1",
                compact ? "bottom-14 right-4" : "bottom-20 right-8",
              )}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/35 bg-white/88 shadow-md backdrop-blur-sm"
                style={{ transform: `rotate(${view.fijiBearing}deg)` }}
              >
                <Navigation
                  className="h-4 w-4 text-gold"
                  fill="currentColor"
                  style={{ transform: "rotate(-45deg)" }}
                />
              </div>
              <p className="rounded-full bg-white/85 px-2 py-0.5 text-[10px] font-medium text-navy/70 shadow-sm">
                Fiji ·{" "}
                {view.fijiDistanceKm < 1000
                  ? `${Math.round(view.fijiDistanceKm)} km`
                  : `${(view.fijiDistanceKm / 1000).toFixed(1)}k km`}
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function ResultIcon({ type }: { type: MapSearchResult["type"] }) {
  if (type === "fiji") return <MapPin className="h-3.5 w-3.5 text-gold" />;
  return <Search className="h-3.5 w-3.5 text-teal/70" />;
}
