/**
 * In-Memory Sliding Window Rate Limiter
 * Protects redemption and admin endpoints against brute force and enumeration attacks.
 */

interface RateLimitEntry {
  timestamps: number[];
  failedAttempts: number[];
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup stale entries every 10 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    const expiry = 60 * 60 * 1000; // 1 hour
    const toDelete: string[] = [];

    rateLimitStore.forEach((entry, key) => {
      entry.timestamps = entry.timestamps.filter((t) => now - t < expiry);
      entry.failedAttempts = entry.failedAttempts.filter((t) => now - t < expiry);
      if (entry.timestamps.length === 0 && entry.failedAttempts.length === 0) {
        toDelete.push(key);
      }
    });

    toDelete.forEach((key) => {
      rateLimitStore.delete(key);
    });
  }, 10 * 60 * 1000).unref?.();
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetMs: number;
  reason?: string;
}

export function checkRateLimit(
  key: string,
  options: {
    maxRequests?: number;
    windowMs?: number;
    maxFailedAttempts?: number;
    failedWindowMs?: number;
  } = {}
): RateLimitResult {
  const maxRequests = options.maxRequests ?? 20; // 20 requests per window
  const windowMs = options.windowMs ?? 60 * 1000; // 1 minute
  const maxFailed = options.maxFailedAttempts ?? 8; // 8 failed attempts per 15 mins
  const failedWindowMs = options.failedWindowMs ?? 15 * 60 * 1000; // 15 minutes

  const now = Date.now();
  let entry = rateLimitStore.get(key);

  if (!entry) {
    entry = { timestamps: [], failedAttempts: [] };
    rateLimitStore.set(key, entry);
  }

  // Filter timestamps within windows
  entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs);
  entry.failedAttempts = entry.failedAttempts.filter((t) => now - t < failedWindowMs);

  // Check failed attempts lockout
  if (entry.failedAttempts.length >= maxFailed) {
    const oldestFailed = entry.failedAttempts[0];
    const resetMs = Math.max(0, failedWindowMs - (now - oldestFailed));
    return {
      allowed: false,
      remaining: 0,
      resetMs,
      reason: 'Too many failed redemption attempts. Please wait before trying again.',
    };
  }

  // Check general request rate
  if (entry.timestamps.length >= maxRequests) {
    const oldest = entry.timestamps[0];
    const resetMs = Math.max(0, windowMs - (now - oldest));
    return {
      allowed: false,
      remaining: 0,
      resetMs,
      reason: 'Rate limit exceeded. Please slow down your requests.',
    };
  }

  // Record this request
  entry.timestamps.push(now);

  return {
    allowed: true,
    remaining: maxRequests - entry.timestamps.length,
    resetMs: windowMs,
  };
}

export function recordFailedAttempt(key: string): void {
  const now = Date.now();
  let entry = rateLimitStore.get(key);
  if (!entry) {
    entry = { timestamps: [], failedAttempts: [] };
    rateLimitStore.set(key, entry);
  }
  entry.failedAttempts.push(now);
}

export function resetRateLimit(key: string): void {
  rateLimitStore.delete(key);
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  return '127.0.0.1';
}
