import { apiClient } from "@/lib/api/client";
import { BLOG_ENDPOINTS } from "../constants/endpoints";
import type { BaseResponse } from "@/shared/types/api.types";
import type { UpdateBlogRequest } from "../types/blog.types";

export async function updateBlog(
  id: number,
  data: Partial<UpdateBlogRequest>,
): Promise<BaseResponse> {
  const response = await apiClient.patch<BaseResponse>(
    BLOG_ENDPOINTS.UPDATE_BLOG(id),
    data,
  );
  return response.data;
}
