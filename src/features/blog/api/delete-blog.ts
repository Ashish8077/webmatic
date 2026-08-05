import { apiClient } from "@/lib/api/client";
import { BLOG_ENDPOINTS } from "../constants/endpoints";
import type { BaseResponse } from "@/shared/types/api.types";

export async function deleteBlog(id: number): Promise<BaseResponse> {
  const response = await apiClient.delete<BaseResponse>(
    BLOG_ENDPOINTS.DELETE_BLOG(id),
  );

  return response.data;
}
