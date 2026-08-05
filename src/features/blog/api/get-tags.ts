import { apiClient } from "@/lib/api/client";
import { BLOG_ENDPOINTS } from "../constants/endpoints";
import type { ListTagsResponse } from "../types/blog.types";
import { GetTagsQuery } from "@/modules/blogs/validation/get-tags-query.schema";

export async function getTags(query?: Partial<GetTagsQuery>): Promise<ListTagsResponse> {
  const response = await apiClient.get<ListTagsResponse>(
    BLOG_ENDPOINTS.GET_TAGS,
    { params: query }
  );
  return response.data;
}
