import db from "@/database/connection";
import { ResultSetHeader } from "mysql2";
import { CreatePageInput } from "../validators/create-page.schema";
import {
  CountRow,
  PageDetailsRow,
  PageListRow,
  PageSlugRow,
  PublishedPageRow,
} from "./types";
import { GetPagesQuery } from "../validators/get-pages-query.schema";
import { UpdatePageInput } from "../validators/update-page.schema";

const SORT_COLUMNS = {
  title: "title",
  created_at: "created_at",
  published_at: "published_at",
} as const;

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

  const sortColumn = SORT_COLUMNS[options.sortBy] ?? SORT_COLUMNS.created_at;

  const sortDirection = options.sortOrder === "asc" ? "ASC" : "DESC";

  params.push(options.limit);
  params.push(offset);

  const [rows] = await db.execute<PageListRow[]>(
    `
    SELECT
      id,
      title,
      slug,
      status,
      published_at,
      created_at
    FROM pages
    WHERE ${where.join(" AND ")}
    ORDER BY ${sortColumn} ${sortDirection}
    LIMIT ${offset}, ${options.limit}
    `,
    params,
  );

  return rows;
}

export async function findPageById(id: number): Promise<PageDetailsRow | null> {
  const [rows] = await db.execute<PageDetailsRow[]>(
    `
    SELECT
      id,
      title,
      slug,
      status,
      template,
      seo_title,
      meta_description,
      meta_keywords,
      canonical_url,
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

  const [rows] = await db.execute<CountRow[]>(
    `
    SELECT COUNT(*) AS total
    FROM pages
    WHERE ${where.join(" AND ")}
    `,
    params,
  );

  return Number(rows[0].total);
}

export async function createPage(createPage: CreatePageInput): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    INSERT INTO pages
    (
      title,
      slug,
      status,
      template,
      seo_title,
      meta_description,
      meta_keywords,
      canonical_url,
      schema_markup
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      createPage.title,
      createPage.slug,
      createPage.status,
      createPage.template ?? null,
      createPage.seoTitle ?? null,
      createPage.metaDescription ?? null,
      createPage.metaKeywords ?? null,
      createPage.canonicalUrl ?? null,
      createPage.schemaMarkup ? JSON.stringify(createPage.schemaMarkup) : null,
    ],
  );

  return result.insertId;
}

export async function updatePage(
  pageId: number,
  updatePage: UpdatePageInput,
): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    UPDATE pages
    SET
      title = ?,
      slug = ?,
      status = ?,
      template = ?,
      seo_title = ?,
      meta_description = ?,
      meta_keywords = ?,
      canonical_url = ?,
      robots_index = ?,
      robots_follow = ?,
      schema_markup = ?
    WHERE id = ?
      AND deleted_at IS NULL
    `,
    [
      updatePage.title,
      updatePage.slug,
      updatePage.status,
      updatePage.template ?? null,
      updatePage.seoTitle ?? null,
      updatePage.metaDescription ?? null,
      updatePage.metaKeywords ?? null,
      updatePage.canonicalUrl ?? null,
      updatePage.robotsIndex ?? true,
      updatePage.robotsFollow ?? true,
      updatePage.schemaMarkup ? JSON.stringify(updatePage.schemaMarkup) : null,
      pageId,
    ],
  );

  return result.affectedRows;
}

export async function softDeletePage(pageId: number): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    UPDATE pages
    SET
      deleted_at = CURRENT_TIMESTAMP
    WHERE id = ?
      AND deleted_at IS NULL
    `,
    [pageId],
  );

  return result.affectedRows;
}

export async function updatePageStatus(
  pageId: number,
  status: "draft" | "published",
): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    UPDATE pages
    SET
      status = ?,
      published_at = CASE
        WHEN ? = 'published'
        THEN CURRENT_TIMESTAMP
        ELSE NULL
      END
    WHERE id = ?
      AND deleted_at IS NULL
    `,
    [status, status, pageId],
  );

  return result.affectedRows;
}
