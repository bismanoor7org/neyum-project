export type DayInsight =
  | "best-season"
  | "public-holiday"
  | "peak"
  | "low-price";

export interface CalendarDayMeta {
  insights: DayInsight[];
  label?: string;
}

/** Fiji public holidays — 2026 & 2027 */
const PUBLIC_HOLIDAYS: Record<string, string> = {
  "2026-01-01": "New Year's Day",
  "2026-04-03": "Good Friday",
  "2026-04-06": "Easter Monday",
  "2026-09-07": "Father's Day",
  "2026-10-10": "Fiji Day",
  "2026-12-25": "Christmas Day",
  "2026-12-26": "Boxing Day",
  "2027-01-01": "New Year's Day",
  "2027-04-02": "Good Friday",
  "2027-04-05": "Easter Monday",
  "2027-09-06": "Father's Day",
  "2027-10-10": "Fiji Day",
  "2027-12-25": "Christmas Day",
  "2027-12-26": "Boxing Day",
};

function isoDate(y: number, m: number, d: number) {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function isBestSeason(month: number) {
  return month >= 5 && month <= 10;
}

function isPeakMonth(month: number, day: number) {
  if (month >= 6 && month <= 8) return true;
  if (month === 12 && day >= 15) return true;
  if (month === 1 && day <= 10) return true;
  return false;
}

function isLowPriceMonth(month: number) {
  return month === 2 || month === 3 || month === 11;
}

export function getDayMeta(date: Date): CalendarDayMeta {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const key = isoDate(y, m, d);
  const insights: DayInsight[] = [];

  if (isBestSeason(m)) insights.push("best-season");
  if (isPeakMonth(m, d)) insights.push("peak");
  if (isLowPriceMonth(m)) insights.push("low-price");
  if (PUBLIC_HOLIDAYS[key]) insights.push("public-holiday");

  return {
    insights,
    label: PUBLIC_HOLIDAYS[key],
  };
}

export const CALENDAR_LEGEND: { id: DayInsight; label: string; color: string }[] = [
  { id: "best-season", label: "Best season", color: "bg-teal/80" },
  { id: "public-holiday", label: "Public holiday", color: "bg-gold" },
  { id: "peak", label: "Peak travel", color: "bg-white/50" },
  { id: "low-price", label: "Lowest prices", color: "bg-emerald-400/70" },
];

export function formatDisplayDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateRange(checkIn: string | null, checkOut: string | null): string {
  if (!checkIn && !checkOut) return "";
  if (checkIn && !checkOut) return formatDisplayDate(checkIn);
  if (checkIn && checkOut) {
    const a = new Date(`${checkIn}T12:00:00`);
    const b = new Date(`${checkOut}T12:00:00`);
    const sameYear = a.getFullYear() === b.getFullYear();
    const inStr = a.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      ...(sameYear ? {} : { year: "numeric" }),
    });
    const outStr = b.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return `${inStr} – ${outStr}`;
  }
  return "";
}

export function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + days);
  return isoDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
}

export function daysBetween(checkIn: string, checkOut: string): number {
  const a = new Date(`${checkIn}T12:00:00`).getTime();
  const b = new Date(`${checkOut}T12:00:00`).getTime();
  return Math.round((b - a) / 86400000);
}

export function isPastDate(iso: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(`${iso}T12:00:00`);
  return d < today;
}

export function startOfMonth(year: number, month: number) {
  return new Date(year, month, 1);
}

export function getCalendarGrid(year: number, month: number): (Date | null)[] {
  const first = startOfMonth(year, month);
  const startDay = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];

  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  return cells;
}
