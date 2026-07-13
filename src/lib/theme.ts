export const THEME_STORAGE_KEY = "neyum-theme";

export type ThemePreference = "light" | "dark";

export function getSystemTheme(): ThemePreference {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function readStoredTheme(): ThemePreference | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* private browsing */
  }
  return null;
}

export function resolveTheme(stored: ThemePreference | null): ThemePreference {
  return stored ?? "light";
}

export function applyTheme(theme: ThemePreference) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

export function persistTheme(theme: ThemePreference) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
}
