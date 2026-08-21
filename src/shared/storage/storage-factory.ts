import type { StorageProvider } from "./contracts/storage-provider";
import type {
  CloudinaryConfig,
  LocalStorageConfig,
  StorageDisk,
} from "./types";
import { STORAGE_DISK } from "./types";
import { StorageConfigurationError } from "./errors";
import { CloudinaryStorageProvider } from "./providers/cloudinary-storage";
import { LocalStorageProvider } from "./providers/local-storage";

/**
 * Factory for creating and managing storage provider instances.
 *
 * The factory is the **single point of contact with environment variables**.
 * It reads configuration from `process.env`, validates that all required
 * values are present, builds typed config objects, and injects them into
 * provider constructors.
 *
 * Provider instances are cached as singletons per disk to avoid
 * re-instantiation and redundant SDK configuration.
 *
 * @example
 * ```ts
 * import { StorageFactory, STORAGE_DISK } from "@/shared/storage";
 *
 * // Uses STORAGE_DRIVER env var to determine provider
 * const storage = StorageFactory.create();
 *
 * // Explicitly request a specific provider
 * const local = StorageFactory.create(STORAGE_DISK.LOCAL);
 * const cloudinary = StorageFactory.create(STORAGE_DISK.CLOUDINARY);
 * ```
 */
export class StorageFactory {
  /** Cached singleton instances keyed by disk identifier. */
  private static instances = new Map<StorageDisk, StorageProvider>();

  /**
   * Create or retrieve a cached storage provider instance.
   *
   * If no `disk` argument is provided, the factory reads the
   * `STORAGE_DRIVER` environment variable to determine which
   * provider to create.
   *
   * @param disk - The storage disk to use. Defaults to `STORAGE_DRIVER` env var.
   * @returns A configured {@link StorageProvider} instance.
   * @throws {StorageConfigurationError} If the disk is not configured,
   *   unsupported, or required env vars are missing.
   */
  static create(disk?: StorageDisk): StorageProvider {
    const resolved =
      disk ?? (process.env.STORAGE_DRIVER as StorageDisk | undefined);

    if (!resolved) {
      throw new StorageConfigurationError(
        "Storage disk is not configured. Set the STORAGE_DRIVER environment " +
          "variable or pass a disk argument to StorageFactory.create().",
      );
    }

    const cached = StorageFactory.instances.get(resolved);
    if (cached) return cached;

    const provider = StorageFactory.buildProvider(resolved);
    StorageFactory.instances.set(resolved, provider);

    return provider;
  }

  /**
   * Clear all cached provider instances.
   *
   * **⚠️ Test-only.** This method exists solely for test teardown to reset
   * singleton state between test suites. Do **not** call in production code.
   */
  static reset(): void {
    StorageFactory.instances.clear();
  }

  // ─── Private Builders ───────────────────────────────────────────────────

  /**
   * Instantiate the correct provider for the given disk.
   *
   * @throws {StorageConfigurationError} If the disk is unsupported or
   *   required environment variables are missing.
   */
  private static buildProvider(disk: StorageDisk): StorageProvider {
    switch (disk) {
      case STORAGE_DISK.LOCAL:
        return new LocalStorageProvider(StorageFactory.buildLocalConfig());

      case STORAGE_DISK.CLOUDINARY:
        return new CloudinaryStorageProvider(
          StorageFactory.buildCloudinaryConfig(),
        );

      default:
        throw new StorageConfigurationError(
          `Unsupported storage disk: "${disk}". ` +
            `Supported disks: ${Object.values(STORAGE_DISK).join(", ")}.`,
        );
    }
  }

  /**
   * Build and validate local storage configuration from env vars.
   */
  private static buildLocalConfig(): LocalStorageConfig {
    return {
      disk: STORAGE_DISK.LOCAL,
      basePath: requireEnv("LOCAL_STORAGE_BASE_PATH"),
      baseUrl: requireEnv("LOCAL_STORAGE_BASE_URL"),
    };
  }

  /**
   * Build and validate Cloudinary configuration from env vars.
   */
  private static buildCloudinaryConfig(): CloudinaryConfig {
    return {
      disk: STORAGE_DISK.CLOUDINARY,
      cloudName: requireEnv("CLOUDINARY_CLOUD_NAME"),
      apiKey: requireEnv("CLOUDINARY_API_KEY"),
      apiSecret: requireEnv("CLOUDINARY_API_SECRET"),
    };
  }
}

// ─── Internal Helpers ──────────────────────────────────────────────────────

/**
 * Validate that a required environment variable is set and non-empty.
 *
 * @param name - The environment variable name.
 * @returns The trimmed environment variable value.
 * @throws {StorageConfigurationError} If the variable is not set or is empty.
 */
function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value || value.trim() === "") {
    throw new StorageConfigurationError(
      `Required environment variable "${name}" is not set or empty.`,
    );
  }

  return value.trim();
}
