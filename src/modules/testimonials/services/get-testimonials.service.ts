import { GetTestimonialsQueryInput } from "../validation/get-testimonials-query.schema";
import { findTestimonials, countTestimonials } from "../repositories/testimonial.repository";
import { mapTestimonialRowToItem } from "../mapper/testimonial.mapper";
import { TestimonialListResponse } from "../types/service.types";
import { findMediaById } from "@/modules/media/repositories/media.repository";
import { StorageFactory } from "@/shared/storage/storage-factory";
import { Media } from "@/modules/media/types/media.types";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";

export async function getTestimonialsService(
  query: GetTestimonialsQueryInput,
  user: AuthUser,
): Promise<TestimonialListResponse> {
  requirePermission(user, PERMISSIONS.PAGE_SECTIONS_VIEW);

  const [rows, total] = await Promise.all([
    findTestimonials(query),
    countTestimonials(query),
  ]);

  const items = rows.map(mapTestimonialRowToItem);
  const storage = StorageFactory.create();

  // Hydrate media for each testimonial
  await Promise.all(
    items.map(async (item) => {
      if (item.profileImageId) {
        const media = await findMediaById(item.profileImageId);
        if (media) {
          item.profileImage = { ...media, url: storage.getUrl(media.storagePath) } as unknown as Media;
        }
      }
    })
  );

  const totalPages = Math.ceil(total / query.limit);

  return {
    items,
    pagination: {
      totalItems: total,
      page: query.page,
      limit: query.limit,
      totalPages,
      hasNextPage: query.page < totalPages,
      hasPreviousPage: query.page > 1,
    },
  };
}

export async function getPublicTestimonialsService(
  query: GetTestimonialsQueryInput,
): Promise<TestimonialListResponse> {
  const [rows, total] = await Promise.all([
    findTestimonials(query),
    countTestimonials(query),
  ]);

  const items = rows.map(mapTestimonialRowToItem);
  const storage = StorageFactory.create();

  // Hydrate media for each testimonial
  await Promise.all(
    items.map(async (item) => {
      if (item.profileImageId) {
        const media = await findMediaById(item.profileImageId);
        if (media) {
          item.profileImage = { ...media, url: storage.getUrl(media.storagePath) } as unknown as Media;
        }
      }
    })
  );

  const totalPages = Math.ceil(total / query.limit);

  return {
    items,
    pagination: {
      totalItems: total,
      page: query.page,
      limit: query.limit,
      totalPages,
      hasNextPage: query.page < totalPages,
      hasPreviousPage: query.page > 1,
    },
  };
}
