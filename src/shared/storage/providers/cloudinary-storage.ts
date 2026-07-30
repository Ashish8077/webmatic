import {
  v2 as cloudinary,
  type UploadApiResponse,
  type UploadApiOptions,
} from "cloudinary";

import type { StorageProvider } from "../contracts/storage-provider";
import type {
  CloudinaryConfig,
  CloudinaryUploadOptions,
  UploadOptions,
  UploadResult,
  StorageDisk,
} from "../types";
import {
  UploadFailedError,
  DeleteFailedError,
  FileNotFoundError,
} from "../errors";
import { normalizeFolder } from "../utils/path";

/**
 * Cloudinary cloud storage provider.
 *
 * Uploads files to Cloudinary's cloud infrastructure and manages them
 * via the Cloudinary SDK. Configuration is injected through the constructor —
 * this provider never reads `process.env`.
 *
 * All Cloudinary SDK responses are mapped into the shared {@link UploadResult}
 * type. Raw SDK responses never leak outside this class.
 *
 * This provider is a concrete implementation of {@link StorageProvider}
 * and is **not intended to be subclassed**. To add a new storage backend,
 * implement {@link StorageProvider} directly.
 *
 * @example
 * ```ts
 * // Created by StorageFactory — not instantiated directly in production.
 * const provider = new CloudinaryStorageProvider({
 *   disk: "cloudinary",
 *   cloudName: "my-cloud",
 *   apiKey: "123456",
 *   apiSecret: "secret",
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
export class CloudinaryStorageProvider implements StorageProvider {
  readonly disk: StorageDisk;

  constructor(config: CloudinaryConfig) {
    this.disk = config.disk;
    cloudinary.config({
      cloud_name: config.cloudName,
      api_key: config.apiKey,
      api_secret: config.apiSecret,
      secure: true,
    });
  }

  /**
   * Upload a file buffer to Cloudinary.
   *
   * Cloudinary naturally returns `width`, `height`, `bytes`, `version`,
   * and `etag` — all mapped into the shared {@link UploadResult}.
   *
   * Provider-specific options (transformations, tags, resource type) can
   * be passed via `providerOptions` with full type safety using
   * `UploadOptions<CloudinaryUploadOptions>`.
   */
  async upload(
    buffer: Buffer,
    options: UploadOptions<CloudinaryUploadOptions>,
  ): Promise<UploadResult> {
    const folder = normalizeFolder(options.folder);
    const publicId = this.buildPublicId(folder, options.fileName);

    const uploadOptions = this.buildUploadOptions(
      publicId,
      options.overwrite,
      options.providerOptions,
    );

    try {
      const response = await this.uploadBuffer(buffer, uploadOptions);

      return {
        url: response.secure_url,
        storagePath: response.public_id,
        providerFileId: response.public_id,
        size: response.bytes,
        width: response.width ?? null,
        height: response.height ?? null,
        version: response.version,
        etag: response.etag,
      };
    } catch (error: unknown) {
      if (error instanceof UploadFailedError) throw error;

      throw new UploadFailedError(
        `Failed to upload file to Cloudinary: "${options.fileName}".`,
        error,
      );
    }
  }

  /**
   * Delete an asset from Cloudinary by its storage path (public_id).
   *
   * @throws {FileNotFoundError} If Cloudinary reports the asset as "not found".
   * @throws {DeleteFailedError} If deletion fails or returns an unexpected result.
   */
  async delete(storagePath: string): Promise<void> {
    try {
      const result = await cloudinary.uploader.destroy(storagePath);

      if (result.result === "not found") {
        throw new FileNotFoundError(storagePath);
      }

      if (result.result !== "ok") {
        throw new DeleteFailedError(
          `Cloudinary deletion returned unexpected result "${result.result}" for "${storagePath}".`,
        );
      }
    } catch (error: unknown) {
      if (error instanceof FileNotFoundError) throw error;
      if (error instanceof DeleteFailedError) throw error;

      throw new DeleteFailedError(
        `Failed to delete file from Cloudinary: "${storagePath}".`,
        error,
      );
    }
  }

  /**
   * Check whether an asset exists in Cloudinary.
   *
   * **⚠️ Performance Warning:** This method calls `api.resource()`, which
   * makes a network API request and counts against your Cloudinary API rate
   * limit. Avoid calling in hot paths or tight loops.
   */
  async exists(storagePath: string): Promise<boolean> {
    try {
      await cloudinary.api.resource(storagePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get the public URL for a Cloudinary asset.
   *
   * Uses the Cloudinary SDK's `url()` method which handles secure URLs,
   * CDN routing, and versioning automatically. No manual URL construction.
   */
  getUrl(storagePath: string): string {
    return cloudinary.url(storagePath, { secure: true });
  }

  // ─── Private Helpers ────────────────────────────────────────────────────

  /**
   * Build the Cloudinary `public_id` from folder and filename.
   *
   * Cloudinary public_ids don't include file extensions — the SDK
   * strips the extension from the filename portion.
   */
  private buildPublicId(folder: string, fileName: string): string {
    const nameWithoutExtension = fileName.replace(/\.[^.]+$/, "");

    if (!folder) return nameWithoutExtension;

    return `${folder}/${nameWithoutExtension}`;
  }

  /**
   * Build Cloudinary upload options from the common upload options
   * and any provider-specific overrides.
   */
  private buildUploadOptions(
    publicId: string,
    overwrite?: boolean,
    providerOptions?: CloudinaryUploadOptions,
  ): UploadApiOptions {
    return {
      public_id: providerOptions?.publicId ?? publicId,
      overwrite: overwrite ?? false,
      resource_type: providerOptions?.resourceType ?? "auto",
      ...(providerOptions?.tags && { tags: providerOptions.tags }),
      ...(providerOptions?.transformation && {
        transformation: providerOptions.transformation,
      }),
    };
  }

  /**
   * Wrap Cloudinary's callback-based `upload_stream` in a Promise.
   *
   * Centralizes the stream → Promise conversion so upload logic
   * stays clean and readable.
   */
  private uploadBuffer(
    buffer: Buffer,
    options: UploadApiOptions,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (error) {
            reject(
              new UploadFailedError(
                error.message ?? "Cloudinary upload stream failed.",
                error,
              ),
            );
            return;
          }

          if (!result) {
            reject(
              new UploadFailedError(
                "Cloudinary upload stream returned no result.",
              ),
            );
            return;
          }

          resolve(result);
        },
      );

      stream.end(buffer);
    });
  }
}
