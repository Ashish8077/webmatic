import { ResultSetHeader } from "mysql2";

import type { CreatePageSectionInput } from "../validation/create-page-section.schema";
import db from "@/database/connection";
import { PageSectionRow } from "../types/repository.types";
import { UpdatePageSectionInput } from "../validation/update-page-section.schema";
import { QueryValue } from "@/shared/types/database";
import { toJson } from "@/shared/utils/database/json";
import { PageStatus } from "@/modules/pages/constants/page.constants";
import { SectionStatus } from "../constants/page-section.constants";

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
      content,
      settings,
      sort_order,
      status,
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
      content,
      settings,
      sort_order,
      status,
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
 * Find all active sections for a specific page
 * @param pageId - Page ID
 * @returns Array of page section rows, ordered by sort_order
 */
export async function findPageActiveSectionsByPageId(
  pageId: number,
): Promise<PageSectionRow[]> {
  const [rows] = await db.execute<PageSectionRow[]>(
    `
    SELECT
      id,
      page_id,
      section_type,
      content,
      settings,
      sort_order,
      status,
      created_at,
      updated_at
    FROM page_sections
      WHERE page_id = ?
        AND status = 'published'
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
  status: SectionStatus,
): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    INSERT INTO page_sections (
      page_id,
      section_type,
      content,
      settings,
      sort_order,
      status,
      created_by,
      updated_by
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      pageId,
      createPageSection.sectionType,
      toJson(createPageSection.content),
      toJson(createPageSection.settings ?? {}),
      createPageSection.sortOrder ?? 0,
      status,
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

  if (updatePageSection.content !== undefined) {
    updates.push("content = ?");
    values.push(toJson(updatePageSection.content));
  }

  if (updatePageSection.settings !== undefined) {
    updates.push("settings = ?");
    values.push(
      updatePageSection.settings === null
        ? null
        : toJson(updatePageSection.settings),
    );
  }

  if (updatePageSection.sortOrder !== undefined) {
    updates.push("sort_order = ?");
    values.push(updatePageSection.sortOrder);
  }

  if (updatePageSection.status !== undefined) {
    updates.push("status = ?");
    values.push(updatePageSection.status);
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
 * delete page section
 * @param sectionId - section id
 * @param deletedBy - user id
 * @returns updated page section id
 */

export async function softDeleteSection(
  sectionId: number,
  deletedBy: number,
): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    UPDATE page_sections
    SET
      deleted_at = CURRENT_TIMESTAMP,
      deleted_by = ?
    WHERE id = ?
      AND deleted_at IS NULL
    `,
    [deletedBy, sectionId],
  );

  return result.affectedRows;
}
