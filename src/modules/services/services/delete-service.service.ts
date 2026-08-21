import { AppError } from "@/shared/utils/errors/app-error";
import {
  findServiceById,
  softDeleteService,
} from "../repositories/service.repository";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";

export async function deleteServiceService(
  serviceId: number,
  user: AuthUser,
): Promise<void> {
  requirePermission(user, PERMISSIONS.SERVICES_DELETE);

  const service = await findServiceById(serviceId);

  if (!service) {
    throw new AppError("Service not found", 404);
  }

  const deletedCount = await softDeleteService(serviceId, user.userId);

  if (deletedCount === 0) {
    throw new AppError("Service not found", 404);
  }
}
