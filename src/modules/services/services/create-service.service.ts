import { AuthUser } from "@/modules/auth/types/auth-user";
import { CreateServiceInput } from "../validation/create-service.schema";
import { requirePermission } from "@/modules/auth/authorization/permission";

import { Permission } from "@/features/auth/constants/permissions";

export async function createService(
  serviceData: CreateServiceInput,
  user: AuthUser,
): Promise<void> {
  requirePermission(user, Permission.SERVICES_CREATE);
}
