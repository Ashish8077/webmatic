import { apiClient } from "@/lib/api/client";
import { BLOG_ENDPOINTS } from "../constants/endpoints";
import type { BaseResponse } from "@/shared/types/api.types";

export async function deleteTag(id: number): Promise<BaseResponse> {
  const response = await apiClient.delete<BaseResponse>(
    BLOG_ENDPOINTS.DELETE_TAG(id),
  );

  return response.data;
}
