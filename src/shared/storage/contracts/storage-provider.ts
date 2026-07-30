import type { UploadOptions, UploadResult, StorageDisk } from "../types";

/**
 * Contract that all storage providers must implement.
 *
 * Providers are responsible **only** for storing, deleting, and locating files.
 * They must **not**:
 * - Validate MIME types or file content
 * - Generate filenames or business identifiers
 * - Calculate checksums
 * - Extract image metadata (dimensions, EXIF, etc.)
 * - Interact with databases or repositories
 * - Read environment variables (config is injected via constructor)
 *
 * Concrete implementations (`LocalStorageProvider`, `CloudinaryStorageProvider`)
 * are not intended to be subclassed. To add a new storage backend (e.g. S3),
 * implement this interface directly.
 *
 * @example
 * ```ts
 * import { StorageFactory, type StorageProvider } from "@/shared/storage";
 *
 * const storage: StorageProvider = StorageFactory.create();
 * const result = await storage.upload(buffer, options);
 * ```
 */
export interface StorageProvider {
  /**
   * The storage disk this provider represents.
   */
  readonly disk: StorageDisk;

  /**
   * Store a file buffer at the target location.
   *
   * The provider stores exactly what it receives. It does not validate
   * the buffer, generate filenames, or compute checksums — those are
   * the MediaService's responsibilities.
   *
   * @param buffer - Raw file content to store.
   * @param options - Upload configuration including `fileName`, `folder`,
   *   `mimeType`, and optional provider-specific settings.
   * @returns Storage-level result containing URL, path, and provider metadata.
   * @throws {UploadFailedError} If the upload operation fails for any reason.
   */
  upload(buffer: Buffer, options: UploadOptions): Promise<UploadResult>;

  /**
   * Delete a file by its storage path.
   *
   * On success, resolves with no value. On failure, throws a typed error.
   *
   * @param storagePath - The storage path returned in {@link UploadResult.storagePath}.
   * @throws {FileNotFoundError} If the file does not exist at the given path.
   * @throws {DeleteFailedError} If deletion fails for any other reason.
   */
  delete(storagePath: string): Promise<void>;

  /**
   * Check whether a file exists at the given storage path.
   *
   * **⚠️ Performance Warning:** For cloud providers (Cloudinary, S3), this
   * method makes an API request and is an **expensive network operation**.
   * Avoid calling in hot paths, tight loops, or during request handling
   * where latency matters. For local storage, this is a cheap filesystem check.
   *
   * @param storagePath - The storage path to check.
   * @returns `true` if the file exists, `false` otherwise.
   */
  exists(storagePath: string): Promise<boolean>;

  /**
   * Get the public URL for a stored file.
   *
   * This is a synchronous operation that constructs the URL from the
   * provider's configuration and the given storage path.
   *
   * - **Local:** Concatenates the configured base URL with the storage path.
   * - **Cloudinary:** Uses the Cloudinary SDK's `url()` method for proper
   *   CDN URLs with secure protocol and versioning support.
   *
   * @param storagePath - The storage path of the file.
   * @returns The fully qualified public URL.
   */
  getUrl(storagePath: string): string;
}
