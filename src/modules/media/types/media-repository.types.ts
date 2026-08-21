import type { RowDataPacket } from "mysql2";
import type { JsonObject } from "@/shared/types/json";
import type { MediaDisk, MediaType } from "../constants/media.constants";

// ─── Database Rows ───────────────────────────────────────────────────────────

/**
 * Raw MySQL database row representing a single media record.
 *
 * This interface exactly maps to the `media` table schema in the database.
 * Column names are in snake_case. Timestamps are returned as `Date` objects
 * by the mysql2 driver.
 *
 * The repository must map this raw row into the `Media` domain entity
 * before returning it to consumers.
 */
export interface MediaRow extends RowDataPacket {
  id: number;
  original_name: string;
  file_name: string;
  extension: string;
  mime_type: string;
  size: number;
  checksum: string | null;
  disk: MediaDisk;
  storage_path: string;
  folder: string | null;
  width: number | null;
  height: number | null;
  alt_text: string | null;
  caption: string | null;
  metadata: JsonObject | null;
  type: MediaType;
  provider_file_id: string | null;
  uploaded_by: number | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

/**
 * Raw MySQL database row representing a COUNT(*) aggregate query.
 */
export interface CountRow extends RowDataPacket {
  total: number;
}
