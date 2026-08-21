import { apiClient } from "@/lib/api/client";
import { BLOG_ENDPOINTS } from "../constants/endpoints";
import type { BaseResponse } from "@/shared/types/api.types";
import type { UpdateTagRequest } from "../types/blog.types";

export async function updateTag(
  id: number,
  data: Partial<UpdateTagRequest>,
): Promise<BaseResponse> {
  const response = await apiClient.patch<BaseResponse>(
    BLOG_ENDPOINTS.UPDATE_TAG(id),
    data,
  );
  return response.data;
}
