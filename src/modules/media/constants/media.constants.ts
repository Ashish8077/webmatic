/** Supported media types matching the `type` column in the media table. */
export const MEDIA_TYPE = [
  "image",
  "video",
  "document",
  "audio",
  "other",
] as const;

export type MediaType = (typeof MEDIA_TYPE)[number];

/** Supported storage disks matching the `disk` column in the media table. */
export const MEDIA_DISK = ["local", "cloudinary", "s3"] as const;

export type MediaDisk = (typeof MEDIA_DISK)[number];

/**
 * Whitelisted sortable columns for safe ORDER BY clauses.
 *
 * Keys are the API-facing sort identifiers; values are the actual
 * SQL column names. Only columns in this map are accepted —
 * arbitrary ORDER BY values are rejected.
 */
export const MEDIA_SORT_COLUMNS = {
  original_name: "original_name",
  file_name: "file_name",
  size: "size",
  type: "type",
  created_at: "created_at",
  updated_at: "updated_at",
} as const;

export type MediaSortColumn = keyof typeof MEDIA_SORT_COLUMNS;

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const ALLOWED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];

export const ALLOWED_DOCUMENT_MIME_TYPES = [
  "application/pdf",
  "text/csv",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const ALLOWED_VIDEO_MIME_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

export const ALLOWED_UPLOAD_MIME_TYPES = [
  ...ALLOWED_IMAGE_MIME_TYPES,
  ...ALLOWED_DOCUMENT_MIME_TYPES,
  ...ALLOWED_VIDEO_MIME_TYPES,
];
