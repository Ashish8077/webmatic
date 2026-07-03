import { apiClient } from "@/lib/api";
import { PAGE_SECTION_ENDPOINTS } from "../constants/endpoints";
import type { PageSectionResponse } from "../types/page-section.types";

export async function getPageSection(
  sectionId: number,
): Promise<PageSectionResponse> {
  const response = await apiClient.get<PageSectionResponse>(
    PAGE_SECTION_ENDPOINTS.GET_PAGE_SECTION(sectionId),
  );

  return response.data;
}
