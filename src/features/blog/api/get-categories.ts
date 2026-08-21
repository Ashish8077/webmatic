import { apiClient } from "@/lib/api/client";
import { BLOG_ENDPOINTS } from "../constants/endpoints";
import type { ListCategoriesResponse } from "../types/blog.types";
import { GetCategoriesQuery } from "@/modules/blogs/validation/get-categories-query.schema";

export async function getCategories(query?: Partial<GetCategoriesQuery>): Promise<ListCategoriesResponse> {
  const response = await apiClient.get<ListCategoriesResponse>(
    BLOG_ENDPOINTS.GET_CATEGORIES,
    { params: query }
  );
  return response.data;
}
