import { apiClient } from "@/lib/api/client";
import { BLOG_ENDPOINTS } from "../constants/endpoints";
import type { CreateTagRequest, CreateTagResponse } from "../types/blog.types";

export async function createTag(
  tag: CreateTagRequest,
): Promise<CreateTagResponse> {
  const response = await apiClient.post(BLOG_ENDPOINTS.CREATE_TAG, tag);
  return response.data;
}
