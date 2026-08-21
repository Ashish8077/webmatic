/**
 * Internal path utilities for the storage module.
 *
 * These functions ensure consistent path handling across providers
 * and operating systems. All storage paths use forward slashes (`/`)
 * regardless of the host OS.
 *
 * @module
 */

/**
 * Normalize a folder path for consistent storage across providers.
 *
 * - Replaces backslashes with forward slashes
 * - Collapses consecutive slashes
 * - Removes leading and trailing slashes
 *
 * @param folder - Raw folder path to normalize.
 * @returns Normalized folder path, or empty string if input is empty/undefined.
 *
 * @example
 * ```ts
 * normalizeFolder("//uploads\\images//")  // → "uploads/images"
 * normalizeFolder("/2026/07/")            // → "2026/07"
 * normalizeFolder(undefined)              // → ""
 * normalizeFolder("")                     // → ""
 * ```
 */
export function normalizeFolder(folder?: string): string {
  if (!folder) return "";

  return folder
    .replace(/\\/g, "/")
    .replace(/\/+/g, "/")
    .replace(/^\/|\/$/g, "");
}

/**
 * Join a folder and filename into a normalized storage path.
 *
 * Always uses forward slashes regardless of OS. This ensures consistent
 * storage paths across Windows and Unix environments.
 *
 * @param folder - Target folder (will be normalized). Can be `undefined`.
 * @param fileName - Filename including extension.
 * @returns Forward-slash-separated storage path.
 *
 * @example
 * ```ts
 * joinStoragePath("2026/07", "abc123.webp")          // → "2026/07/abc123.webp"
 * joinStoragePath(undefined, "abc123.webp")           // → "abc123.webp"
 * joinStoragePath("uploads\\images", "photo.jpg")     // → "uploads/images/photo.jpg"
 * joinStoragePath("", "file.pdf")                     // → "file.pdf"
 * ```
 */
export function joinStoragePath(
  folder: string | undefined,
  fileName: string,
): string {
  const normalized = normalizeFolder(folder);

  if (!normalized) return fileName;

  return `${normalized}/${fileName}`;
}

/**
 * Normalize a storage path for consistent operations.
 *
 * Ensures the path uses forward slashes, has no duplicate slashes,
 * and no leading or trailing slashes.
 *
 * @param storagePath - Raw storage path to normalize.
 * @returns Normalized path with forward slashes.
 *
 * @example
 * ```ts
 * normalizeStoragePath("\\uploads\\2026//07\\file.jpg")  // → "uploads/2026/07/file.jpg"
 * normalizeStoragePath("/leading/slash/")                 // → "leading/slash"
 * ```
 */
export function normalizeStoragePath(storagePath: string): string {
  return storagePath
    .replace(/\\/g, "/")
    .replace(/\/+/g, "/")
    .replace(/^\/|\/$/g, "");
}
