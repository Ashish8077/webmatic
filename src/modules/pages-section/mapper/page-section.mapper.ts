import { PageSectionListItem, PageSectionResponse } from "../types/api.types";
import { PageSectionRow } from "../types/repository.types";

export function toCreatePageSectionResponse(
  row: PageSectionRow,
): PageSectionResponse {
  return {
    section: {
      id: row.id,
      pageId: row.page_id,
      sectionType: row.section_type,
      content: row.content,
      settings: row.settings,
      sortOrder: row.sort_order,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    },
  };
}

export function toPageSectionListItem(
  row: PageSectionRow,
): PageSectionListItem {
  return {
    id: row.id,
    sectionType: row.section_type,
    content: row.content,
    settings: row.settings,
    sortOrder: row.sort_order,
    status: row.status,
  };
}

export function toPageSectionResponse(
  row: PageSectionRow,
): PageSectionResponse {
  return {
    section: {
      id: row.id,
      pageId: row.page_id,
      sectionType: row.section_type,
      content: row.content,
      settings: row.settings,
      sortOrder: row.sort_order,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    },
  };
}
