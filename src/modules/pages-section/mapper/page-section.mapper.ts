import { PageSectionResponse } from "../types/api.types";
import { PageSectionRow } from "../types/repository.types";

export function toCreatePageSectionResponse(
  row: PageSectionRow,
): PageSectionResponse {
  return {
    section: {
      id: row.id,

      pageId: row.page_id,

      sectionName: row.section_name,

      title: row.title,

      content: row.content,

      sortOrder: row.sort_order,

      isActive: Boolean(row.is_active),

      createdAt: row.created_at,

      updatedAt: row.updated_at,
    },
  };
}
