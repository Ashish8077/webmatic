import type { JsonObject } from "@/shared/types/json";
import type { PaginationMeta } from "@/shared/types/pagination";
import type { MediaDisk, MediaType } from "../constants/media.constants";

// ─── Domain Entity ───────────────────────────────────────────────────────────

/**
 * Domain entity representing a media record.
 *
 * All property names use camelCase. Dates are serialized as ISO 8601 strings.
 * This is what the repository returns after mapping raw database rows.
 * Consumers never see snake_case database column names.
 */
export interface Media {
  id: number;
  originalName: string;
  fileName: string;
  extension: string;
  mimeType: string;
  size: number;
  checksum: string | null;
  disk: MediaDisk;
  storagePath: string;
  folder: string | null;
  width: number | null;
  height: number | null;
  altText: string | null;
  caption: string | null;
  metadata: JsonObject | null;
  type: MediaType;
  providerFileId: string | null;
  uploadedBy: number | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// ─── Create Input ────────────────────────────────────────────────────────────

/**
 * Input for creating a new media record.
 *
 * Contains all fields needed to persist a complete media row.
 * The MediaService is responsible for populating this from the
 * storage layer's `UploadResult` combined with its own computed
 * data (checksum, dimensions, file type classification, etc.).
 */
export interface CreateMediaInput {
  originalName: string;
  fileName: string;
  extension: string;
  mimeType: string;
  size: number;
  checksum: string | null;
  disk: MediaDisk;
  storagePath: string;
  folder: string | null;
  width: number | null;
  height: number | null;
  altText: string | null;
  caption: string | null;
  metadata: JsonObject | null;
  type: MediaType;
  providerFileId: string | null;
  uploadedBy: number | null;
}

// ─── Update Input ────────────────────────────────────────────────────────────

/**
 * Input for updating editable media metadata.
 *
 * Only user-facing metadata fields are updatable. Immutable fields
 * such as `checksum`, `size`, `storagePath`, and `providerFileId`
 * cannot be changed through this interface.
 */
export interface UpdateMediaInput {
  altText?: string | null;
  caption?: string | null;
  folder?: string | null;
  metadata?: JsonObject | null;
}

// ─── List Response ───────────────────────────────────────────────────────────

export interface MediaListResponse {
  items: Media[];
  pagination: Omit<PaginationMeta, "pageSize"> & { limit: number };
}

