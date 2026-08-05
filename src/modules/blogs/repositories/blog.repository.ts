import db from "@/database/connection";
import { ResultSetHeader } from "mysql2";
import { GetBlogsQuery } from "../validation/get-blogs-query.schema";
import { toJson } from "@/shared/utils/database/json";
import { BlogStatus } from "../constants/blog.constants";
import {
  CountRow,
  BlogDetailsRow,
  BlogListRow,
  BlogSlugRow,
  PublishedBlogRow,
} from "../types/repository.types";
import { CreateBlogPayload, UpdateBlogPayload } from "../types/service.types";

type SortBy = NonNullable<GetBlogsQuery["sortBy"]>;

export const SORT_COLUMNS: Record<SortBy, string> = {
  title: "title",
  slug: "slug",
  status: "status",
  created_at: "created_at",
  updated_at: "updated_at",
  published_at: "published_at",
};

/**
 * Finds a blog by slug (used for existence check).
 *
 * @param slug - Slug of the blog to find.
 * @returns The blog slug row or null if not found.
 */
export async function existsBySlug(slug: string): Promise<BlogSlugRow | null> {
  const [rows] = await db.execute<BlogSlugRow[]>(
    `
    SELECT
      id,
      slug
    FROM blogs
    WHERE slug = ?
      AND deleted_at IS NULL
    LIMIT 1
    `,
    [slug],
  );

  return rows[0] ?? null;
}

/**
 * Finds a blog by slug, excluding a specific blog ID (used for updates).
 *
 * @param slug - Slug of the blog to find.
 * @param blogId - ID of the blog to exclude.
 * @returns The blog slug row or null if not found.
 */
export async function existsBySlugExcludingId(
  slug: string,
  blogId: number,
): Promise<BlogSlugRow | null> {
  const [rows] = await db.execute<BlogSlugRow[]>(
    `
    SELECT
      id,
      slug
    FROM blogs
    WHERE slug = ?
      AND id <> ?
      AND deleted_at IS NULL
    LIMIT 1
    `,
    [slug, blogId],
  );

  return rows[0] ?? null;
}

/**
 * Finds a published blog by slug.
 *
 * @param slug - Slug of the blog to find.
 * @returns The published blog row or null if not found.
 */
export async function findPublishedBySlug(
  slug: string,
): Promise<PublishedBlogRow | null> {
  const [rows] = await db.execute<PublishedBlogRow[]>(
    `
    SELECT
      id,
      title,
      slug,
      seo_title,
      meta_description,
      canonical_url,
      robots_index,
      robots_follow,
      schema_markup,
      published_at
    FROM blogs
    WHERE slug = ?
      AND status = 'published'
      AND deleted_at IS NULL
    LIMIT 1
    `,
    [slug],
  );

  return rows[0] ?? null;
}

/**
 * Finds blogs by query with optional category and tag filtering.
 *
 * @param options - Options for finding blogs.
 * @returns The blog list rows.
 */
export async function findBlogs(
  options: GetBlogsQuery,
): Promise<BlogListRow[]> {
  const offset = (options.page - 1) * options.limit;

  const where: string[] = ["b.deleted_at IS NULL"];
  const params: (string | number)[] = [];
  const joins: string[] = [];

  if (options.search) {
    where.push("(b.title LIKE ? OR b.slug LIKE ?)");
    params.push(`%${options.search}%`, `%${options.search}%`);
  }

  if (options.status) {
    where.push("b.status = ?");
    params.push(options.status);
  }

  if (options.authorId) {
    where.push("b.author_id = ?");
    params.push(options.authorId);
  }

  if (options.categoryId) {
    joins.push("INNER JOIN blog_category_map bcm ON bcm.blog_id = b.id");
    where.push("bcm.category_id = ?");
    params.push(options.categoryId);
  }

  if (options.tagId) {
    joins.push("INNER JOIN blog_tag_map btm ON btm.blog_id = b.id");
    where.push("btm.tag_id = ?");
    params.push(options.tagId);
  }

  const sortColumn = "b." + SORT_COLUMNS[options.sortBy];
  const sortDirection: "ASC" | "DESC" =
    options.sortOrder === "asc" ? "ASC" : "DESC";

  params.push(offset, options.limit);

  const [rows] = await db.query<BlogListRow[]>(
    `
    SELECT
      b.id,
      b.title,
      b.slug,
      b.excerpt,
      b.featured_image_id,
      b.author_id,
      b.status,
      b.published_at,
      b.created_at,
      b.updated_at
    FROM blogs b
    ${joins.join(" ")}
    WHERE ${where.join(" AND ")}
    ORDER BY ${sortColumn} ${sortDirection}
    LIMIT ?, ?
    `,
    params,
  );

  return rows;
}

/**
 * Counts total blogs matching the query.
 *
 * @param options - Options for finding blogs.
 * @returns The total count.
 */
export async function countBlogs(options: GetBlogsQuery): Promise<number> {
  const where: string[] = ["b.deleted_at IS NULL"];
  const params: (string | number)[] = [];
  const joins: string[] = [];

  if (options.search) {
    where.push("(b.title LIKE ? OR b.slug LIKE ?)");
    params.push(`%${options.search}%`, `%${options.search}%`);
  }

  if (options.status) {
    where.push("b.status = ?");
    params.push(options.status);
  }

  if (options.authorId) {
    where.push("b.author_id = ?");
    params.push(options.authorId);
  }

  if (options.categoryId) {
    joins.push("INNER JOIN blog_category_map bcm ON bcm.blog_id = b.id");
    where.push("bcm.category_id = ?");
    params.push(options.categoryId);
  }

  if (options.tagId) {
    joins.push("INNER JOIN blog_tag_map btm ON btm.blog_id = b.id");
    where.push("btm.tag_id = ?");
    params.push(options.tagId);
  }

  const [rows] = await db.query<CountRow[]>(
    `
    SELECT COUNT(DISTINCT b.id) AS total
    FROM blogs b
    ${joins.join(" ")}
    WHERE ${where.join(" AND ")}
    `,
    params,
  );

  return Number(rows[0].total);
}

/**
 * Finds a blog by ID.
 *
 * @param id - ID of the blog to find.
 * @returns The blog details row or null if not found.
 */
export async function findById(id: number): Promise<BlogDetailsRow | null> {
  const [rows] = await db.execute<BlogDetailsRow[]>(
    `
    SELECT
      id,
      title,
      slug,
      excerpt,
      content,
      author_id,
      featured_image_id,
      status,
      is_featured,
      seo_title,
      meta_description,
      meta_keywords,
      canonical_url,
      og_title,
      og_description,
      og_image_id,
      twitter_title,
      twitter_description,
      twitter_image_id,
      robots_index,
      robots_follow,
      schema_markup,
      published_at,
      created_at,
      updated_at
    FROM blogs
    WHERE id = ?
      AND deleted_at IS NULL
    LIMIT 1
    `,
    [id],
  );

  return rows[0] ?? null;
}

/**
 * Creates a new blog.
 *
 * @param blog - Blog data to insert.
 * @param userId - ID of the authenticated user creating the blog.
 * @returns The newly created blog ID.
 */
export async function createBlog(
  blog: CreateBlogPayload,
  userId: number,
): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    INSERT INTO blogs
    (
      title,
      slug,
      excerpt,
      content,
      author_id,
      featured_image_id,
      status,
      is_featured,

      seo_title,
      meta_description,
      meta_keywords,
      canonical_url,

      og_title,
      og_description,
      og_image_id,

      twitter_title,
      twitter_description,
      twitter_image_id,

      robots_index,
      robots_follow,
      schema_markup,

      published_at,
      created_by,
      updated_by
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CASE
    WHEN ?
      THEN CURRENT_TIMESTAMP
    ELSE NULL
  END, ?, ?)
    `,
    [
      // Basic Information
      blog.title,
      blog.slug,
      blog.excerpt ?? null,
      blog.content,
      blog.authorId ?? null,
      blog.featuredImageId ?? null,
      blog.status,
      blog.isFeatured,

      // SEO
      blog.seoTitle ?? null,
      blog.metaDescription ?? null,
      blog.metaKeywords ?? null,
      blog.canonicalUrl ?? null,

      // Open Graph
      blog.ogTitle ?? null,
      blog.ogDescription ?? null,
      blog.ogImageId ?? null,

      // Twitter Card
      blog.twitterTitle ?? null,
      blog.twitterDescription ?? null,
      blog.twitterImageId ?? null,

      blog.robotsIndex,
      blog.robotsFollow,

      // Schema
      toJson(blog.schemaMarkup),

      // Publishing
      blog.status === "published",

      // Audit
      userId,
      userId,
    ],
  );

  return result.insertId;
}

/**
 * Updates an existing blog.
 *
 * @param blogId - ID of the blog to update.
 * @param updateBlog - Blog data to update.
 * @returns The number of affected rows.
 */
export async function updateBlog(
  blogId: number,
  updateBlog: UpdateBlogPayload,
  userId: number,
): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    UPDATE blogs
    SET
      title = ?,
      slug = ?,
      excerpt = ?,
      content = ?,
      author_id = ?,
      featured_image_id = ?,
      status = ?,
      is_featured = ?,
      seo_title = ?,
      meta_description = ?,
      meta_keywords = ?,
      canonical_url = ?,
      og_title = ?,
      og_description = ?,
      og_image_id = ?,
      twitter_title = ?,
      twitter_description = ?,
      twitter_image_id = ?,
      robots_index = ?,
      robots_follow = ?,
      schema_markup = ?,
      published_at = CASE 
      WHEN ?
        THEN COALESCE(published_at, CURRENT_TIMESTAMP)
        ELSE published_at
      END,
      updated_by = ?
    WHERE id = ?
      AND deleted_at IS NULL
    `,
    [
      updateBlog.title,
      updateBlog.slug,
      updateBlog.excerpt ?? null,
      updateBlog.content,
      updateBlog.authorId ?? null,
      updateBlog.featuredImageId ?? null,
      updateBlog.status,
      updateBlog.isFeatured,
      updateBlog.seoTitle,
      updateBlog.metaDescription,
      updateBlog.metaKeywords,
      updateBlog.canonicalUrl,
      updateBlog.ogTitle,
      updateBlog.ogDescription,
      updateBlog.ogImageId,
      updateBlog.twitterTitle,
      updateBlog.twitterDescription,
      updateBlog.twitterImageId,
      updateBlog.robotsIndex,
      updateBlog.robotsFollow,
      toJson(updateBlog.schemaMarkup),
      updateBlog.status === "published",
      userId,
      blogId,
    ],
  );

  return result.affectedRows;
}

/**
 * Soft deletes a blog.
 *
 * @param blogId - ID of the blog to soft delete.
 * @returns The number of affected rows.
 */
export async function softDeleteBlog(
  blogId: number,
  deletedBy: number,
): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    UPDATE blogs
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
    [deletedBy, blogId],
  );

  return result.affectedRows;
}

export async function updateBlogStatus(
  blogId: number,
  status: BlogStatus,
  updatedBy: number,
): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    UPDATE blogs
    SET
      status = ?,
      updated_by = ?,
      published_at = CASE
        WHEN ? = 'published'
          THEN COALESCE(published_at, CURRENT_TIMESTAMP)
        ELSE published_at
      END
    WHERE id = ?
      AND deleted_at IS NULL
    `,
    [status, updatedBy, status, blogId],
  );

  return result.affectedRows;
}

// -----------------------------------------------------------------------------
// PIVOT TABLE OPERATIONS
// -----------------------------------------------------------------------------

export async function attachCategories(blogId: number, categoryIds: number[]): Promise<void> {
  if (categoryIds.length === 0) return;
  
  const values = categoryIds.map((id) => [blogId, id]);
  
  await db.query(
    `INSERT IGNORE INTO blog_category_map (blog_id, category_id) VALUES ?`,
    [values]
  );
}

export async function replaceCategories(blogId: number, categoryIds: number[]): Promise<void> {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    
    await connection.execute(`DELETE FROM blog_category_map WHERE blog_id = ?`, [blogId]);
    
    if (categoryIds.length > 0) {
      const values = categoryIds.map((id) => [blogId, id]);
      await connection.query(
        `INSERT INTO blog_category_map (blog_id, category_id) VALUES ?`,
        [values]
      );
    }
    
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function attachTags(blogId: number, tagIds: number[]): Promise<void> {
  if (tagIds.length === 0) return;
  
  const values = tagIds.map((id) => [blogId, id]);
  
  await db.query(
    `INSERT IGNORE INTO blog_tag_map (blog_id, tag_id) VALUES ?`,
    [values]
  );
}

export async function replaceTags(blogId: number, tagIds: number[]): Promise<void> {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    
    await connection.execute(`DELETE FROM blog_tag_map WHERE blog_id = ?`, [blogId]);
    
    if (tagIds.length > 0) {
      const values = tagIds.map((id) => [blogId, id]);
      await connection.query(
        `INSERT INTO blog_tag_map (blog_id, tag_id) VALUES ?`,
        [values]
      );
    }
    
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
