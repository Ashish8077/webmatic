import { apiClient } from "@/lib/api/client";
import { BLOG_ENDPOINTS } from "../constants/endpoints";
import type { ListBlogsResponse } from "../types/blog.types";
import type { BlogQuery } from "../types/blog-query";

export async function getBlogs(params: BlogQuery): Promise<ListBlogsResponse> {
  const response = await apiClient.get<ListBlogsResponse>(
    BLOG_ENDPOINTS.GET_BLOGS,
    { params },
  );
  return response.data;
}
