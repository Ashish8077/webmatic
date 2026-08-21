import { GetServicesQuery } from "../validation/get-services-query.schema";
import { countServices, findServices } from "../repositories/service.repository";
import { findMediaById } from "@/modules/media/repositories/media.repository";
import { StorageFactory } from "@/shared/storage/storage-factory";

import { AuthUser } from "@/modules/auth/types/auth-user";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { toServiceListItems } from "../mapper/service.mapper";
import type { ServiceListItem, ServiceListResponse } from "../types/service.types";
import { AppError } from "@/shared/utils/errors/app-error";

export async function getServicesService(
  query: GetServicesQuery,
  user?: AuthUser,
): Promise<ServiceListResponse> {
  if (user) {
    requirePermission(user, PERMISSIONS.SERVICES_VIEW);
  } else if (query.status !== "published") {
    throw new AppError("Unauthorized: Can only view published services", 401);
  }
  
  const [rows, totalItems] = await Promise.all([
    findServices(query),
    countServices(query),
  ]);

  const items: ServiceListItem[] = toServiceListItems(rows);

  // Hydrate images for the service list
  const storage = StorageFactory.create();
  await Promise.all(
    items.map(async (item) => {
      if (item.visualType === "image" && item.imageId) {
        const media = await findMediaById(item.imageId);
        if (media) {
          item.image = { ...media, url: storage.getUrl(media.storagePath) };
        }
      }
    })
  );

  const totalPages = Math.ceil(totalItems / query.limit);

  return {
    items,
    pagination: {
      page: query.page,
      limit: query.limit,
      totalItems,
      totalPages,
      hasNextPage: query.page < totalPages,
      hasPreviousPage: query.page > 1,
    },
  };
}
