import { AuthUser } from "@/modules/auth/types/auth-user";
import {
  findTestimonialById,
  softDeleteTestimonial,
} from "../repositories/testimonial.repository";
import { AppError } from "@/shared/utils/errors/app-error";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";

export async function deleteTestimonialService(
  id: number,
  user: AuthUser,
): Promise<void> {
  requirePermission(user, PERMISSIONS.PAGE_SECTIONS_DELETE);

  const row = await findTestimonialById(id);

  if (!row) {
    throw new AppError("Testimonial not found", 404);
  }

  await softDeleteTestimonial(id, user.userId);
}
