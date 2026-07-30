import defaultDb from "@/database/connection";
import type { Pool, PoolConnection, ResultSetHeader } from "mysql2/promise";
import { AppError } from "@/shared/utils/errors/app-error";
import { MediaNotFoundError } from "../errors/media.errors";
import { toJson } from "@/shared/utils/database/json";
import { handleDuplicateConstraint } from "@/shared/utils/errors/database-error.util";
import type { QueryValue } from "@/shared/types/database";
import type { PaginatedResponse } from "@/shared/types/pagination";

import { MEDIA_SORT_COLUMNS } from "../constants/media.constants";
import { MEDIA_SELECT_COLUMNS } from "../constants/media-sql.constants";
import { toMedia, toMediaList } from "../mappers/media.mapper";
import type { MediaRow, CountRow } from "../types/media-repository.types";
import type {
  CreateMediaInput,
  Media,
  UpdateMediaInput,
} from "../types/media.types";
import type {
  MediaFilters,
  MediaListQuery,
  MediaSortOptions,
} from "../types/media-query.types";

/** Use the provided connection (for transactions) or fall back to the default pool. */
function getDb(conn?: Pool | PoolConnection): Pool | PoolConnection {
  return conn ?? defaultDb;
}

// ─── Query Builders ──────────────────────────────────────────────────────────

function buildWhereClause(filters: MediaFilters): {
  whereSql: string;
  params: QueryValue[];
} {
  const conditions: string[] = [];
  const params: QueryValue[] = [];

  if (!filters.includeDeleted) {
    conditions.push("deleted_at IS NULL");
  }

  if (filters.search) {
    conditions.push("(original_name LIKE ? OR file_name LIKE ?)");
    params.push(`%${filters.search}%`, `%${filters.search}%`);
  }

  if (filters.type) {
    conditions.push("type = ?");
    params.push(filters.type);
  }

  if (filters.mimeType) {
    conditions.push("mime_type = ?");
    params.push(filters.mimeType);
  }

  if (filters.disk) {
    conditions.push("disk = ?");
    params.push(filters.disk);
  }

  if (filters.folder) {
    conditions.push("folder = ?");
    params.push(filters.folder);
  }

  if (filters.uploadedBy !== undefined) {
    conditions.push("uploaded_by = ?");
    params.push(filters.uploadedBy);
  }

  if (filters.createdAfter) {
    conditions.push("created_at >= ?");
    params.push(filters.createdAfter);
  }

  if (filters.createdBefore) {
    conditions.push("created_at <= ?");
    params.push(filters.createdBefore);
  }

  const whereSql =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  return { whereSql, params };
}

function buildOrderByClause(sort: MediaSortOptions): string {
  const column = MEDIA_SORT_COLUMNS[sort.sortBy] ?? "created_at";
  const direction = sort.sortOrder === "asc" ? "ASC" : "DESC";
  return `ORDER BY ${column} ${direction}`;
}

// ─── Write Operations ────────────────────────────────────────────────────────

export async function createMedia(
  data: CreateMediaInput,
  conn?: Pool | PoolConnection,
): Promise<Media> {
  const db = getDb(conn);

  try {
    const [result] = await db.execute<ResultSetHeader>(
      `
      INSERT INTO media (
        original_name, file_name, extension, mime_type, size,
        checksum, disk, storage_path, folder, width, height,
        alt_text, caption, metadata, type, provider_file_id, uploaded_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        data.originalName,
        data.fileName,
        data.extension,
        data.mimeType,
        data.size,
        data.checksum,
        data.disk,
        data.storagePath,
        data.folder,
        data.width,
        data.height,
        data.altText,
        data.caption,
        toJson(data.metadata),
        data.type,
        data.providerFileId,
        data.uploadedBy,
      ],
    );

    // Fetch the inserted record using the insertId
    const insertedMedia = await findMediaById(result.insertId, conn);
    if (!insertedMedia) {
      throw new AppError("Failed to retrieve created media record", 500);
    }
    return insertedMedia;
  } catch (error) {
    handleDuplicateConstraint(error, {
      uk_storage_path: {
        field: "storagePath",
        message: "A file with this exact storage path already exists.",
      },
    });
    throw error;
  }
}

export async function updateMedia(
  id: number,
  data: UpdateMediaInput,
  conn?: Pool | PoolConnection,
): Promise<Media> {
  const db = getDb(conn);

  const updates: string[] = [];
  const params: QueryValue[] = [];

  if (data.altText !== undefined) {
    updates.push("alt_text = ?");
    params.push(data.altText);
  }
  if (data.caption !== undefined) {
    updates.push("caption = ?");
    params.push(data.caption);
  }
  if (data.folder !== undefined) {
    updates.push("folder = ?");
    params.push(data.folder);
  }
  if (data.metadata !== undefined) {
    updates.push("metadata = ?");
    params.push(toJson(data.metadata));
  }

  if (updates.length === 0) {
    const media = await findMediaById(id, conn);
    if (!media) throw new MediaNotFoundError();
    return media;
  }

  updates.push("updated_at = NOW()");
  params.push(id); // For WHERE clause

  const [result] = await db.execute<ResultSetHeader>(
    `
    UPDATE media
    SET ${updates.join(", ")}
    WHERE id = ? AND deleted_at IS NULL
    `,
    params,
  );

  if (result.affectedRows === 0) {
    throw new MediaNotFoundError();
  }

  const updatedMedia = await findMediaById(id, conn);
  if (!updatedMedia) throw new AppError("Failed to retrieve updated media record", 500);
  
  return updatedMedia;
}

export async function softDeleteMedia(
  id: number,
  conn?: Pool | PoolConnection,
): Promise<void> {
  const db = getDb(conn);
  const [result] = await db.execute<ResultSetHeader>(
    `
    UPDATE media
    SET deleted_at = NOW()
    WHERE id = ? AND deleted_at IS NULL
    `,
    [id],
  );

  if (result.affectedRows === 0) {
    throw new MediaNotFoundError();
  }
}

export async function restoreMedia(
  id: number,
  conn?: Pool | PoolConnection,
): Promise<void> {
  const db = getDb(conn);
  const [result] = await db.execute<ResultSetHeader>(
    `
    UPDATE media
    SET deleted_at = NULL
    WHERE id = ? AND deleted_at IS NOT NULL
    `,
    [id],
  );

  if (result.affectedRows === 0) {
    throw new AppError("Media not found or not currently deleted", 404);
  }
}

// ─── Read Operations ─────────────────────────────────────────────────────────

export async function findMediaById(
  id: number,
  conn?: Pool | PoolConnection,
): Promise<Media | null> {
  const db = getDb(conn);
  const [rows] = await db.execute<MediaRow[]>(
    `
    SELECT ${MEDIA_SELECT_COLUMNS}
    FROM media
    WHERE id = ? AND deleted_at IS NULL
    LIMIT 1
    `,
    [id],
  );

  return rows.length > 0 ? toMedia(rows[0]) : null;
}

export async function findMediaByStoragePath(
  storagePath: string,
  conn?: Pool | PoolConnection,
): Promise<Media | null> {
  const db = getDb(conn);
  const [rows] = await db.execute<MediaRow[]>(
    `
    SELECT ${MEDIA_SELECT_COLUMNS}
    FROM media
    WHERE storage_path = ? AND deleted_at IS NULL
    LIMIT 1
    `,
    [storagePath],
  );

  return rows.length > 0 ? toMedia(rows[0]) : null;
}

export async function findMediaByChecksum(
  checksum: string,
  conn?: Pool | PoolConnection,
): Promise<Media | null> {
  const db = getDb(conn);
  const [rows] = await db.execute<MediaRow[]>(
    `
    SELECT ${MEDIA_SELECT_COLUMNS}
    FROM media
    WHERE checksum = ? AND deleted_at IS NULL
    LIMIT 1
    `,
    [checksum],
  );

  return rows.length > 0 ? toMedia(rows[0]) : null;
}

export async function findMediaByProviderFileId(
  providerFileId: string,
  conn?: Pool | PoolConnection,
): Promise<Media | null> {
  const db = getDb(conn);
  const [rows] = await db.execute<MediaRow[]>(
    `
    SELECT ${MEDIA_SELECT_COLUMNS}
    FROM media
    WHERE provider_file_id = ? AND deleted_at IS NULL
    LIMIT 1
    `,
    [providerFileId],
  );

  return rows.length > 0 ? toMedia(rows[0]) : null;
}

export async function countMedia(
  query: MediaListQuery,
  conn?: Pool | PoolConnection,
): Promise<number> {
  const db = getDb(conn);
  const { whereSql, params: whereParams } = buildWhereClause(query);
  
  const [countRows] = await db.query<CountRow[]>(
    `SELECT COUNT(*) AS total FROM media ${whereSql}`,
    whereParams,
  );
  
  return countRows[0].total;
}

export async function findAllMedia(
  query: MediaListQuery,
  conn?: Pool | PoolConnection,
): Promise<Media[]> {
  const db = getDb(conn);
  const { whereSql, params: whereParams } = buildWhereClause(query);

  // Pagination
  const offset = (query.page - 1) * query.limit;
  const orderBySql = buildOrderByClause({
    sortBy: query.sortBy ?? "created_at",
    sortOrder: query.sortOrder ?? "desc",
  });

  const queryParams = [...whereParams, offset, query.limit];

  const [rows] = await db.query<MediaRow[]>(
    `
    SELECT ${MEDIA_SELECT_COLUMNS}
    FROM media
    ${whereSql}
    ${orderBySql}
    LIMIT ?, ?
    `,
    queryParams,
  );

  return rows.map(toMedia);
}

// ─── Exists Checks ───────────────────────────────────────────────────────────

export async function exists(
  id: number,
  conn?: Pool | PoolConnection,
): Promise<boolean> {
  const db = getDb(conn);
  const [rows] = await db.execute<CountRow[]>(
    `SELECT COUNT(*) AS total FROM media WHERE id = ? AND deleted_at IS NULL`,
    [id],
  );
  return rows[0].total > 0;
}

export async function existsByStoragePath(
  storagePath: string,
  conn?: Pool | PoolConnection,
): Promise<boolean> {
  const db = getDb(conn);
  const [rows] = await db.execute<CountRow[]>(
    `SELECT COUNT(*) AS total FROM media WHERE storage_path = ? AND deleted_at IS NULL`,
    [storagePath],
  );
  return rows[0].total > 0;
}

export async function existsByChecksum(
  checksum: string,
  conn?: Pool | PoolConnection,
): Promise<boolean> {
  const db = getDb(conn);
  const [rows] = await db.execute<CountRow[]>(
    `SELECT COUNT(*) AS total FROM media WHERE checksum = ? AND deleted_at IS NULL`,
    [checksum],
  );
  return rows[0].total > 0;
}
