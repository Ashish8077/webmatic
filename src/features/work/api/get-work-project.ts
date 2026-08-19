import { apiClient } from "@/lib/api";
import { SERVICES_ENDPOINTS } from "../constants/endpoints";
import { GetWorkProjectResponse } from "../types/work-project.types";

export async function getWorkProject(id: number): Promise<GetWorkProjectResponse> {
  const response = await apiClient.get<GetWorkProjectResponse>(
    SERVICES_ENDPOINTS.GET_SERVICE_BY_ID(id),
  );
  return response.data;
}
