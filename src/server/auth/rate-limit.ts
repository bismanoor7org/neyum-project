type AttemptRecord = {
  count: number;
  resetAt: number;
};

const attempts = new Map<string, AttemptRecord>();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

export function checkRateLimit(key: string): { allowed: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const record = attempts.get(key);

  if (!record || now > record.resetAt) {
    attempts.set(key, { count: 0, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= MAX_ATTEMPTS) {
    return {
      allowed: false,
      retryAfterSec: Math.ceil((record.resetAt - now) / 1000),
    };
  }

  return { allowed: true };
}

export function recordFailedAttempt(key: string): void {
  const now = Date.now();
  const record = attempts.get(key);

  if (!record || now > record.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }

  record.count += 1;
  attempts.set(key, record);
}

export function clearRateLimit(key: string): void {
  attempts.delete(key);
}

export function rateLimitKey(ip: string, email: string): string {
  return `${ip}:${email.toLowerCase().trim()}`;
}
