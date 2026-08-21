/**
 * Safe string extractor for unknown JSON content values.
 * Returns `fallback` when the value is not a string.
 */
export function str(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

/**
 * Safe array extractor for unknown JSON content values.
 * Returns an empty array when the value is not an array.
 */
export function arr<T = unknown>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

/**
 * Safe plain-object extractor for unknown JSON content values.
 * Returns null when the value is not a non-null, non-array object.
 */
export function obj(value: unknown): Record<string, unknown> | null {
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

/**
 * Safe number extractor for unknown JSON content values.
 * Returns `fallback` when the value is not a number.
 */
export function num(value: unknown, fallback = 0): number {
  return typeof value === "number" ? value : fallback;
}
