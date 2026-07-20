import { AppError } from "@/shared/utils/errors/app-error";
import { isDuplicateKeyError } from "@/shared/utils/errors/database-error.util";

import {
  createService,
  findServiceSlug,
} from "../repositories/service.repository";
import { CreateServiceInput } from "../validation/create-service.schema";

import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { AuthUser } from "@/modules/auth/types/auth-user";
import {
  toCreateServicePayload,
  toCreateServiceResponse,
} from "../mapper/service.mapper";
import { CreateServiceResponse } from "../types/service.types";

export async function createServiceService(
  serviceData: CreateServiceInput,
  user: AuthUser,
): Promise<CreateServiceResponse> {
  requirePermission(user, PERMISSIONS.SERVICES_CREATE);

  try {
    /**
     * Slug must be unique
     */
    const existingService = await findServiceSlug(
      serviceData.name,
      serviceData.slug,
    );

    console.log("existingService", existingService?.name?.trim());

    if (existingService) {
      if (existingService.name?.trim() === serviceData.name.trim()) {
        throw new AppError("Service name already exists", 409, {
          name: ["Service name already exists."],
        });
      }
      throw new AppError("Service slug already exists", 409, {
        slug: ["Service slug already exists."],
      });
    }

    /**
     * Create service
     */
    const createServiceRequest = toCreateServicePayload(serviceData);
    const serviceId = await createService(createServiceRequest, user.userId);

    return toCreateServiceResponse({
      id: serviceId,
      name: createServiceRequest.name,
      slug: createServiceRequest.slug,
      status: createServiceRequest.status,
    });
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      if (error.constraint === "uk_services_slug") {
        throw new AppError("Service slug already exists", 409, {
          slug: ["Service slug already exists."],
        });
      }

      if (error.constraint === "uk_services_name") {
        throw new AppError("Service name already exists", 409, {
          name: ["Service name already exists."],
        });
      }
    }
    throw error;
  }
}
