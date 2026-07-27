import { AuthUser } from "@/modules/auth/types/auth-user";
import {
  findTestimonialById,
  softDeleteTestimonial,
} from "../repositories/testimonial.repository";
import { AppError } from "@/shared/utils/errors/app-error";

export async function deleteTestimonialService(
  id: number,
  user: AuthUser,
): Promise<void> {
  const row = await findTestimonialById(id);

  if (!row) {
    throw new AppError("Testimonial not found", 404);
  }

  await softDeleteTestimonial(id, user.userId);
}
