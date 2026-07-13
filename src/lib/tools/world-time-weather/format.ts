import type { TimeDifferenceInfo } from "./types";

export function formatTimeInTimezone(
  timezone: string,
  date = new Date(),
  withSeconds = false,
): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "numeric",
    minute: "2-digit",
    second: withSeconds ? "2-digit" : undefined,
    hour12: true,
  }).format(date);
}

export function formatDateInTimezone(timezone: string, date = new Date()): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatShortDateInTimezone(timezone: string, date = new Date()): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function formatTimezoneLabel(timezone: string, date = new Date()): string {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    timeZoneName: "longOffset",
  });
  const parts = formatter.formatToParts(date);
  const offset = parts.find((p) => p.type === "timeZoneName")?.value ?? "";
  const short = timezone.replace(/_/g, " ").replace(/\//g, " — ");
  return offset ? `${short} (${offset})` : short;
}

export function getTimezoneOffsetMinutes(timezone: string, date = new Date()): number {
  const utc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? "0");
  const local = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
    get("second"),
  );
  return Math.round((local - utc) / 60_000);
}

export function formatUtcOffset(timezone: string, date = new Date()): string {
  const minutes = getTimezoneOffsetMinutes(timezone, date);
  const sign = minutes >= 0 ? "+" : "-";
  const abs = Math.abs(minutes);
  const hours = Math.floor(abs / 60);
  const mins = abs % 60;
  return mins === 0
    ? `UTC${sign}${String(hours).padStart(2, "0")}:00`
    : `UTC${sign}${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

export function getDaylightSavingStatus(timezone: string, date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    timeZoneName: "long",
  }).formatToParts(date);
  const name = parts.find((p) => p.type === "timeZoneName")?.value ?? "";
  if (/daylight/i.test(name)) return "Daylight Saving Time";
  if (/standard/i.test(name)) return "Standard Time";

  const winterOffset = getTimezoneOffsetMinutes(
    timezone,
    new Date(date.getFullYear(), 0, 15),
  );
  const currentOffset = getTimezoneOffsetMinutes(timezone, date);
  return currentOffset !== winterOffset ? "Daylight Saving Time" : "Standard Time";
}

export function formatTemperature(celsius: number): string {
  return `${Math.round(celsius)}°C`;
}

export function formatWindSpeed(kmh: number): string {
  return `${Math.round(kmh)} km/h`;
}

export function formatHumidity(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatSunTime(iso: string, timezone: string): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function computeTimeDifference(
  userTimezone: string,
  userLabel: string,
  selectedTimezone: string,
  selectedLabel: string,
  date = new Date(),
): TimeDifferenceInfo {
  const userOffset = getTimezoneOffsetMinutes(userTimezone, date);
  const selectedOffset = getTimezoneOffsetMinutes(selectedTimezone, date);
  const diffMinutes = selectedOffset - userOffset;
  const diffHours = diffMinutes / 60;
  const absHours = Math.abs(diffHours);

  let direction: TimeDifferenceInfo["direction"] = "same";
  let differenceLabel = "Same time";
  if (diffMinutes > 0) {
    direction = "ahead";
    differenceLabel = `${formatHourDifference(absHours)} ahead`;
  } else if (diffMinutes < 0) {
    direction = "behind";
    differenceLabel = `${formatHourDifference(absHours)} behind`;
  }

  return {
    userTimezone,
    userLabel,
    selectedTimezone,
    selectedLabel,
    userTime: formatTimeInTimezone(userTimezone, date),
    selectedTime: formatTimeInTimezone(selectedTimezone, date),
    differenceHours: diffHours,
    differenceLabel,
    direction,
    bestTimeToContact: suggestContactWindow(userTimezone, selectedTimezone, date),
  };
}

function formatHourDifference(hours: number): string {
  const whole = Math.floor(hours);
  const mins = Math.round((hours - whole) * 60);
  if (whole === 0) return `${mins} min`;
  if (mins === 0) return whole === 1 ? "1 hour" : `${whole} hours`;
  return `${whole}h ${mins}m`;
}

function suggestContactWindow(
  userTz: string,
  selectedTz: string,
  date: Date,
): string {
  const userOffset = getTimezoneOffsetMinutes(userTz, date);
  const selectedOffset = getTimezoneOffsetMinutes(selectedTz, date);

  for (let hour = 9; hour <= 17; hour++) {
    const userLocalMinutes = hour * 60;
    const selectedLocalMinutes = userLocalMinutes + (selectedOffset - userOffset);
    const selectedHour = Math.floor(selectedLocalMinutes / 60);
    if (selectedHour >= 9 && selectedHour <= 18) {
      const endHour = Math.min(17, hour + 2);
      const userStart = formatHourLabel(hour);
      const userEnd = formatHourLabel(endHour);
      const selStart = formatHourLabel(selectedHour);
      const selEndMin = selectedLocalMinutes + (endHour - hour) * 60;
      const selEnd = formatHourLabel(Math.floor(selEndMin / 60), Math.round(selEndMin % 60));
      return `Your ${userStart}–${userEnd} · Their ${selStart}–${selEnd}`;
    }
  }
  return "Early morning or late afternoon may work best — check both local business hours.";
}

function formatHourLabel(hour: number, minutes = 0): string {
  const totalMinutes = hour * 60 + minutes;
  const h = ((Math.floor(totalMinutes / 60) % 24) + 24) % 24;
  const m = ((totalMinutes % 60) + 60) % 60;
  const period = h >= 12 ? "PM" : "AM";
  const display = h % 12 === 0 ? 12 : h % 12;
  if (m === 0) return `${display}${period}`;
  return `${display}:${String(m).padStart(2, "0")}${period}`;
}

export function friendlyTimezoneName(timezone: string): string {
  return timezone.replace(/_/g, " ").replace(/\//g, " — ");
}
