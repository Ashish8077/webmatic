/**
 * Storage Abstraction Layer
 *
 * Provider-agnostic file storage for the CMS. Supports multiple backends
 * (local filesystem, Cloudinary) with a unified interface. New providers
 * (S3, Azure, GCS) can be added by implementing {@link StorageProvider}.
 *
 * ## Usage
 *
 * ```ts
 * import {
 *   StorageFactory,
 *   STORAGE_DISK,
 *   type StorageProvider,
 *   type UploadOptions,
 * } from "@/shared/storage";
 *
 * // Create a provider (uses STORAGE_DRIVER env var)
 * const storage: StorageProvider = StorageFactory.create();
 *
 * // Or explicitly choose a disk
 * const local = StorageFactory.create(STORAGE_DISK.LOCAL);
 *
 * // Upload a file
 * const result = await storage.upload(buffer, {
 *   fileName: "a1b2c3d4.webp",
 *   originalName: "hero-banner.png",
 *   mimeType: "image/webp",
 *   folder: "2026/07",
 * });
 *
 * // Delete a file
 * await storage.delete(result.storagePath);
 * ```
 *
 * @module
 */

// ─── Contract ────────────────────────────────────────────────────────────────

export type { StorageProvider } from "./contracts/storage-provider";

// ─── Factory ─────────────────────────────────────────────────────────────────

export { StorageFactory } from "./storage-factory";

// ─── Types ───────────────────────────────────────────────────────────────────

export {
  STORAGE_DISK,
  type StorageDisk,
  type UploadOptions,
  type UploadResult,
  type FileMetadata,
  type StorageProviderConfig,
  type LocalStorageConfig,
  type CloudinaryConfig,
  type CloudinaryUploadOptions,
} from "./types";

// ─── Errors ──────────────────────────────────────────────────────────────────

export {
  StorageError,
  UploadFailedError,
  DeleteFailedError,
  FileNotFoundError,
  StorageConfigurationError,
} from "./errors";
