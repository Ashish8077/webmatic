// ─── Base Storage Error ──────────────────────────────────────────────────────

/**
 * Base error class for all storage-related errors.
 *
 * Every storage error extends this class, enabling consumers to catch
 * all storage errors with a single `catch (e) { if (e instanceof StorageError) }`.
 *
 * Follows the project's error pattern: preserves `cause` for debugging,
 * uses `Object.setPrototypeOf` for correct `instanceof` checks, and
 * carries a machine-readable `code` for programmatic handling.
 */
export class StorageError extends Error {
  /** Machine-readable error code for programmatic handling. */
  public readonly code: string;

  constructor(message: string, code: string, cause?: unknown) {
    super(message, { cause });
    this.name = "StorageError";
    this.code = code;
    Object.setPrototypeOf(this, StorageError.prototype);
  }
}

// ─── Upload Failed ───────────────────────────────────────────────────────────

/**
 * Thrown when a file upload operation fails.
 *
 * Wraps provider-specific errors (filesystem failures, Cloudinary API errors,
 * etc.) into a consistent type. The original error is preserved in `cause`.
 */
export class UploadFailedError extends StorageError {
  constructor(message: string, cause?: unknown) {
    super(message, "UPLOAD_FAILED", cause);
    this.name = "UploadFailedError";
    Object.setPrototypeOf(this, UploadFailedError.prototype);
  }
}

// ─── Delete Failed ───────────────────────────────────────────────────────────

/**
 * Thrown when a file deletion operation fails.
 *
 * Wraps provider-specific errors into a consistent type.
 * For "file not found" during deletion, prefer {@link FileNotFoundError}.
 */
export class DeleteFailedError extends StorageError {
  constructor(message: string, cause?: unknown) {
    super(message, "DELETE_FAILED", cause);
    this.name = "DeleteFailedError";
    Object.setPrototypeOf(this, DeleteFailedError.prototype);
  }
}

// ─── File Not Found ──────────────────────────────────────────────────────────

/**
 * Thrown when a requested file does not exist in storage.
 *
 * Used during delete or existence checks when the file at the given
 * storage path cannot be located.
 */
export class FileNotFoundError extends StorageError {
  /** The storage path that was not found. */
  public readonly storagePath: string;

  constructor(storagePath: string, cause?: unknown) {
    super(
      `File not found at storage path: "${storagePath}".`,
      "FILE_NOT_FOUND",
      cause,
    );
    this.name = "FileNotFoundError";
    this.storagePath = storagePath;
    Object.setPrototypeOf(this, FileNotFoundError.prototype);
  }
}

// ─── Configuration Error ─────────────────────────────────────────────────────

/**
 * Thrown when storage provider configuration is missing or invalid.
 *
 * Common causes:
 * - Missing environment variables (e.g. `CLOUDINARY_API_KEY`)
 * - Unsupported storage disk identifier
 * - Invalid configuration values
 */
export class StorageConfigurationError extends StorageError {
  constructor(message: string, cause?: unknown) {
    super(message, "STORAGE_CONFIG_ERROR", cause);
    this.name = "StorageConfigurationError";
    Object.setPrototypeOf(this, StorageConfigurationError.prototype);
  }
}
