import { apiClient } from "@/lib/api";
import { SERVICES_ENDPOINTS } from "../constants/endpoints";
import { CreateWorkProjectRequest, CreateWorkProjectResponse } from "../types/work-project.types";

export async function createWorkProject(data: CreateWorkProjectRequest): Promise<CreateWorkProjectResponse> {
  const response = await apiClient.post<CreateWorkProjectResponse>(
    SERVICES_ENDPOINTS.CREATE_SERVICE,
    data,
  );
  return response.data;
}
