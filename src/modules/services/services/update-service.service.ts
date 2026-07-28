import { AppError } from "@/shared/utils/errors/app-error";
import {
  findServiceById,
  findServiceByNameOrSlugExcludingServiceId,
  updateService,
} from "../repositories/service.repository";
import { UpdateServiceInput } from "../validation/update-service.schema";
import { handleDuplicateConstraint } from "@/shared/utils/errors/database-error.util";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { toUpdateServicePayload } from "../mapper/service.mapper";
import { revalidatePath } from "next/cache";

export async function updateServiceService(
  serviceId: number,
  serviceData: UpdateServiceInput,
  user: AuthUser,
): Promise<void> {
  requirePermission(user, PERMISSIONS.SERVICES_UPDATE);

  try {
    const service = await findServiceById(serviceId);

    if (!service) {
      throw new AppError("Service not found", 404);
    }

    if (serviceData.name !== undefined || serviceData.slug !== undefined) {
      const existingService = await findServiceByNameOrSlugExcludingServiceId(
        serviceData.name,
        serviceData.slug,
        serviceId,
      );

      if (existingService) {
        if (
          serviceData.name !== undefined &&
          existingService.name === serviceData.name
        ) {
          throw new AppError("Service name already exists", 409, {
            name: ["Service name already exists."],
          });
        }

        if (
          serviceData.slug !== undefined &&
          existingService.slug === serviceData.slug
        ) {
          throw new AppError("Service slug already exists", 409, {
            slug: ["Service slug already exists."],
          });
        }
      }
    }

    const updatePayload = toUpdateServicePayload(serviceData);
 
    const updatedServiceCount = await updateService(
      serviceId,
      updatePayload,
      user.userId,
    );

    if (updatedServiceCount === 0) {
      throw new AppError("Service not found", 404);
    }

    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath(`/services/${serviceData.slug}`);
  } catch (error) {
    handleDuplicateConstraint(error, {
      uk_services_slug: {
        field: "slug",
        message: "Service slug already exists.",
      },
      uk_services_name: {
        field: "name",
        message: "Service name already exists.",
      },
    });
    throw error;
  }
}
