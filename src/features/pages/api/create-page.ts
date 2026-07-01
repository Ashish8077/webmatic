import { apiClient } from "@/lib/api/client";
import { PAGES_ENDPOINTS } from "../constants/endpoints";
import { CreatePageRequest, CreatePageResponse } from "../types/page.types";

export async function createPage(
  page: CreatePageRequest,
): Promise<CreatePageResponse> {
  const response = await apiClient.post(PAGES_ENDPOINTS.CREATE_PAGE, page);
  return response.data;
}
