import { apiClient } from "@/lib/api";
import { LEADS_ENDPOINTS } from "../constants/endpoints";
import { LeadListResponse } from "@/modules/leads/types/lead.types";
import { GetLeadsQuerySchemaData } from "@/modules/leads/validation/admin-lead.schema";

interface SuccessResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export async function getLeads(params: GetLeadsQuerySchemaData): Promise<SuccessResponse<LeadListResponse>> {
  const response = await apiClient.get<SuccessResponse<LeadListResponse>>(
    LEADS_ENDPOINTS.GET_LEADS,
    { params },
  );
  return response.data;
}
