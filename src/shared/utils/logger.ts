/**
 * Application Logger.
 * Currently wraps console methods but can be swapped out for winston, pino, etc.
 */
export const logger = {
  info: (message: string, ...meta: any[]) => console.info(`[INFO] ${message}`, ...meta),
  warn: (message: string, ...meta: any[]) => console.warn(`[WARN] ${message}`, ...meta),
  error: (message: string, ...meta: any[]) => console.error(`[ERROR] ${message}`, ...meta),
  debug: (message: string, ...meta: any[]) => console.debug(`[DEBUG] ${message}`, ...meta),
};
