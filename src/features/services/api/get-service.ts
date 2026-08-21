import { apiClient } from "@/lib/api";
import { SERVICES_ENDPOINTS } from "../constants/endpoints";
import { GetServiceResponse } from "../types/service.types";

export async function getService(id: number): Promise<GetServiceResponse> {
  const response = await apiClient.get<GetServiceResponse>(
    SERVICES_ENDPOINTS.GET_SERVICE_BY_ID(id),
  );
  return response.data;
}
