import { apiClient } from "@/lib/api/client";
import { PAGES_ENDPOINTS } from "../constants/endpoints";
import type { BaseResponse } from "@/shared/types/api.types";
import type { UpdatePageRequest } from "../types/page.types";

export async function updatePage(
  id: number,
  data: Partial<UpdatePageRequest>,
): Promise<BaseResponse> {
  const response = await apiClient.patch<BaseResponse>(
    PAGES_ENDPOINTS.UPDATE_PAGE(id),
    data,
  );
  return response.data;
}
