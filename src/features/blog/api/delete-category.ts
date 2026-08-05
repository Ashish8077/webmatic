import { apiClient } from "@/lib/api/client";
import { BLOG_ENDPOINTS } from "../constants/endpoints";
import type { BaseResponse } from "@/shared/types/api.types";

export async function deleteCategory(id: number): Promise<BaseResponse> {
  const response = await apiClient.delete<BaseResponse>(
    BLOG_ENDPOINTS.DELETE_CATEGORY(id),
  );

  return response.data;
}
