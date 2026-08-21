import { apiClient } from "@/lib/api/client";
import { PAGES_ENDPOINTS } from "../constants/endpoints";
import type { BaseResponse } from "@/shared/types/api.types";

export async function deletePage(id: number): Promise<BaseResponse> {
  const response = await apiClient.delete<BaseResponse>(
    PAGES_ENDPOINTS.DELETE_PAGE(id),
  );

  return response.data;
}
