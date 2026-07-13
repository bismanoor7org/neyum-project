"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search } from "lucide-react";
import { ALL_CMS_MODULES } from "@/lib/cms/modules";

export function CmsCommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router],
  );

  const items = useMemo(() => ALL_CMS_MODULES, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-navy/40 px-4 pt-[12vh] backdrop-blur-sm">
      <Command
        className="admin-card w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl"
        label="CMS command palette"
      >
        <div className="flex items-center gap-2 border-b border-[var(--border)] px-3">
          <Search className="h-4 w-4 text-navy/40" />
          <Command.Input
            autoFocus
            placeholder="Jump to module… (Ctrl+K)"
            className="h-12 w-full bg-transparent text-sm outline-none"
          />
        </div>
        <Command.List className="max-h-80 overflow-auto p-2">
          <Command.Empty className="px-3 py-6 text-center text-sm text-navy/50">No results.</Command.Empty>
          <Command.Group heading="CMS modules" className="px-1 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
            {items.map((m) => (
              <Command.Item
                key={m.id}
                value={`${m.label} ${m.description}`}
                onSelect={() => go(m.href)}
                className="flex cursor-pointer flex-col rounded-lg px-3 py-2 text-sm aria-selected:bg-gold/10"
              >
                <span className="font-medium text-navy">{m.label}</span>
                <span className="text-xs text-navy/55">{m.description}</span>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command>
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 -z-10"
        onClick={() => setOpen(false)}
      />
    </div>
  );
}
