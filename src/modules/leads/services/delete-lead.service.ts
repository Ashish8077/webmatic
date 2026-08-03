import { leadRepository } from "../repositories/lead.repository";
import { AppError } from "@/shared/utils/errors/app-error";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";

export async function deleteLeadService(id: number, user: AuthUser): Promise<void> {
  requirePermission(user, PERMISSIONS.LEAD_DELETE);
  
  const exists = await leadRepository.exists(id);
  
  if (!exists) {
    throw new AppError("Lead not found", 404, undefined, "NOT_FOUND");
  }

  await leadRepository.softDelete(id);
}
