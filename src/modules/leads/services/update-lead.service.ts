import { leadRepository } from "../repositories/lead.repository";
import { UpdateLeadCommandData } from "../validation/admin-lead.schema";
import { AppError } from "@/shared/utils/errors/app-error";
import { LEAD_STATUS } from "../constants/lead.constants";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { validateStatusTransition } from "./lead-transition.service";

export async function updateLeadService(id: number, updateLeadData: UpdateLeadCommandData, user: AuthUser): Promise<void> {
  requirePermission(user, PERMISSIONS.LEAD_UPDATE);

  const currentLead = await leadRepository.findById(id);
  
  if (!currentLead) {
    throw new AppError("Lead not found", 404, undefined, "NOT_FOUND");
  }

  // Optimistic concurrency check
  if (currentLead.updated_at.toISOString() !== updateLeadData.lastUpdatedAt) {
    throw new AppError("Lead has been modified by another user since it was last fetched. Please refresh and try again.", 409, undefined, "CONFLICT");
  }

  if (updateLeadData.status && updateLeadData.status !== currentLead.status) {
    validateStatusTransition(currentLead.status, updateLeadData.status);

    const resolvedBy = updateLeadData.status === LEAD_STATUS.CLOSED ? user.userId : null;
    await leadRepository.updateStatus(id, updateLeadData.status, user.userId, resolvedBy);
  }

  if (updateLeadData.assignedTo !== undefined && updateLeadData.assignedTo !== currentLead.assigned_to) {
    await leadRepository.assignLead(id, updateLeadData.assignedTo, user.userId);
  }
}
