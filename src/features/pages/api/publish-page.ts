import { apiClient } from "@/lib/api/client";
import { PAGES_ENDPOINTS } from "../constants/endpoints";
import type { BaseResponse } from "@/shared/types/api.types";

export async function togglePageStatus(
  id: number,
  status: "draft" | "published",
): Promise<BaseResponse> {
  const response = await apiClient.patch<BaseResponse>(
    PAGES_ENDPOINTS.UPDATE_PAGE_STATUS(id),
    { status },
  );
  return response.data;
}
