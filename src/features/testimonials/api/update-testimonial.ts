import { apiClient } from "@/lib/api";
import { TESTIMONIAL_ENDPOINTS } from "../constants/endpoints";
import { UpdateTestimonialRequest } from "../types/testimonial.types";
import { BaseResponse } from "@/shared/types/api.types";

export async function updateTestimonial({
  id,
  data,
}: {
  id: number;
  data: UpdateTestimonialRequest;
}): Promise<BaseResponse> {
  const response = await apiClient.patch<BaseResponse>(
    TESTIMONIAL_ENDPOINTS.TESTIMONIAL(id),
    data,
  );
  return response.data;
}
