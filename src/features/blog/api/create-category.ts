import { apiClient } from "@/lib/api/client";
import { BLOG_ENDPOINTS } from "../constants/endpoints";
import type { CreateCategoryRequest, CreateCategoryResponse } from "../types/blog.types";

export async function createCategory(
  category: CreateCategoryRequest,
): Promise<CreateCategoryResponse> {
  const response = await apiClient.post(
    BLOG_ENDPOINTS.CREATE_CATEGORY,
    category,
  );
  return response.data;
}
