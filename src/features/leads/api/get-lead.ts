import { apiClient } from "@/lib/api";
import { LEADS_ENDPOINTS } from "../constants/endpoints";
import { LeadDetailsResponse } from "@/modules/leads/types/lead.types";

interface SuccessResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export async function getLead(id: number): Promise<SuccessResponse<LeadDetailsResponse>> {
  const response = await apiClient.get<SuccessResponse<LeadDetailsResponse>>(
    LEADS_ENDPOINTS.GET_LEAD(id)
  );
  return response.data;
}
