import { apiClient } from "@/lib/api";
import { PAGE_SECTION_ENDPOINTS } from "../constants/endpoints";
import type { BaseResponse } from "@/shared/types/api.types";
import type { UpdatePageSectionRequest } from "../types/page-section.types";

export async function updatePageSection(
  sectionId: number,
  data: UpdatePageSectionRequest,
): Promise<BaseResponse> {
  const response = await apiClient.patch<BaseResponse>(
    PAGE_SECTION_ENDPOINTS.UPDATE_PAGE_SECTION(sectionId),
    data,
  );

  return response.data;
}
