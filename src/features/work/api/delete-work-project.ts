import { apiClient } from "@/lib/api";
import { SERVICES_ENDPOINTS } from "../constants/endpoints";
import { BaseResponse } from "@/shared/types/api.types";

export async function deleteWorkProject(id: number): Promise<BaseResponse> {
  const response = await apiClient.delete<BaseResponse>(
    SERVICES_ENDPOINTS.DELETE_SERVICE(id),
  );
  return response.data;
}
