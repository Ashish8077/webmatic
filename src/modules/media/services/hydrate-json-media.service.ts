
import { findMediaById } from "../repositories/media.repository";
import { StorageFactory } from "@/shared/storage/storage-factory";

/**
 * Recursively scans a JSON object for keys ending in "Id" (e.g. imageId, backgroundImageId).
 * If a valid media ID is found, fetches the media and attaches it to the parent object
 * (e.g. populates `image` for `imageId`).
 * 
 * Note: This implementation fetches sequentially/concurrently. For a huge tree,
 * a batch fetch is better, but since sections are small, Promise.all is fine.
 */
export async function hydrateJsonMedia(content: unknown): Promise<unknown> {
  if (!content || typeof content !== "object") {
    return content;
  }

  if (Array.isArray(content)) {
    return Promise.all(content.map(item => hydrateJsonMedia(item)));
  }

  const result = { ...content } as Record<string, unknown>;
  const storage = StorageFactory.create();
  const keys = Object.keys(result);

  for (const key of keys) {
    const value = result[key];

    // Recurse for nested objects/arrays
    if (value && typeof value === "object") {
      result[key] = await hydrateJsonMedia(value);
    } 
    // If we find an ID field that looks like a media reference
    else if (
      typeof key === "string" && 
      key.endsWith("Id") && 
      typeof value === "number"
    ) {
      // Create the target key (e.g., 'imageId' -> 'image')
      const targetKey = key.replace(/Id$/, "");
      
      // Only attach if it's a known media-related key
      if (
        ["image", "backgroundImage", "iconImage", "profileImage", "featuredImage", "bannerImage", "ogImage", "twitterImage"].includes(targetKey) || 
        targetKey.toLowerCase().includes("image")
      ) {
        try {
          const media = await findMediaById(value);
          if (media) {
            result[targetKey] = {
              ...media,
              url: storage.getUrl(media.storagePath)
            };
          }
        } catch {
          // Ignore fetch errors for missing media
        }
      }
    }
  }

  return result;
}
