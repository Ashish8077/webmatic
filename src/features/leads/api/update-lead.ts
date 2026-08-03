import { apiClient } from "@/lib/api";
import { LEADS_ENDPOINTS } from "../constants/endpoints";
import { UpdateLeadCommandData } from "@/modules/leads/validation/admin-lead.schema";

interface SuccessResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export async function updateLead({ id, data }: { id: number; data: UpdateLeadCommandData }): Promise<SuccessResponse<void>> {
  const response = await apiClient.patch<SuccessResponse<void>>(
    LEADS_ENDPOINTS.UPDATE_LEAD(id),
    data
  );
  return response.data;
}
