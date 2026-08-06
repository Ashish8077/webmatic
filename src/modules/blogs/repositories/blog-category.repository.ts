import db from "@/database/connection";
import { ResultSetHeader } from "mysql2";
import { BlogCategoryRow } from "../types/repository.types";
import { GetCategoriesQuery } from "../validation/get-categories-query.schema";

/**
 * Finds a category by slug (used for existence check).
 */
export async function existsBySlug(slug: string): Promise<{ id: number; slug: string } | null> {
  const [rows] = await db.execute<({ id: number; slug: string } & import("mysql2").RowDataPacket)[]>(
    `
    SELECT id, slug
    FROM blog_categories
    WHERE slug = ?
      AND deleted_at IS NULL
    LIMIT 1
    `,
    [slug],
  );
  return rows[0] ?? null;
}

/**
 * Finds a category by slug, excluding a specific category ID.
 */
export async function existsBySlugExcludingId(
  slug: string,
  categoryId: number,
): Promise<{ id: number; slug: string } | null> {
  const [rows] = await db.execute<({ id: number; slug: string } & import("mysql2").RowDataPacket)[]>(
    `
    SELECT id, slug
    FROM blog_categories
    WHERE slug = ?
      AND id <> ?
      AND deleted_at IS NULL
    LIMIT 1
    `,
    [slug, categoryId],
  );
  return rows[0] ?? null;
}

/**
 * Finds a category by ID.
 */
export async function findById(id: number): Promise<BlogCategoryRow | null> {
  const [rows] = await db.execute<BlogCategoryRow[]>(
    `
    SELECT
      id,
      name,
      slug,
      description,
      created_at,
      updated_at
    FROM blog_categories
    WHERE id = ?
      AND deleted_at IS NULL
    LIMIT 1
    `,
    [id],
  );
  return rows[0] ?? null;
}

/**
 * Finds all active categories.
 */
export async function findAllCategories(query: GetCategoriesQuery): Promise<BlogCategoryRow[]> {
  const conditions = ["deleted_at IS NULL"];
  const params: (string | number)[] = [];

  if (query.search) {
    conditions.push("(name LIKE ? OR description LIKE ?)");
    params.push(`%${query.search}%`, `%${query.search}%`);
  }

  const whereClause = conditions.join(" AND ");
  const offset = (query.page - 1) * query.limit;
  
  params.push(query.limit, offset);

  const [rows] = await db.query<BlogCategoryRow[]>(
    `
    SELECT
      id,
      name,
      slug,
      description,
      created_at,
      updated_at
    FROM blog_categories
    WHERE ${whereClause}
    ORDER BY name ${query.sortOrder === "asc" ? "ASC" : "DESC"}
    LIMIT ? OFFSET ?
    `,
    params
  );
  return rows;
}

/**
 * Counts all active categories matching the query.
 */
export async function countCategories(query: GetCategoriesQuery): Promise<number> {
  const conditions = ["deleted_at IS NULL"];
  const params: (string | number)[] = [];

  if (query.search) {
    conditions.push("(name LIKE ? OR description LIKE ?)");
    params.push(`%${query.search}%`, `%${query.search}%`);
  }

  const whereClause = conditions.join(" AND ");

  const [rows] = await db.query<({ total: number } & import("mysql2").RowDataPacket)[]>(
    `
    SELECT COUNT(*) as total
    FROM blog_categories
    WHERE ${whereClause}
    `,
    params
  );
  return rows[0].total;
}

/**
 * Creates a new category.
 */
export async function createCategory(
  category: { name: string; slug: string; description: string | null },
  userId: number,
): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    INSERT INTO blog_categories (name, slug, description, created_by, updated_by)
    VALUES (?, ?, ?, ?, ?)
    `,
    [category.name, category.slug, category.description, userId, userId],
  );
  return result.insertId;
}

/**
 * Updates an existing category.
 */
export async function updateCategory(
  categoryId: number,
  category: { name: string; slug: string; description: string | null },
  userId: number,
): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    UPDATE blog_categories
    SET name = ?, slug = ?, description = ?, updated_by = ?
    WHERE id = ?
      AND deleted_at IS NULL
    `,
    [category.name, category.slug, category.description, userId, categoryId],
  );
  return result.affectedRows;
}

/**
 * Soft deletes a category.
 */
export async function softDeleteCategory(
  categoryId: number,
  userId: number,
): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    UPDATE blog_categories
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
    [userId, categoryId],
  );
  return result.affectedRows;
}

/**
 * Finds all categories associated with a list of blog IDs.
 */
export async function findCategoriesByBlogIds(blogIds: number[]): Promise<{ blog_id: number; id: number; name: string }[]> {
  if (blogIds.length === 0) return [];
  
  const placeholders = blogIds.map(() => "?").join(",");
  const [rows] = await db.query<({ blog_id: number; id: number; name: string } & import("mysql2").RowDataPacket)[]>(
    `
    SELECT bcm.blog_id, c.id, c.name
    FROM blog_categories c
    INNER JOIN blog_category_map bcm ON c.id = bcm.category_id
    WHERE bcm.blog_id IN (${placeholders})
      AND c.deleted_at IS NULL
    `,
    blogIds
  );
  return rows;
}
