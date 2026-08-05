import { apiClient } from "@/lib/api/client";
import { BLOG_ENDPOINTS } from "../constants/endpoints";
import type { BaseResponse } from "@/shared/types/api.types";
import type { UpdateCategoryRequest } from "../types/blog.types";

export async function updateCategory(
  id: number,
  data: Partial<UpdateCategoryRequest>,
): Promise<BaseResponse> {
  const response = await apiClient.patch<BaseResponse>(
    BLOG_ENDPOINTS.UPDATE_CATEGORY(id),
    data,
  );
  return response.data;
}
