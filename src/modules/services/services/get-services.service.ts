import { GetServicesQuery } from "../validation/get-services-query.schema";
import { countServices, findServices } from "../repositories/service.repository";

import { AuthUser } from "@/modules/auth/types/auth-user";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { toServiceListItems } from "../mapper/service.mapper";
import type { ServiceListItem, ServiceListResponse } from "../types/service.types";

export async function getServicesService(
  query: GetServicesQuery,
  user: AuthUser,
): Promise<ServiceListResponse> {
  requirePermission(user, PERMISSIONS.SERVICES_VIEW);
  
  const [rows, totalItems] = await Promise.all([
    findServices(query),
    countServices(query),
  ]);

  const items: ServiceListItem[] = toServiceListItems(rows);

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
