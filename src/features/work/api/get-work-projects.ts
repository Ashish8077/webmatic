import { apiClient } from "@/lib/api";
import { SERVICES_ENDPOINTS } from "../constants/endpoints";
import { WorkProjectListResponse } from "../types/work-project.types";

export interface GetWorkProjectsQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  status?: string;
  isFeatured?: boolean;
}

export async function getWorkProjects(params: GetWorkProjectsQuery): Promise<WorkProjectListResponse> {
  const response = await apiClient.get<WorkProjectListResponse>(
    SERVICES_ENDPOINTS.GET_SERVICES,
    { params },
  );
  return response.data;
}
