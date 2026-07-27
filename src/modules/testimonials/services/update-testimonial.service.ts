import { AuthUser } from "@/modules/auth/types/auth-user";
import { UpdateTestimonialInput } from "../validation/update-testimonial.schema";
import {
  findTestimonialById,
  updateTestimonial,
} from "../repositories/testimonial.repository";
import { toUpdateTestimonialPayload } from "../mapper/testimonial.mapper";;
import { AppError } from "@/shared/utils/errors/app-error";

export async function updateTestimonialService(
  id: number,
  testimonialData: UpdateTestimonialInput,
  user: AuthUser,
): Promise<void> {
  const existing = await findTestimonialById(id);

  if (!existing) {
    throw new AppError("Testimonial not found", 404);
  }

  const updateTestimonialRequest = toUpdateTestimonialPayload(testimonialData, existing.status);

  // Ensure we have at least one field to update
  if (Object.keys(updateTestimonialRequest).length === 0) {
    return;
  }

  await updateTestimonial(id, updateTestimonialRequest, user.userId);
}
