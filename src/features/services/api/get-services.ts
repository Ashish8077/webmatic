import { apiClient } from "@/lib/api";
import { SERVICES_ENDPOINTS } from "../constants/endpoints";
import { ServiceListResponse } from "../types/service.types";

export interface GetServicesQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  status?: string;
  isFeatured?: boolean;
}

export async function getServices(params: GetServicesQuery): Promise<ServiceListResponse> {
  const response = await apiClient.get<ServiceListResponse>(
    SERVICES_ENDPOINTS.GET_SERVICES,
    { params },
  );
  return response.data;
}
