"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useLocale } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";

type ThemeToggleProps = {
  variant?: "transparent" | "light" | "navy";
};

export function ThemeToggle({ variant = "light" }: ThemeToggleProps) {
  const { theme, toggleTheme, ready } = useTheme();
  const { t } = useLocale();
  const isDarkChrome = variant === "transparent" || variant === "navy" || theme === "dark";
  const isDarkTheme = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "fiji-nav-icon-btn relative shrink-0 transition-colors duration-300 hover:text-gold",
        isDarkChrome ? "text-white" : "text-navy",
        !ready && "opacity-70",
      )}
      aria-label={isDarkTheme ? t.common.lightMode : t.common.darkMode}
      title={isDarkTheme ? t.common.lightMode : t.common.darkMode}
    >
      <span className="relative block h-4 w-4">
        <Sun
          className={cn(
            "absolute inset-0 h-4 w-4 transition-all duration-300",
            isDarkTheme ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0",
          )}
          strokeWidth={ds.navIconStroke}
          aria-hidden
        />
        <Moon
          className={cn(
            "absolute inset-0 h-4 w-4 transition-all duration-300",
            isDarkTheme ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100",
          )}
          strokeWidth={ds.navIconStroke}
          aria-hidden
        />
      </span>
    </button>
  );
}
