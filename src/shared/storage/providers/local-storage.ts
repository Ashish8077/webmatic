import { mkdir, writeFile, unlink, access } from "fs/promises";
import path from "path";

import type { StorageProvider } from "../contracts/storage-provider";
import type { LocalStorageConfig, UploadOptions, UploadResult, StorageDisk } from "../types";
import { UploadFailedError, DeleteFailedError, FileNotFoundError } from "../errors";
import { joinStoragePath, normalizeFolder } from "../utils/path";

/**
 * Local filesystem storage provider.
 *
 * Stores files on the local disk under a configurable base path and serves
 * them via a configurable base URL. Configuration is injected through the
 * constructor — this provider never reads `process.env`.
 *
 * This provider is a concrete implementation of {@link StorageProvider}
 * and is **not intended to be subclassed**. To add a new storage backend,
 * implement {@link StorageProvider} directly.
 *
 * @example
 * ```ts
 * // Created by StorageFactory — not instantiated directly in production.
 * const provider = new LocalStorageProvider({
 *   disk: "local",
 *   basePath: "/app/public/uploads",
 *   baseUrl: "http://localhost:3000/uploads",
 * });
 *
 * const result = await provider.upload(buffer, {
 *   fileName: "a1b2c3d4.webp",
 *   originalName: "hero.png",
 *   mimeType: "image/webp",
 *   folder: "2026/07",
 * });
 * ```
 */
export class LocalStorageProvider implements StorageProvider {
  readonly disk: StorageDisk;
  private readonly basePath: string;
  private readonly baseUrl: string;

  constructor(config: LocalStorageConfig) {
    this.disk = config.disk;
    this.basePath = config.basePath.replace(/[/\\]+$/, "");
    this.baseUrl = config.baseUrl.replace(/\/+$/, "");
  }

  /**
   * Store a file buffer on the local filesystem.
   *
   * Creates nested directories automatically if they don't exist.
   * If `overwrite` is `false` (default) and a file already exists at the
   * target path, throws {@link UploadFailedError}.
   *
   * Width and height are always `null` — image dimension extraction is
   * the MediaService's responsibility (using `sharp` or similar).
   */
  async upload(buffer: Buffer, options: UploadOptions): Promise<UploadResult> {
    const folder = normalizeFolder(options.folder);
    const storagePath = joinStoragePath(folder, options.fileName);
    const absolutePath = this.resolveAbsolutePath(storagePath);

    try {
      await mkdir(path.dirname(absolutePath), { recursive: true });

      if (!options.overwrite) {
        const fileExists = await this.fileExists(absolutePath);

        if (fileExists) {
          throw new UploadFailedError(
            `File already exists at "${storagePath}" and overwrite is disabled.`,
          );
        }
      }

      await writeFile(absolutePath, buffer);

      return {
        url: this.getUrl(storagePath),
        storagePath,
        providerFileId: null,
        size: buffer.length,
        width: null,
        height: null,
      };
    } catch (error: unknown) {
      if (error instanceof UploadFailedError) throw error;

      throw new UploadFailedError(
        `Failed to upload file to local storage: "${storagePath}".`,
        error,
      );
    }
  }

  /**
   * Delete a file from the local filesystem.
   *
   * @throws {FileNotFoundError} If the file does not exist (ENOENT).
   * @throws {DeleteFailedError} If deletion fails for any other reason.
   */
  async delete(storagePath: string): Promise<void> {
    const absolutePath = this.resolveAbsolutePath(storagePath);

    try {
      await unlink(absolutePath);
    } catch (error: unknown) {
      if (this.isFileNotFoundError(error)) {
        throw new FileNotFoundError(storagePath, error);
      }

      throw new DeleteFailedError(
        `Failed to delete file from local storage: "${storagePath}".`,
        error,
      );
    }
  }

  /**
   * Check whether a file exists on the local filesystem.
   *
   * This is a cheap `fs.access` check — no performance concerns.
   */
  async exists(storagePath: string): Promise<boolean> {
    const absolutePath = this.resolveAbsolutePath(storagePath);
    return this.fileExists(absolutePath);
  }

  /**
   * Get the public URL for a locally stored file.
   *
   * Concatenates the configured `baseUrl` with the storage path.
   */
  getUrl(storagePath: string): string {
    return `${this.baseUrl}/${storagePath}`;
  }

  // ─── Private Helpers ────────────────────────────────────────────────────

  /**
   * Resolve a storage path to an absolute filesystem path.
   * Splits by forward slash to avoid OS-dependent path issues.
   */
  private resolveAbsolutePath(storagePath: string): string {
    return path.join(this.basePath, ...storagePath.split("/"));
  }

  /**
   * Check if a file exists at an absolute path without throwing.
   */
  private async fileExists(absolutePath: string): Promise<boolean> {
    try {
      await access(absolutePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Type guard for Node.js ENOENT (file not found) errors.
   */
  private isFileNotFoundError(error: unknown): boolean {
    return (
      error instanceof Error &&
      "code" in error &&
      (error as NodeJS.ErrnoException).code === "ENOENT"
    );
  }
}
