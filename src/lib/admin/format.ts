export function formatCurrency(
  amount: number,
  currency = "FJD",
  compact = false,
): string {
  if (compact && amount >= 1000) {
    return new Intl.NumberFormat("en-FJ", {
      style: "currency",
      currency,
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(amount);
  }
  return new Intl.NumberFormat("en-FJ", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(n: number, compact = false): string {
  if (compact && n >= 1000) {
    return new Intl.NumberFormat("en", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(n);
  }
  return new Intl.NumberFormat("en").format(n);
}

export function formatPercent(n: number, signed = false): string {
  const prefix = signed && n > 0 ? "+" : "";
  return `${prefix}${n.toFixed(1)}%`;
}

export function formatDate(iso: string, style: "short" | "medium" = "medium") {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: style,
  }).format(new Date(iso));
}

export function formatDateTime(iso: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(iso, "short");
}
