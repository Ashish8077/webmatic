import { apiClient } from "@/lib/api";
import { PAGES_ENDPOINTS } from "../constants/endpoints";
import { ListPagesResponse } from "../types/page.types";
import type { PageQuery } from "../types/page-query";

export async function getPages(params: PageQuery): Promise<ListPagesResponse> {
  const response = await apiClient.get<ListPagesResponse>(
    PAGES_ENDPOINTS.GET_PAGES,
    { params },
  );
  return response.data;
}
