/** Env-only DB check — safe for server modules (no Node fs imports). */
export function isDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL?.trim();
  return Boolean(url && !url.startsWith("file:"));
}
