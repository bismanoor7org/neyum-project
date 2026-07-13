import "server-only";

type HitRecord = {
  count: number;
  resetAt: number;
};

const hits = new Map<string, HitRecord>();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 40;

export function checkVisaAssistantRateLimit(ip: string): {
  allowed: boolean;
  retryAfterSec?: number;
} {
  const key = ip || "unknown";
  const now = Date.now();
  const record = hits.get(key);

  if (!record || now > record.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSec: Math.ceil((record.resetAt - now) / 1000),
    };
  }

  record.count += 1;
  hits.set(key, record);
  return { allowed: true };
}

export function clientIpFromRequest(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}
