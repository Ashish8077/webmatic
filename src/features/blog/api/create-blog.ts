import { apiClient } from "@/lib/api/client";
import { BLOG_ENDPOINTS } from "../constants/endpoints";
import type {
  CreateBlogRequest,
  CreateBlogResponse,
} from "../types/blog.types";

export async function createBlog(
  blog: CreateBlogRequest,
): Promise<CreateBlogResponse> {
  const response = await apiClient.post(BLOG_ENDPOINTS.CREATE_BLOG, blog);
  return response.data;
}
