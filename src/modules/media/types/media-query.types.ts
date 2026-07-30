import type { PaginationQuery, SortOrder } from "@/shared/types/pagination";
import type {
  MediaDisk,
  MediaSortColumn,
  MediaType,
} from "../constants/media.constants";

// ─── Filters ─────────────────────────────────────────────────────────────────

/**
 * Filtering options for media queries.
 *
 * All fields are optional. When omitted, that filter is not applied.
 * Soft-deleted records are excluded by default unless `includeDeleted`
 * is explicitly set to `true`.
 */
export interface MediaFilters {
  /** Full-text search across `original_name` and `file_name`. */
  search?: string;

  /** Filter by media type (image, video, document, audio, other). */
  type?: MediaType;

  /** Filter by exact MIME type (e.g. "image/png"). */
  mimeType?: string;

  /** Filter by storage disk (local, cloudinary, s3). */
  disk?: MediaDisk;

  /** Filter by folder path. */
  folder?: string;

  /** Filter by the user who uploaded the file. */
  uploadedBy?: number;

  /** Include only records created on or after this date. */
  createdAfter?: Date;

  /** Include only records created on or before this date. */
  createdBefore?: Date;

  /** When `true`, includes soft-deleted records. Defaults to `false`. */
  includeDeleted?: boolean;
}

// ─── Sorting ─────────────────────────────────────────────────────────────────

/**
 * Sort configuration for media queries.
 * The `sortBy` field must be a key from the `MEDIA_SORT_COLUMNS` whitelist.
 */
export interface MediaSortOptions {
  /** Column to sort by. Must exist in the `MEDIA_SORT_COLUMNS` whitelist. */
  sortBy: MediaSortColumn;

  /** Sort direction: ascending or descending. */
  sortOrder: SortOrder;
}

// ─── Combined Query ──────────────────────────────────────────────────────────

/**
 * Combined query options for media listing.
 * Merges pagination, filtering, and sorting into a single interface
 * consumed by the repository's `findAllMedia` method.
 */
export interface MediaListQuery
  extends PaginationQuery,
    MediaFilters,
    MediaSortOptions {}
