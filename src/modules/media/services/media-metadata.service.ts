import sharp from "sharp";
import { logger } from "@/shared/utils/logger";
import type { ExtractedMediaMetadata } from "./media-service.types";

export const MediaMetadataService = {
  /**
   * Extracts generic media metadata from a file buffer.
   *
   * Sharp is strictly treated as an implementation detail within this helper.
   * If the file is not an image (or unsupported), it gracefully returns null values.
   *
   * @param buffer The file buffer.
   * @param mimeType The MIME type of the file.
   * @returns Extracted metadata properties.
   */
  async extractMetadata(
    buffer: Buffer,
    mimeType: string,
  ): Promise<ExtractedMediaMetadata> {
    const isImage = mimeType.startsWith("image/");
    const baseMetadata: ExtractedMediaMetadata = {
      width: null,
      height: null,
      metadata: {
        format: null,
        orientation: null,
        colorSpace: null,
      },
    };

    if (!isImage) {
      // Future: integrate FFmpeg/pdf-parse/etc. for other media types here
      return baseMetadata;
    }

    try {
      const metadata = await sharp(buffer).metadata();
      return {
        width: metadata.width ?? null,
        height: metadata.height ?? null,
        metadata: {
          format: metadata.format ?? null,
          orientation: metadata.orientation ?? null,
          colorSpace: metadata.space ?? null,
        },
      };
    } catch (error) {
      logger.warn("Failed to extract metadata using Sharp", error);
      return baseMetadata;
    }
  },
};
