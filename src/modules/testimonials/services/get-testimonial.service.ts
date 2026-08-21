import { findTestimonialById } from "../repositories/testimonial.repository";
import { mapTestimonialRowToItem } from "../mapper/testimonial.mapper";
import { TestimonialItem } from "../types/service.types";
import { AppError } from "@/shared/utils/errors/app-error";
import { findMediaById } from "@/modules/media/repositories/media.repository";
import { StorageFactory } from "@/shared/storage/storage-factory";
import { Media } from "@/modules/media/types/media.types";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";

export async function getTestimonialService(
  id: number,
  user: AuthUser,
): Promise<TestimonialItem> {
  requirePermission(user, PERMISSIONS.PAGE_SECTIONS_VIEW);
  
  const row = await findTestimonialById(id);

  if (!row) {
    throw new AppError("Testimonial not found", 404);
  }

  const item = mapTestimonialRowToItem(row);

  if (item.profileImageId) {
    const media = await findMediaById(item.profileImageId);
    if (media) {
      const storage = StorageFactory.create();
      item.profileImage = { ...media, url: storage.getUrl(media.storagePath) } as unknown as Media;
    }
  }

  return item;
}
