import { apiClient } from "@/lib/api";
import { SERVICES_ENDPOINTS } from "../constants/endpoints";
import { UpdateServiceRequest } from "../types/service.types";
import { BaseResponse } from "@/shared/types/api.types";

export async function updateService({
  id,
  data,
}: {
  id: number;
  data: UpdateServiceRequest;
}): Promise<BaseResponse> {
  const response = await apiClient.patch<BaseResponse>(
    SERVICES_ENDPOINTS.UPDATE_SERVICE(id),
    data,
  );
  return response.data;
}
