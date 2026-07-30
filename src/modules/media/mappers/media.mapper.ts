import type { Media } from "../types/media.types";
import type { MediaRow } from "../types/media-repository.types";

/**
 * Maps a single raw database row into a Media domain entity.
 *
 * This function acts as the single source of truth for converting
 * snake_case database columns into camelCase properties and serializing
 * native `Date` objects into ISO 8601 strings.
 *
 * @param row The raw database row from the `media` table.
 * @returns The mapped `Media` domain entity.
 */
export function toMedia(row: MediaRow): Media {
  return {
    id: row.id,
    originalName: row.original_name,
    fileName: row.file_name,
    extension: row.extension,
    mimeType: row.mime_type,
    size: row.size,
    checksum: row.checksum,
    disk: row.disk,
    storagePath: row.storage_path,
    folder: row.folder,
    width: row.width,
    height: row.height,
    altText: row.alt_text,
    caption: row.caption,
    metadata: row.metadata,
    type: row.type,
    providerFileId: row.provider_file_id,
    uploadedBy: row.uploaded_by,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
    deletedAt: row.deleted_at?.toISOString() ?? null,
  };
}

/**
 * Maps an array of raw database rows into an array of Media domain entities.
 *
 * @param rows An array of raw database rows from the `media` table.
 * @returns An array of mapped `Media` domain entities.
 */
export function toMediaList(rows: MediaRow[]): Media[] {
  return rows.map((row) => toMedia(row));
}
