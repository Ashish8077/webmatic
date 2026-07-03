import { apiClient } from "@/lib/api";
import { PAGE_SECTION_ENDPOINTS } from "../constants/endpoints";
import type { BaseResponse } from "@/shared/types/api.types";

export async function deletePageSection(
  sectionId: number,
): Promise<BaseResponse> {
  const response = await apiClient.delete<BaseResponse>(
    PAGE_SECTION_ENDPOINTS.DELETE_PAGE_SECTION(sectionId),
  );

  return response.data;
}
