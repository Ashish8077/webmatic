import db from "@/database/connection";
import { ResultSetHeader } from "mysql2";
import { BlogTagRow } from "../types/repository.types";
import { GetTagsQuery } from "../validation/get-tags-query.schema";

/**
 * Finds a tag by slug (used for existence check).
 */
export async function existsBySlug(slug: string): Promise<{ id: number; slug: string } | null> {
  const [rows] = await db.execute<({ id: number; slug: string } & import("mysql2").RowDataPacket)[]>(
    `
    SELECT id, slug
    FROM blog_tags
    WHERE slug = ?
      AND deleted_at IS NULL
    LIMIT 1
    `,
    [slug],
  );
  return rows[0] ?? null;
}

/**
 * Finds a tag by slug, excluding a specific tag ID.
 */
export async function existsBySlugExcludingId(
  slug: string,
  tagId: number,
): Promise<{ id: number; slug: string } | null> {
  const [rows] = await db.execute<({ id: number; slug: string } & import("mysql2").RowDataPacket)[]>(
    `
    SELECT id, slug
    FROM blog_tags
    WHERE slug = ?
      AND id <> ?
      AND deleted_at IS NULL
    LIMIT 1
    `,
    [slug, tagId],
  );
  return rows[0] ?? null;
}

/**
 * Finds a tag by ID.
 */
export async function findById(id: number): Promise<BlogTagRow | null> {
  const [rows] = await db.execute<BlogTagRow[]>(
    `
    SELECT
      id,
      name,
      slug,
      created_at,
      updated_at
    FROM blog_tags
    WHERE id = ?
      AND deleted_at IS NULL
    LIMIT 1
    `,
    [id],
  );
  return rows[0] ?? null;
}

/**
 * Finds all active tags.
 */
export async function findAllTags(query: GetTagsQuery): Promise<BlogTagRow[]> {
  const conditions = ["deleted_at IS NULL"];
  const params: any[] = [];

  if (query.search) {
    conditions.push("name LIKE ?");
    params.push(`%${query.search}%`);
  }

  const whereClause = conditions.join(" AND ");
  const offset = (query.page - 1) * query.limit;
  
  params.push(query.limit, offset);

  const [rows] = await db.query<BlogTagRow[]>(
    `
    SELECT
      id,
      name,
      slug,
      created_at,
      updated_at
    FROM blog_tags
    WHERE ${whereClause}
    ORDER BY name ${query.sortOrder === "asc" ? "ASC" : "DESC"}
    LIMIT ? OFFSET ?
    `,
    params
  );
  return rows;
}

/**
 * Counts all active tags matching the query.
 */
export async function countTags(query: GetTagsQuery): Promise<number> {
  const conditions = ["deleted_at IS NULL"];
  const params: any[] = [];

  if (query.search) {
    conditions.push("name LIKE ?");
    params.push(`%${query.search}%`);
  }

  const whereClause = conditions.join(" AND ");

  const [rows] = await db.query<({ total: number } & import("mysql2").RowDataPacket)[]>(
    `
    SELECT COUNT(*) as total
    FROM blog_tags
    WHERE ${whereClause}
    `,
    params
  );
  return rows[0].total;
}

/**
 * Creates a new tag.
 */
export async function createTag(
  tag: { name: string; slug: string },
  userId: number,
): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    INSERT INTO blog_tags (name, slug, created_by, updated_by)
    VALUES (?, ?, ?, ?)
    `,
    [tag.name, tag.slug, userId, userId],
  );
  return result.insertId;
}

/**
 * Updates an existing tag.
 */
export async function updateTag(
  tagId: number,
  tag: { name: string; slug: string },
  userId: number,
): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    UPDATE blog_tags
    SET name = ?, slug = ?, updated_by = ?
    WHERE id = ?
      AND deleted_at IS NULL
    `,
    [tag.name, tag.slug, userId, tagId],
  );
  return result.affectedRows;
}

/**
 * Soft deletes a tag.
 */
export async function softDeleteTag(
  tagId: number,
  userId: number,
): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    UPDATE blog_tags
    SET
      slug = CONCAT(
        LEFT(slug, 255 - CHAR_LENGTH(CONCAT('__deleted__', id))),
        '__deleted__',
        id
      ),
      deleted_at = CURRENT_TIMESTAMP,
      deleted_by = ?
    WHERE id = ?
      AND deleted_at IS NULL
    `,
    [userId, tagId],
  );
  return result.affectedRows;
}

/**
 * Finds all tags associated with a list of blog IDs.
 */
export async function findTagsByBlogIds(blogIds: number[]): Promise<{ blog_id: number; id: number; name: string }[]> {
  if (blogIds.length === 0) return [];
  
  const placeholders = blogIds.map(() => "?").join(",");
  const [rows] = await db.query<({ blog_id: number; id: number; name: string } & import("mysql2").RowDataPacket)[]>(
    `
    SELECT btm.blog_id, t.id, t.name
    FROM blog_tags t
    INNER JOIN blog_tag_map btm ON t.id = btm.tag_id
    WHERE btm.blog_id IN (${placeholders})
      AND t.deleted_at IS NULL
    `,
    blogIds
  );
  return rows;
}
