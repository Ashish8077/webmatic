/**
 * Application Logger.
 * Currently wraps console methods but can be swapped out for winston, pino, etc.
 */
export const logger = {
  info: (message: string, ...meta: unknown[]) => console.info(`[INFO] ${message}`, ...meta),
  warn: (message: string, ...meta: unknown[]) => console.warn(`[WARN] ${message}`, ...meta),
  error: (message: string, ...meta: unknown[]) => console.error(`[ERROR] ${message}`, ...meta),
  debug: (message: string, ...meta: unknown[]) => console.debug(`[DEBUG] ${message}`, ...meta),
};
