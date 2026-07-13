"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, MapPin, Globe2 } from "lucide-react";
import { searchAll } from "@/lib/content/world";
import { cn } from "@/lib/utils";

interface ExploreSearchProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export function ExploreSearch({
  value,
  onChange,
  className,
  placeholder = "Search countries, cities, destinations…",
}: ExploreSearchProps) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const results = value.trim().length >= 2 ? searchAll(value) : null;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const showDropdown = open && focused && results && (results.countries.length > 0 || results.cities.length > 0);

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      <div
        className={cn(
          "flex items-center gap-3 rounded-2xl border bg-white/10 px-5 py-3.5 shadow-[0_8px_32px_rgba(15,61,62,0.12)] backdrop-blur-xl transition-all",
          focused ? "border-gold/40 ring-2 ring-gold/20" : "border-white/20",
        )}
      >
        <Search className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
        <input
          type="search"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            setFocused(true);
            setOpen(true);
          }}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
          aria-label="Search destinations"
          autoComplete="off"
        />
      </div>

      {showDropdown && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-80 overflow-y-auto rounded-2xl border border-white/15 bg-navy/95 p-2 shadow-2xl backdrop-blur-xl">
          {results.countries.length > 0 && (
            <div className="px-2 py-1.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gold/80">Countries</p>
              {results.countries.slice(0, 6).map((c) => (
                <Link
                  key={c.slug}
                  href={`/explore/${c.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/90 transition-colors hover:bg-white/10"
                >
                  <span>{c.flag}</span>
                  <span className="flex-1">{c.name}</span>
                  <Globe2 className="h-3.5 w-3.5 text-white/40" />
                </Link>
              ))}
            </div>
          )}
          {results.cities.length > 0 && (
            <div className="border-t border-white/10 px-2 py-1.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gold/80">Cities</p>
              {results.cities.slice(0, 6).map(({ countrySlug, city }) => (
                <Link
                  key={`${countrySlug}-${city.slug}`}
                  href={`/explore/${countrySlug}/${city.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/90 transition-colors hover:bg-white/10"
                >
                  <MapPin className="h-3.5 w-3.5 text-gold" />
                  <span className="flex-1">{city.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
