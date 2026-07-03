import { ResultSetHeader } from "mysql2";

import type { CreatePageSectionInput } from "../validators/create-page-section.schema";
import db from "@/database/connection";
import { PageSectionRow } from "../types/repository.types";
import { UpdatePageSectionInput } from "../validators/update-page-section.schema";
import { QueryValue } from "@/shared/types/database";

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
        section_type,
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
 * Find all sections for a specific page
 * @param pageId - Page ID
 * @returns Array of page section rows, ordered by sort_order
 */
export async function findPageSectionsByPageId(
  pageId: number,
): Promise<PageSectionRow[]> {
  const [rows] = await db.execute<PageSectionRow[]>(
    `
    SELECT
      id,
      page_id,
      section_type,
      title,
      content,
      sort_order,
      is_active,
      created_at,
      updated_at
    FROM page_sections
    WHERE page_id = ?
      AND deleted_at IS NULL
    ORDER BY sort_order ASC
    `,
    [pageId],
  );

  return rows;
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
      section_type,
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
      createPageSection.sectionType,
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

/**
 * update page section
 * @param sectionId - section id
 * @param sectionData - page section data
 * @param userId - user id
 * @returns updated page section id
 */

export async function updatePageSection(
  sectionId: number,
  updatePageSection: UpdatePageSectionInput,
  updatedBy: number,
): Promise<number> {
  const updates: string[] = [];
  const values: QueryValue[] = [];

  if (updatePageSection.title !== undefined) {
    updates.push("title = ?");
    values.push(updatePageSection.title);
  }

  if (updatePageSection.content !== undefined) {
    updates.push("content = ?");
    values.push(JSON.stringify(updatePageSection.content));
  }

  if (updatePageSection.sortOrder !== undefined) {
    updates.push("sort_order = ?");
    values.push(updatePageSection.sortOrder);
  }

  if (updatePageSection.isActive !== undefined) {
    updates.push("is_active = ?");
    values.push(updatePageSection.isActive);
  }

  updates.push("updated_by = ?");
  values.push(updatedBy);

  values.push(sectionId);

  const [result] = await db.execute<ResultSetHeader>(
    `
    UPDATE page_sections
    SET
      ${updates.join(", ")}
    WHERE id = ?
      AND deleted_at IS NULL
    `,
    values,
  );
  return result.affectedRows;
}

/**
 * find page section by id
 * @param sectionId - section id
 * @returns page section row or null
 */
export async function findSectionById(
  sectionId: number,
): Promise<PageSectionRow | null> {
  const [rows] = await db.execute<PageSectionRow[]>(
    `
    SELECT
      id,
      page_id,
      section_type,
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
    [sectionId],
  );
  return rows[0] ?? null;
}

/**
 * delete page section
 * @param sectionId - section id
 * @param deletedBy - user id
 * @returns updated page section id
 */

export async function softDeleteSection(sectionId: number): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    UPDATE page_sections
    SET
      deleted_at = CURRENT_TIMESTAMP
    WHERE id = ?
      AND deleted_at IS NULL
    `,
    [sectionId],
  );

  return result.affectedRows;
}
