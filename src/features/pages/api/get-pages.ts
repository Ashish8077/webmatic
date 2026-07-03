import { apiClient } from "@/lib/api";
import { PAGES_ENDPOINTS } from "../constants/endpoints";
import { ListPagesResponse } from "../types/page.types";

export async function getPages(params: any): Promise<any> {
  const response = await apiClient.get<ListPagesResponse>(
    PAGES_ENDPOINTS.GET_PAGES,
    { params },
  );
  return response.data;
}
