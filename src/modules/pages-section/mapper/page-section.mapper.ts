import { PageSectionListItem, PageSectionResponse } from "../types/api.types";
import { PageSectionRow } from "../types/repository.types";

export function toCreatePageSectionResponse(
  row: PageSectionRow,
): PageSectionResponse {
  return {
    section: {
      id: row.id,

      pageId: row.page_id,

      sectionType: row.section_type as import("@/shared/constants/section-types").HomeSectionType,

      title: row.title,

      content: row.content,

      sortOrder: row.sort_order,

      isActive: Boolean(row.is_active),

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
    sectionType: row.section_type as import("@/shared/constants/section-types").HomeSectionType,

    title: row.title,

    content: row.content,

    sortOrder: row.sort_order,

    isActive: Boolean(row.is_active),
  };
}

export function toPageSectionResponse(
  row: PageSectionRow,
): PageSectionResponse {
  return {
    section: {
      id: row.id,

      pageId: row.page_id,

      sectionType: row.section_type as import("@/shared/constants/section-types").HomeSectionType,

      title: row.title,

      content: row.content,

      sortOrder: row.sort_order,

      isActive: Boolean(row.is_active),

      createdAt: row.created_at,

      updatedAt: row.updated_at,
    },
  };
}
