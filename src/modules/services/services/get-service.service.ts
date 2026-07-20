import { AppError } from "@/shared/utils/errors/app-error";
import { findServiceById } from "../repositories/service.repository";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { toServiceDetailsResponse } from "../mapper/service.mapper";
import { ServiceDetailsResponse } from "../types/service.types";

export async function getServiceService(
  serviceId: number,
  user: AuthUser,
): Promise<ServiceDetailsResponse> {
  requirePermission(user, PERMISSIONS.SERVICES_VIEW);

  const service = await findServiceById(serviceId);

  if (!service) {
    throw new AppError("Service not found", 404);
  }

  return toServiceDetailsResponse(service);
}
