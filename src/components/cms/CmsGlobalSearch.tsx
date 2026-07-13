"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";

type SearchHit = {
  id: string;
  type: string;
  title: string;
  subtitle?: string;
  href: string;
  status?: string;
};

export function CmsGlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchHit[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    const t = window.setTimeout(() => {
      setLoading(true);
      fetch(`/api/v1/admin/cms/search?q=${encodeURIComponent(query)}`, { credentials: "include" })
        .then((r) => r.json())
        .then((j) => setResults(j.data?.results ?? []))
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
    }, 250);
    return () => window.clearTimeout(t);
  }, [query]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative mb-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search content, bookings, SEO…"
          className="admin-input w-full pl-9"
        />
      </div>
      {open && query.length >= 2 && (
        <div className="admin-card absolute z-50 mt-1 max-h-80 w-full overflow-auto rounded-xl shadow-lg">
          {loading && <p className="admin-text-subtle px-4 py-3 text-sm">Searching…</p>}
          {!loading && results.length === 0 && (
            <p className="admin-text-subtle px-4 py-3 text-sm">No results for &ldquo;{query}&rdquo;</p>
          )}
          {results.map((hit) => (
            <Link
              key={`${hit.type}-${hit.id}`}
              href={hit.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between gap-3 border-t border-black/5 px-4 py-3 first:border-t-0 hover:bg-black/[0.03]"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{hit.title}</p>
                <p className="admin-text-subtle truncate text-xs capitalize">
                  {hit.type}
                  {hit.subtitle ? ` · ${hit.subtitle}` : ""}
                </p>
              </div>
              {hit.status && <StatusBadge status={hit.status} />}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
