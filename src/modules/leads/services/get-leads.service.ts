import { leadRepository } from "../repositories/lead.repository";
import { LeadFilters } from "../types/repository.types";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { LeadListResponse } from "../types/lead.types";
import { toLeadListResponse } from "../mapper/lead.mapper";

export async function getLeadsService(filters: LeadFilters, user: AuthUser): Promise<LeadListResponse> {
  requirePermission(user, PERMISSIONS.LEAD_VIEW);
  const result = await leadRepository.findMany(filters);
  return toLeadListResponse(result);
}
