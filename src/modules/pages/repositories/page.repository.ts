import db from "@/database/connection";
import { ResultSetHeader } from "mysql2";
import { CreatePageInput } from "../schemas/create-page.schema";
import {
  CountRow,
  PageDetailsRow,
  PageListRow,
  PageSlugRow,
  PublishedPageRow,
} from "./types";
import { GetPagesQuery } from "../schemas/get-pages-query.schema";
import { UpdatePageInput } from "../schemas/update-page.schema";

type SortBy = NonNullable<GetPagesQuery["sortBy"]>;

export const SORT_COLUMNS: Record<SortBy, string> = {
  title: "title",
  slug: "slug",
  status: "status",
  created_at: "created_at",
  updated_at: "updated_at",
  published_at: "published_at",
};

/**
 * Finds a page by slug.
 *
 * @param slug - Slug of the page to find.
 * @returns The page slug row or null if not found.
 */

export async function findPageSlug(slug: string): Promise<PageSlugRow | null> {
  const [rows] = await db.execute<PageSlugRow[]>(
    `
    SELECT
      id,
      slug
    FROM pages
    WHERE slug = ?
      AND deleted_at IS NULL
    LIMIT 1
    `,
    [slug],
  );

  return rows[0] ?? null;
}

/**
 * Finds a page by slug, excluding a specific page ID.
 *
 * @param slug - Slug of the page to find.
 * @param pageId - ID of the page to exclude.
 * @returns The page slug row or null if not found.
 */

export async function findPageSlugExcludingPageId(
  slug: string,
  pageId: number,
): Promise<PageSlugRow | null> {
  const [rows] = await db.execute<PageSlugRow[]>(
    `
    SELECT
      id,
      slug
    FROM pages
    WHERE slug = ?
      AND id <> ?
      AND deleted_at IS NULL
    LIMIT 1
    `,
    [slug, pageId],
  );

  return rows[0] ?? null;
}

/**
 * Finds a published page by slug.
 *
 * @param slug - Slug of the page to find.
 * @returns The published page row or null if not found.
 */

export async function findPublishedPageBySlug(
  slug: string,
): Promise<PublishedPageRow | null> {
  const [rows] = await db.execute<PublishedPageRow[]>(
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
      template,
      published_at
    FROM pages
    WHERE slug = ?
      AND status = 'published'
      AND deleted_at IS NULL
    LIMIT 1
    `,
    [slug],
  );

  return rows[0] ?? null;
}

export async function findPublishedPageByTemplate(
  template: string,
): Promise<PublishedPageRow | null> {
  const [rows] = await db.execute<PublishedPageRow[]>(
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
      template,
      published_at
    FROM pages
    WHERE template = ?
      AND status = 'published'
      AND deleted_at IS NULL
    LIMIT 1
    `,
    [template],
  );

  return rows[0] ?? null;
}

/**
 * Finds pages by query.
 *
 * @param options - Options for finding pages.
 * @returns The page list rows.
 */

export async function findPages(
  options: GetPagesQuery,
): Promise<PageListRow[]> {
  const offset = (options.page - 1) * options.limit;

  const where: string[] = ["deleted_at IS NULL"];

  const params: (string | number)[] = [];

  if (options.search) {
    where.push("(title LIKE ? OR slug LIKE ?)");
    params.push(`%${options.search}%`, `%${options.search}%`);
  }

  if (options.status) {
    where.push("status = ?");
    params.push(options.status);
  }

  const sortColumn = SORT_COLUMNS[options.sortBy];

  const sortDirection: "ASC" | "DESC" =
    options.sortOrder === "asc" ? "ASC" : "DESC";

  params.push(offset, options.limit);

  const [rows] = await db.query<PageListRow[]>(
    `
    SELECT
      id,
      title,
      slug,
      status,
      published_at,
      created_at,
      updated_at
    FROM pages
    WHERE ${where.join(" AND ")}
    ORDER BY ${sortColumn} ${sortDirection}
    LIMIT ?, ?
    `,
    params,
  );

  return rows;
}

/**
 * Finds a page by ID.
 *
 * @param id - ID of the page to find.
 * @returns The page details row or null if not found.
 */

export async function findPageById(id: number): Promise<PageDetailsRow | null> {
  const [rows] = await db.execute<PageDetailsRow[]>(
    `
    SELECT
      id,
      title,
      slug,
      status,
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
    FROM pages
    WHERE id = ?
      AND deleted_at IS NULL
    LIMIT 1
    `,
    [id],
  );

  return rows[0] ?? null;
}

export async function countPages(options: GetPagesQuery): Promise<number> {
  const where: string[] = ["deleted_at IS NULL"];

  const params: (string | number)[] = [];

  if (options.search) {
    where.push("(title LIKE ? OR slug LIKE ?)");
    params.push(`%${options.search}%`, `%${options.search}%`);
  }

  if (options.status) {
    where.push("status = ?");
    params.push(options.status);
  }

  const [rows] = await db.query<CountRow[]>(
    `
    SELECT COUNT(*) AS total
    FROM pages
    WHERE ${where.join(" AND ")}
    `,
    params,
  );

  return Number(rows[0].total);
}

/**
 * Creates a new page.
 *
 * @param page - Page data to insert.
 * @param userId - ID of the authenticated user creating the page.
 * @returns The newly created page ID.
 */

export async function createPage(
  page: CreatePageInput,
  userId: number,
): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    INSERT INTO pages
    (
      title,
      slug,
      status,

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

      schema_markup,

      published_at,
      created_by,
      updated_by
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      // Basic Information
      page.title,
      page.slug,
      page.status,

      // SEO
      page.seoTitle ?? null,
      page.metaDescription ?? null,
      page.metaKeywords ?? null,
      page.canonicalUrl ?? null,

      // Open Graph
      page.ogTitle ?? null,
      page.ogDescription ?? null,
      page.ogImageId ?? null,

      // Twitter Card
      page.twitterTitle ?? null,
      page.twitterDescription ?? null,
      page.twitterImageId ?? null,

      // Schema

      page.schemaMarkup ? JSON.stringify(page.schemaMarkup) : null,

      // Publishing
      page.status === "published" ? new Date() : null,

      // Audit
      userId,
      userId,
    ],
  );

  return result.insertId;
}

/**
 * Updates an existing page.
 *
 * @param pageId - ID of the page to update.
 * @param updatePage - Page data to update.
 * @returns The number of affected rows.
 */

export async function updatePage(
  pageId: number,
  updatePage: UpdatePageInput,
  userId: number,
): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    UPDATE pages
    SET
      title = ?,
      slug = ?,
      status = ?,
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
      published_at = ?,
      updated_by = ?
    WHERE id = ?
      AND deleted_at IS NULL
    `,
    [
      updatePage.title,
      updatePage.slug,
      updatePage.status,
      updatePage.seoTitle ?? null,
      updatePage.metaDescription ?? null,
      updatePage.metaKeywords ?? null,
      updatePage.canonicalUrl ?? null,
      updatePage.ogTitle ?? null,
      updatePage.ogDescription ?? null,
      updatePage.ogImageId ?? null,
      updatePage.twitterTitle ?? null,
      updatePage.twitterDescription ?? null,
      updatePage.twitterImageId ?? null,
      updatePage.robotsIndex ?? true,
      updatePage.robotsFollow ?? true,
      updatePage.schemaMarkup ? JSON.stringify(updatePage.schemaMarkup) : null,
      updatePage.status === "published" ? new Date() : null,
      userId,
      pageId,
    ],
  );

  return result.affectedRows;
}

/**
 * Soft deletes a page.
 *
 * @param pageId - ID of the page to soft delete.
 * @returns The number of affected rows.
 */

export async function softDeletePage(
  pageId: number,
  deletedBy: number,
): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    UPDATE pages
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
    [deletedBy, pageId],
  );

  return result.affectedRows;
}

export async function updatePageStatus(
  pageId: number,
  status: "draft" | "published",
  updatedBy: number,
): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    UPDATE pages
    SET
      status = ?,
      updated_by = ?,
      published_at = CASE
        WHEN ? = 'published'
          THEN COALESCE(published_at, CURRENT_TIMESTAMP)
        ELSE NULL
      END
    WHERE id = ?
      AND deleted_at IS NULL
    `,
    [status, updatedBy, status, pageId],
  );

  return result.affectedRows;
}
