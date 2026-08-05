import { apiClient } from "@/lib/api/client";
import { BLOG_ENDPOINTS } from "../constants/endpoints";
import type { GetBlogResponse } from "../types/blog.types";

export async function getBlog(id: number): Promise<GetBlogResponse> {
  const response = await apiClient.get<GetBlogResponse>(
    BLOG_ENDPOINTS.GET_BLOG_BY_ID(id),
  );
  return response.data;
}
