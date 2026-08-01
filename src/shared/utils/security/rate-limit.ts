import { env } from "@/config/env.server";
import { RateLimitError } from "../errors/rate-limit-error";

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

// Simple in-memory store for rate limiting (suitable for single-instance or basic limits)
const store = new Map<string, RateLimitRecord>();

export async function checkRateLimit(ip: string): Promise<void> {
  const now = Date.now();
  const windowMs = env.RATE_LIMIT_WINDOW_MS;
  const maxRequests = env.RATE_LIMIT_MAX_REQUESTS;

  let record = store.get(ip);

  if (!record || now > record.resetAt) {
    record = {
      count: 1,
      resetAt: now + windowMs,
    };
    store.set(ip, record);
    return;
  }

  record.count += 1;

  if (record.count > maxRequests) {
    throw new RateLimitError();
  }
}
