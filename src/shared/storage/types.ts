// ─── Storage Disk Constants ──────────────────────────────────────────────────

/**
 * Supported storage disk identifiers.
 *
 * Use these constants instead of raw strings throughout the codebase
 * to avoid typos and enable safe refactoring.
 *
 * @example
 * ```ts
 * import { STORAGE_DISK } from "@/shared/storage";
 *
 * const storage = StorageFactory.create(STORAGE_DISK.CLOUDINARY);
 * ```
 */
export const STORAGE_DISK = {
  LOCAL: "local",
  CLOUDINARY: "cloudinary",
  S3: "s3",
} as const;

/**
 * Union of all supported storage disk identifiers.
 * Derived from {@link STORAGE_DISK} to ensure type safety.
 */
export type StorageDisk = (typeof STORAGE_DISK)[keyof typeof STORAGE_DISK];

// ─── Upload Options ──────────────────────────────────────────────────────────

/**
 * Options for uploading a file to a storage provider.
 *
 * The provider stores exactly what it receives — it does not validate
 * MIME types, generate filenames, or compute checksums. Those responsibilities
 * belong to the MediaService.
 *
 * @template TProviderOptions - Provider-specific options type for full
 *   TypeScript safety. Defaults to `unknown` for provider-agnostic usage.
 *
 * @example
 * ```ts
 * // Provider-agnostic (via StorageProvider interface)
 * const options: UploadOptions = { fileName: "abc.webp", ... };
 *
 * // Provider-specific (direct Cloudinary usage)
 * const options: UploadOptions<CloudinaryUploadOptions> = {
 *   fileName: "abc.webp",
 *   providerOptions: { tags: ["hero"] },
 *   ...
 * };
 * ```
 */
export interface UploadOptions<TProviderOptions = unknown> {
  /**
   * Desired filename including extension (e.g. "a1b2c3d4.webp").
   * The provider stores this as-is without modification.
   * Filename generation is the MediaService's responsibility.
   */
  fileName: string;

  /**
   * Original filename from the user's upload (e.g. "hero-banner.png").
   * Preserved for metadata purposes; the provider does not use this
   * to determine the stored filename.
   */
  originalName: string;

  /**
   * MIME type of the file (e.g. "image/webp").
   * The provider does not validate this value.
   * MIME validation is the MediaService's responsibility.
   */
  mimeType: string;

  /**
   * Target folder path (e.g. "2026/07" or "avatars/2026").
   * If omitted, the file is stored at the provider's root level.
   */
  folder?: string;

  /**
   * Whether to overwrite an existing file at the target path.
   * Defaults to `false`.
   */
  overwrite?: boolean;

  /**
   * Provider-specific upload options for capabilities beyond the
   * common interface (e.g. Cloudinary transformations, S3 ACLs).
   *
   * Type-safe when used with a concrete provider type parameter.
   */
  providerOptions?: TProviderOptions;
}

// ─── Upload Result ───────────────────────────────────────────────────────────

/**
 * Result returned by a storage provider after a successful upload.
 *
 * Contains **only storage-level information**. Database concepts like
 * `disk`, `folder`, `checksum`, `extension`, and `type` are not included —
 * the MediaService builds the full Media entity by combining this result
 * with its own data.
 */
export interface UploadResult {
  /** Full public URL of the stored file. */
  url: string;

  /**
   * Storage path used for future operations (`delete`, `exists`, `getUrl`).
   *
   * - **Local:** Relative path from the base directory (e.g. "2026/07/abc.webp").
   * - **Cloudinary:** The asset's `public_id` (e.g. "2026/07/abc").
   */
  storagePath: string;

  /**
   * Provider-specific file identifier.
   *
   * - **Cloudinary:** The `public_id` of the uploaded asset.
   * - **Local:** `null` (no separate identifier needed).
   * - **S3 (future):** The object key.
   */
  providerFileId: string | null;

  /** File size in bytes as reported by the storage provider. */
  size: number;

  /**
   * Image width in pixels.
   * Returned naturally by providers like Cloudinary; `null` for providers
   * that don't extract dimensions (e.g. local storage).
   */
  width: number | null;

  /**
   * Image height in pixels.
   * Returned naturally by providers like Cloudinary; `null` for providers
   * that don't extract dimensions (e.g. local storage).
   */
  height: number | null;

  /**
   * Entity tag for cache validation.
   * Returned by providers like Cloudinary and S3.
   */
  etag?: string;

  /**
   * Provider-specific version identifier.
   *
   * - **Cloudinary:** Numeric version (e.g. `1719744000`).
   * - **S3 (future):** Version ID string.
   */
  version?: string | number;
}

// ─── File Metadata ───────────────────────────────────────────────────────────

/**
 * Lightweight file metadata shape for provider responses.
 */
export interface FileMetadata {
  /** File size in bytes. */
  size: number;

  /** Image width in pixels, or `null` for non-image files. */
  width: number | null;

  /** Image height in pixels, or `null` for non-image files. */
  height: number | null;
}

// ─── Provider Configuration ─────────────────────────────────────────────────

/**
 * Base configuration shared by all storage providers.
 * Extended by each provider's specific config interface.
 */
export interface StorageProviderConfig {
  /** The storage disk this provider manages. */
  disk: StorageDisk;
}

/**
 * Configuration for the local filesystem storage provider.
 * Injected via the constructor — providers never read `process.env`.
 */
export interface LocalStorageConfig extends StorageProviderConfig {
  disk: "local";

  /**
   * Absolute filesystem path where files are stored.
   * @example "/app/public/uploads" or "C:/project/public/uploads"
   */
  basePath: string;

  /**
   * Public URL prefix for generating file URLs.
   * @example "http://localhost:3000/uploads"
   */
  baseUrl: string;
}

/**
 * Configuration for the Cloudinary storage provider.
 * Injected via the constructor — providers never read `process.env`.
 */
export interface CloudinaryConfig extends StorageProviderConfig {
  disk: "cloudinary";

  /** Cloudinary cloud name. */
  cloudName: string;

  /** Cloudinary API key. */
  apiKey: string;

  /** Cloudinary API secret. */
  apiSecret: string;
}

// ─── Provider-Specific Upload Options ────────────────────────────────────────

/**
 * Cloudinary-specific upload options.
 *
 * Passed via the `providerOptions` field of {@link UploadOptions} when
 * using `CloudinaryStorageProvider` for full type safety.
 *
 * @example
 * ```ts
 * const options: UploadOptions<CloudinaryUploadOptions> = {
 *   fileName: "hero.webp",
 *   originalName: "hero-banner.png",
 *   mimeType: "image/webp",
 *   folder: "banners/2026",
 *   providerOptions: {
 *     tags: ["hero", "homepage"],
 *     resourceType: "image",
 *   },
 * };
 * ```
 */
export interface CloudinaryUploadOptions {
  /** Cloudinary transformation options applied during upload. */
  transformation?: Record<string, unknown>;

  /** Tags to associate with the uploaded asset. */
  tags?: string[];

  /**
   * Override the generated `public_id`.
   * If omitted, the provider builds it from `folder` + `fileName`.
   */
  publicId?: string;

  /**
   * Cloudinary resource type.
   * Defaults to `"auto"` for automatic detection.
   */
  resourceType?: "image" | "video" | "raw" | "auto";
}
