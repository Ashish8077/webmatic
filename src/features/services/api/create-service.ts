import { apiClient } from "@/lib/api";
import { SERVICES_ENDPOINTS } from "../constants/endpoints";
import { CreateServiceRequest, CreateServiceResponse } from "../types/service.types";

export async function createService(data: CreateServiceRequest): Promise<CreateServiceResponse> {
  const response = await apiClient.post<CreateServiceResponse>(
    SERVICES_ENDPOINTS.CREATE_SERVICE,
    data,
  );
  return response.data;
}
