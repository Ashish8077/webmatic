import db from "@/database/connection";
import { ResultSetHeader } from "mysql2";
import { CreatePageInput } from "../validators/create-page.schema";
import { PublishedPageRow } from "./types";

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

export async function createPage(page: CreatePageInput): Promise<number> {
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
      robots_index,
      schema_markup
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      page.title,
      page.slug,
      page.status,
      page.template ?? null,
      page.seoTitle ?? null,
      page.metaDescription ?? null,
      page.metaKeywords ?? null,
      page.canonicalUrl ?? null,
      page.robotsIndex,
      page.schemaMarkup ? JSON.stringify(page.schemaMarkup) : null,
    ],
  );

  return result.insertId;
}
