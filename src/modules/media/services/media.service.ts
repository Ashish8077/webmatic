import { v4 as uuidv4 } from "uuid";
import path from "path";
import db from "@/database/connection";
import { logger } from "@/shared/utils/logger";
import { AppError } from "@/shared/utils/errors/app-error";
import type { AuthUser } from "@/modules/auth/types/auth-user";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { StorageFactory } from "@/shared/storage/storage-factory";

import {
  createMedia,
  findMediaById,
  findAllMedia,
  countMedia,
  updateMedia as updateMediaRepository,
  softDeleteMedia,
  restoreMedia as restoreMediaRepository,
  findMediaByChecksum,
} from "../repositories/media.repository";
import { MediaChecksumService } from "./media-checksum.service";
import { MediaMetadataService } from "./media-metadata.service";
import {
  MediaNotFoundError,
  UploadFailedError,
} from "../errors/media.errors";
import { MediaType } from "../constants/media.constants";
import type { Media, UpdateMediaInput, MediaListResponse } from "../types/media.types";
import type { MediaListQuery } from "../types/media-query.types";
import { isDuplicateKeyError } from "@/shared/utils/errors/database-error.util";

/** Resolve the StorageProvider dynamically to avoid shared mutable singletons. */
function getStorageProvider() {
  return StorageFactory.create();
}

/** Determine the media type based on the MIME type string. */
function determineMediaType(mimeType: string): MediaType {
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType.startsWith("audio/")) return "audio";
  if (
    mimeType.startsWith("application/pdf") ||
    mimeType.startsWith("text/") ||
    mimeType.includes("document")
  ) {
    return "document";
  }
  return "other";
}


export const MediaService = {
  /**
   * Orchestrates the complete file upload workflow.
   *
   * Flow:
   * 1. Validate & Read Buffer
   * 2. Extract Checksum & Metadata
   * 3. Early-exit if checksum already exists in an active record
   *    → return existing media (no storage write, no DB insert)
   * 4. Upload to Storage
   * 5. Begin Transaction → Insert into Database → Commit
   *
   * Race-condition handling:
   * Two concurrent uploads of the same file can both pass step 3 and
   * both attempt the INSERT. The DB UNIQUE(checksum) constraint catches
   * the second one. In that case the catch block recovers the existing
   * record and returns it instead of surfacing a generic error.
   *
   * Cleanup contract: If the DB insert fails for any reason OTHER than
   * a duplicate-key collision, the freshly uploaded storage object is
   * immediately deleted and the transaction rolled back.
   */
  async uploadMedia(
    file: File,
    folder: string | null,
    user: AuthUser,
  ): Promise<Media> {
    requirePermission(user, PERMISSIONS.MEDIA_UPLOAD);

    const buffer = Buffer.from(await file.arrayBuffer());
    const mimeType = file.type || "application/octet-stream";
    const originalName = file.name;
    const extension = path.extname(originalName).replace(".", "").toLowerCase();
    const size = file.size;

    // ── Step 1: Compute checksum & metadata ──────────────────────────────────
    const checksum = MediaChecksumService.generateChecksum(buffer);
    const extractedMetadata = await MediaMetadataService.extractMetadata(
      buffer,
      mimeType,
    );

    // ── Step 2: Early-exit duplicate detection ───────────────────────────────
    // findMediaByChecksum already filters `deleted_at IS NULL`, so a
    // soft-deleted record is correctly treated as non-existent here.
    const existingMedia = await findMediaByChecksum(checksum);
    if (existingMedia) {
      // The file content is identical to an active media record.
      // Return it immediately — no storage write, no DB insert, no error.
      logger.info(
        `Duplicate upload detected for checksum ${checksum}. Returning existing media id=${existingMedia.id}.`,
      );
      return existingMedia;
    }

    // ── Step 3: Proceed with new upload ─────────────────────────────────────
    const uniqueId = uuidv4();
    const generatedFileName = `${uniqueId}${extension ? `.${extension}` : ""}`;
    const type = determineMediaType(mimeType);
    const storage = getStorageProvider();

    const conn = await db.getConnection();
    await conn.beginTransaction();

    let uploadedPath = "";
    let providerFileId: string | null = null;

    try {
      // 3a. Upload to storage
      const uploadResult = await storage.upload(buffer, {
        fileName: generatedFileName,
        originalName,
        mimeType,
        folder: (folder ?? undefined) as string | undefined,
      });

      uploadedPath = uploadResult.storagePath;
      providerFileId = uploadResult.providerFileId;
      const disk = storage.disk;

      // 3b. Insert into repository
      const createdMedia = await createMedia(
        {
          originalName,
          fileName: generatedFileName,
          extension,
          mimeType,
          size,
          checksum,
          disk,
          storagePath: uploadedPath,
          folder,
          width: extractedMetadata.width,
          height: extractedMetadata.height,
          altText: null,
          caption: null,
          metadata: extractedMetadata.metadata,
          type,
          providerFileId: providerFileId ?? null,
          uploadedBy: user.userId,
        },
        conn,
      );

      // 3c. Commit
      await conn.commit();
      return createdMedia;
    } catch (error) {
      await conn.rollback();

      // ── Race-condition recovery ────────────────────────────────────────────
      // Two concurrent uploads of the same file can both pass the early-exit
      // check above. The DB UNIQUE(checksum) constraint catches the second
      // INSERT. Instead of surfacing a generic error, we recover the record
      // that the winning request just inserted and return it.
      if (isDuplicateKeyError(error)) {
        logger.info(
          `Race-condition duplicate key on checksum ${checksum}. Recovering existing record.`,
        );
        // The storage file we uploaded is now an orphan — clean it up.
        if (uploadedPath) {
          try {
            await storage.delete(uploadedPath);
          } catch (cleanupError) {
            logger.error(
              "Failed to cleanup orphaned storage file after race-condition duplicate:",
              cleanupError,
            );
          }
        }
        // Fetch and return the record inserted by the winning request.
        const recovered = await findMediaByChecksum(checksum);
        if (recovered) return recovered;
        // If for some reason it's still not found (extremely unlikely),
        // fall through to the generic error below.
      }

      // ── General storage/DB failure cleanup ────────────────────────────────
      if (uploadedPath) {
        try {
          await storage.delete(uploadedPath);
        } catch (cleanupError) {
          logger.error(
            "Failed to cleanup orphaned storage file after upload failure:",
            cleanupError,
          );
        }
      }

      if (error instanceof AppError) {
        throw error;
      }

      throw new UploadFailedError(
        error instanceof Error ? error.message : "Upload orchestration failed",
      );
    } finally {
      conn.release();
    }
  },

  /**
   * Orchestrates the deletion workflow.
   */
  async deleteMedia(id: number, user: AuthUser): Promise<void> {
    requirePermission(user, PERMISSIONS.MEDIA_DELETE);

    await softDeleteMedia(id);
  },

  /**
   * Retrieves a single media item.
   */
  async getMedia(id: number, user: AuthUser): Promise<Media & { url: string }> {
    requirePermission(user, PERMISSIONS.MEDIA_VIEW);

    const media = await findMediaById(id);
    if (!media) throw new MediaNotFoundError();
    const storage = getStorageProvider();
    return { ...media, url: storage.getUrl(media.storagePath) };
  },

  /**
   * Retrieves a paginated list of media items.
   */
  async getMediaList(
    query: MediaListQuery,
    user: AuthUser,
  ): Promise<MediaListResponse> {
    requirePermission(user, PERMISSIONS.MEDIA_VIEW);

    const [items, totalItems] = await Promise.all([
      findAllMedia(query),
      countMedia(query),
    ]);

    const totalPages = Math.ceil(totalItems / query.limit);

    // Resolve public URLs for each media item
    const storage = getStorageProvider();
    const enrichedItems = items.map((item) => ({
      ...item,
      url: storage.getUrl(item.storagePath),
    }));

    return {
      items: enrichedItems,
      pagination: {
        page: query.page,
        limit: query.limit,
        totalItems,
        totalPages,
        hasNextPage: query.page < totalPages,
        hasPreviousPage: query.page > 1,
      },
    };
  },

  /**
   * Updates editable metadata for a media item.
   */
  async updateMedia(
    id: number,
    data: UpdateMediaInput,
    user: AuthUser,
  ): Promise<Media> {
    requirePermission(user, PERMISSIONS.MEDIA_UPDATE);

    return updateMediaRepository(id, data);
  },

  /**
   * Restores a soft-deleted media item.
   */
  async restoreMedia(id: number, user: AuthUser): Promise<void> {
    requirePermission(user, PERMISSIONS.MEDIA_RESTORE);

    // Re-verify auth/permissions here if necessary
    await restoreMediaRepository(id);
  },
};
