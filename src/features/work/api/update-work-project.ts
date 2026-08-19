import { apiClient } from "@/lib/api";
import { SERVICES_ENDPOINTS } from "../constants/endpoints";
import { UpdateWorkProjectRequest } from "../types/work-project.types";
import { BaseResponse } from "@/shared/types/api.types";

export async function updateWorkProject({
  id,
  data,
}: {
  id: number;
  data: UpdateWorkProjectRequest;
}): Promise<BaseResponse> {
  const response = await apiClient.patch<BaseResponse>(
    SERVICES_ENDPOINTS.UPDATE_SERVICE(id),
    data,
  );
  return response.data;
}
