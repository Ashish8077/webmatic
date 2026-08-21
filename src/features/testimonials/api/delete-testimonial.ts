import { apiClient } from "@/lib/api";
import { TESTIMONIAL_ENDPOINTS } from "../constants/endpoints";
import { BaseResponse } from "@/shared/types/api.types";

export async function deleteTestimonial(id: number): Promise<BaseResponse> {
  const response = await apiClient.delete<BaseResponse>(
    TESTIMONIAL_ENDPOINTS.TESTIMONIAL(id),
  );
  return response.data;
}
