import { apiClient } from "@/lib/api/client";
import { BLOG_ENDPOINTS } from "../constants/endpoints";
import type { BaseResponse } from "@/shared/types/api.types";

export async function toggleBlogStatus(
  id: number,
  status: "draft" | "published" | "scheduled",
): Promise<BaseResponse> {
  const response = await apiClient.patch<BaseResponse>(
    BLOG_ENDPOINTS.UPDATE_BLOG_STATUS(id),
    { status },
  );
  return response.data;
}
