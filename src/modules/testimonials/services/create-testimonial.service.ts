import { AuthUser } from "@/modules/auth/types/auth-user";
import { CreateTestimonialInput } from "../validation/create-testimonial.schema";
import { createTestimonial } from "../repositories/testimonial.repository";
import { toCreateTestimonialPayload } from "../mapper/testimonial.mapper";
import { CreateTestimonialResponse } from "../types/service.types";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";

export async function createTestimonialService(
  testimonialData: CreateTestimonialInput,
  user: AuthUser,
): Promise<CreateTestimonialResponse> {
  requirePermission(user, PERMISSIONS.PAGE_SECTIONS_CREATE);

  const createTestimonialRequest = toCreateTestimonialPayload(testimonialData);

  const id = await createTestimonial(createTestimonialRequest, user.userId);

  return {
    testimonial: {
      id,
      clientName: testimonialData.clientName,
      status: testimonialData.status,
    },
  };
}
