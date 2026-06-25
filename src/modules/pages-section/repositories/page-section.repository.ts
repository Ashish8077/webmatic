import { ResultSetHeader } from "mysql2";

import type { CreatePageSectionInput } from "../validators/create-page-section.schema";
import db from "@/database/connection";
import { PageSectionRow } from "../types/repository.types";

/**
 * Find a page section by its ID
 * @param id - Page section ID
 * @returns Page section row or null if not found
 */
export async function findPageSectionById(
  id: number,
): Promise<PageSectionRow | null> {
  const [rows] = await db.execute<PageSectionRow[]>(
    `
      SELECT
        id,
        page_id,
        section_name,
        title,
        content,
        sort_order,
        is_active,
        created_at,
        updated_at
      FROM page_sections
      WHERE id = ?
        AND deleted_at IS NULL
      LIMIT 1
      `,
    [id],
  );

  return rows[0] ?? null;
}

/**
 * Create a new page section
 * @param pageId - Page ID
 * @param createPageSection - Page section data
 * @param userId - User ID
 * @returns Created page section ID
 */
export async function createPageSection(
  pageId: number,
  createPageSection: CreatePageSectionInput,
  userId: number,
): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    INSERT INTO page_sections (
      page_id,
      section_name,
      title,
      content,
      sort_order,
      is_active,
      created_by,
      updated_by
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      pageId,
      createPageSection.sectionName,
      createPageSection.title ?? null,
      JSON.stringify(createPageSection.content),
      createPageSection.sortOrder,
      createPageSection.isActive,
      userId,
      userId,
    ],
  );

  return result.insertId;
}
