import { apiClient } from "@/lib/api";
import { PAGE_SECTION_ENDPOINTS } from "../constants/endpoints";
import type { ListPageSectionsResponse } from "../types/page-section.types";

export async function getPageSections(
  pageId: number,
): Promise<ListPageSectionsResponse> {
  const response = await apiClient.get<ListPageSectionsResponse>(
    PAGE_SECTION_ENDPOINTS.GET_PAGE_SECTIONS(pageId),
  );

  return response.data;
}
