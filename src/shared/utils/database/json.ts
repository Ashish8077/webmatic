export function toJson(value: unknown): string | null {
  return value == null ? null : JSON.stringify(value);
}
