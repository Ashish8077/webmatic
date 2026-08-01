import { leadRepository } from "../repositories/lead.repository";
import { AppError } from "@/shared/utils/errors/app-error";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { LeadDetailsResponse } from "../types/lead.types";
import { toLeadDetailsResponse } from "../mapper/lead.mapper";

export async function getLeadByIdService(id: number, user: AuthUser): Promise<LeadDetailsResponse> {
  requirePermission(user, PERMISSIONS.LEAD_VIEW);
  
  const lead = await leadRepository.findById(id);
  
  if (!lead) {
    throw new AppError("Lead not found", 404, undefined, "NOT_FOUND");
  }

  return toLeadDetailsResponse(lead);
}
