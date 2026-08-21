import { apiClient } from "@/lib/api/client";
import { PAGES_ENDPOINTS } from "../constants/endpoints";
import type { GetPageResponse } from "../types/page.types";

export async function getPage(id: number): Promise<GetPageResponse> {
  const response = await apiClient.get<GetPageResponse>(
    PAGES_ENDPOINTS.GET_PAGE_BY_ID(id),
  );
  return response.data;
}
