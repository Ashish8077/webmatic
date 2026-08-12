import { apiClient } from "@/lib/api";
import { DashboardStatsResponse } from "@/modules/dashboard/types/dashboard.types";

export interface DashboardStatsApiResponse {
  success: boolean;
  message: string;
  data: DashboardStatsResponse;
}

export async function getDashboardStats(period?: number): Promise<DashboardStatsApiResponse> {
  const response = await apiClient.get<DashboardStatsApiResponse>(
    "/admin/dashboard/stats",
    { params: { period } }
  );
  return response.data;
}
