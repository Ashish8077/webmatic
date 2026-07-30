import crypto from "crypto";

export const MediaChecksumService = {
  /**
   * Generates a SHA-256 checksum for the given file buffer.
   *
   * @param buffer The file buffer.
   * @returns The hex representation of the checksum.
   */
  generateChecksum(buffer: Buffer): string {
    return crypto.createHash("sha256").update(buffer).digest("hex");
  },
};
