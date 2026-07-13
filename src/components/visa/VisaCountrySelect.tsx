"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { flagUrl, VISA_COUNTRIES } from "@/data/visa/countries";
import type { VisaCountry } from "@/types/visa";
import { cn } from "@/lib/utils";

type VisaCountrySelectProps = {
  value: VisaCountry | null;
  onChange: (country: VisaCountry) => void;
  className?: string;
  tone?: "dark" | "light";
};

function filterStaticCountries(q: string): VisaCountry[] {
  const needle = q.trim().toLowerCase();
  if (!needle) return VISA_COUNTRIES;
  return VISA_COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(needle) ||
      c.slug.includes(needle) ||
      c.iso2.toLowerCase() === needle,
  );
}

export function VisaCountrySelect({ value, onChange, className, tone = "light" }: VisaCountrySelectProps) {
  const listboxId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const [countries, setCountries] = useState<VisaCountry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());

    const timer = setTimeout(() => {
      fetch(`/api/v1/visa?${params}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((json) => {
          if (!cancelled) {
            const list = json?.data?.countries;
            setCountries(Array.isArray(list) && list.length > 0 ? list : filterStaticCountries(query));
          }
        })
        .catch(() => {
          if (!cancelled) setCountries(filterStaticCountries(query));
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    }, query ? 200 : 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  const filtered = useMemo(() => countries, [countries]);

  const select = useCallback(
    (country: VisaCountry) => {
      onChange(country);
      setQuery("");
      setOpen(false);
      setHighlight(0);
    },
    [onChange],
  );

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!inputRef.current?.closest("[data-visa-select]")?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useEffect(() => {
    setHighlight(0);
  }, [query]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter" && filtered[highlight]) {
      e.preventDefault();
      select(filtered[highlight]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.children[highlight] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [highlight, open]);

  const isDark = tone === "dark";

  return (
    <div
      data-visa-select
      data-open={open ? "true" : "false"}
      className={cn("relative w-full min-w-0", className)}
    >
      <label htmlFor={listboxId} className="sr-only">
        Select your nationality
      </label>
      <div
        className={cn(
          "flex items-center gap-3 rounded-xl border px-4 py-3.5 shadow-[0_8px_32px_rgba(15,23,42,0.1)] backdrop-blur-xl transition-all",
          isDark
            ? "border-white/22 bg-white/12"
            : "border-navy/15 bg-white",
          open && "border-gold/40 ring-2 ring-gold/20",
        )}
      >
        {value ? (
          <Image
            src={flagUrl(value.iso2)}
            alt=""
            width={28}
            height={20}
            className="h-5 w-7 shrink-0 rounded-sm object-cover shadow-sm"
            unoptimized
          />
        ) : (
          <Search className="h-5 w-5 shrink-0 text-gold" aria-hidden />
        )}
        <input
          ref={inputRef}
          id={listboxId}
          role="combobox"
          aria-expanded={open}
          aria-controls={`${listboxId}-list`}
          aria-autocomplete="list"
          autoComplete="off"
          placeholder={value ? value.name : "Search 200+ countries…"}
          value={open ? query : value?.name ?? ""}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className={cn(
            "min-w-0 flex-1 bg-transparent text-base focus:outline-none",
            isDark
              ? "text-white placeholder:text-white/55"
              : "text-navy placeholder:text-navy/45",
          )}
        />
        <ChevronDown
          className={cn(
            "h-5 w-5 transition-transform",
            isDark ? "text-white/50" : "text-navy/50",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id={`${listboxId}-list`}
            role="listbox"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-2 max-h-72 w-full overflow-auto rounded-2xl border border-foreground/8 bg-white py-2 shadow-[var(--shadow-elevated)]"
          >
            {loading ? (
              <li className="px-4 py-3 text-sm text-foreground/50">Loading countries…</li>
            ) : filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-foreground/50">No countries found</li>
            ) : (
              filtered.map((country, idx) => (
                <li
                  key={country.iso2}
                  role="option"
                  aria-selected={value?.iso2 === country.iso2}
                  onMouseEnter={() => setHighlight(idx)}
                  onClick={() => select(country)}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                    highlight === idx ? "bg-gold/10 text-navy" : "text-navy/80 hover:bg-cream",
                  )}
                >
                  <Image
                    src={flagUrl(country.iso2)}
                    alt=""
                    width={24}
                    height={16}
                    className="h-4 w-6 rounded-sm object-cover"
                    unoptimized
                  />
                  <span className="font-medium">{country.name}</span>
                </li>
              ))
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
