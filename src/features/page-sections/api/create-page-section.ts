import { apiClient } from "@/lib/api";
import { PAGE_SECTION_ENDPOINTS } from "../constants/endpoints";
import type {
  CreatePageSectionRequest,
  PageSectionResponse,
} from "../types/page-section.types";

export async function createPageSection(
  pageId: number,
  data: CreatePageSectionRequest,
): Promise<PageSectionResponse> {
  const response = await apiClient.post<PageSectionResponse>(
    PAGE_SECTION_ENDPOINTS.CREATE_PAGE_SECTION(pageId),
    data,
  );

  return response.data;
}
