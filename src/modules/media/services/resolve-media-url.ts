import { findMediaById } from "@/modules/media/repositories/media.repository";
import { StorageFactory } from "@/shared/storage/storage-factory";

export interface ResolvedMediaUrl {
  url: string;
  altText: string | null;
}

/**
 * Resolves a media ID into a public URL using the existing storage abstraction.
 * Returns null if the ID is null/undefined or the media record doesn't exist.
 */
export async function resolveMediaUrl(
  id: number | null | undefined,
): Promise<ResolvedMediaUrl | null> {
  if (!id) return null;

  const media = await findMediaById(id);
  if (!media) return null;

  const storage = StorageFactory.create();
  return {
    url: storage.getUrl(media.storagePath),
    altText: media.altText ?? null,
  };
}
