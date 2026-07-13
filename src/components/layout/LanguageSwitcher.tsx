"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { LANGUAGES } from "@/lib/constants";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useLocale } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";

type LanguageSwitcherProps = {
  variant?: "transparent" | "light" | "navy";
};

export function LanguageSwitcher({ variant = "light" }: LanguageSwitcherProps) {
  const { theme: colorTheme } = useTheme();
  const isDark = variant === "transparent" || variant === "navy" || colorTheme === "dark";
  const { language, setLanguage, t } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="fiji-nav-lang-switcher relative shrink-0">
      <button
        type="button"
        className={cn(
          "fiji-nav-pill-btn fiji-nav-pill-btn--ghost fiji-nav-lang-trigger whitespace-nowrap hover:opacity-90",
          isDark ? "text-white" : "text-navy",
        )}
        aria-label={t.common.selectLanguage}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Globe className={ds.navIcon} strokeWidth={ds.navIconStroke} />
        <span className="fiji-nav-lang-code hidden sm:inline">{language.code}</span>
        <ChevronDown
          className={cn(
            "fiji-nav-lang-chevron h-4 w-4 shrink-0 transition-transform duration-200",
            open && "rotate-180",
          )}
          strokeWidth={ds.navIconStroke}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+0.5rem)] z-[60] min-w-[11rem] overflow-hidden rounded-xl border border-foreground/10 bg-[var(--card-elevated)] shadow-lg">
          <ul
            role="listbox"
            aria-label={t.common.languages}
            className="max-h-[min(20rem,70vh)] overflow-y-auto py-1"
          >
          {LANGUAGES.map((lang) => {
            const isSelected = lang.code === language.code;

            return (
              <li key={lang.code} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors",
                    isSelected
                      ? "bg-cream-alt font-semibold text-foreground"
                      : "font-normal text-foreground/85 hover:bg-cream-muted",
                  )}
                  onClick={() => {
                    setLanguage(lang);
                    setOpen(false);
                  }}
                >
                  <span>{lang.label}</span>
                  <span
                    className={cn(
                      "text-xs uppercase",
                      isSelected ? "text-gold" : "text-foreground/50",
                    )}
                  >
                    {lang.code}
                  </span>
                </button>
              </li>
            );
          })}
          </ul>
        </div>
      )}
    </div>
  );
}
