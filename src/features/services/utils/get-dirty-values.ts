/**
 * Extracts only the dirty (user-modified) fields from a form's values.
 *
 * React Hook Form's `dirtyFields` is a mirror of the form values where each
 * leaf field is `true` if the user touched it, and nested objects / arrays
 * retain their structure. This utility walks that shape and picks matching
 * values from `allValues`, producing a minimal PATCH payload.
 */
export function getDirtyValues<T extends Record<string, unknown>>(
  dirtyFields: Record<string, unknown>,
  allValues: T,
): Partial<T> {
  const dirtyValues: Record<string, unknown> = {};

  for (const key of Object.keys(dirtyFields)) {
    const dirty = dirtyFields[key];

    if (dirty === true) {
      // Primitive field that was touched
      dirtyValues[key] = allValues[key as keyof T];
    } else if (typeof dirty === "object" && dirty !== null) {
      // Nested object or array — include the whole current value so the
      // backend receives a complete replacement (e.g. faq, keyFeatures).
      dirtyValues[key] = allValues[key as keyof T];
    }
  }

  return dirtyValues as Partial<T>;
}
