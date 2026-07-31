import { Media } from "../types";

/**
 * Global helper to extract the appropriate URL from a Media object.
 * This provides a single extension point for future optimization or CDN support.
 * 
 * @param media The media object (or null/undefined)
 * @returns The resolved URL or null if no valid media exists
 */
export function getMediaUrl(media: Media | null | undefined): string | null {
  if (!media) return null;
  return media.url || media.storagePath || null;
}
