import { leadRepository } from "../repositories/lead.repository";
import { UpdateLeadSchemaData } from "../validation/admin-lead.schema";
import { AppError } from "@/shared/utils/errors/app-error";
import { LEAD_STATUS, LeadStatus } from "../constants/lead.constants";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";

const VALID_TRANSITIONS: Record<LeadStatus, LeadStatus[]> = {
  [LEAD_STATUS.NEW]: [LEAD_STATUS.IN_PROGRESS, LEAD_STATUS.CONTACTED, LEAD_STATUS.CLOSED, LEAD_STATUS.SPAM],
  [LEAD_STATUS.IN_PROGRESS]: [LEAD_STATUS.CONTACTED, LEAD_STATUS.CLOSED, LEAD_STATUS.SPAM],
  [LEAD_STATUS.CONTACTED]: [LEAD_STATUS.IN_PROGRESS, LEAD_STATUS.CLOSED],
  [LEAD_STATUS.CLOSED]: [LEAD_STATUS.IN_PROGRESS], // Re-open
  [LEAD_STATUS.SPAM]: [LEAD_STATUS.NEW], // Unmark spam
};

export async function updateLeadService(id: number, updateLeadData: UpdateLeadSchemaData, user: AuthUser): Promise<void> {
  requirePermission(user, PERMISSIONS.LEAD_UPDATE);

  const currentLead = await leadRepository.findById(id);
  
  if (!currentLead) {
    throw new AppError("Lead not found", 404, undefined, "NOT_FOUND");
  }

  if (updateLeadData.status && updateLeadData.status !== currentLead.status) {
    const allowedNextStates = VALID_TRANSITIONS[currentLead.status];
    if (!allowedNextStates.includes(updateLeadData.status)) {
      throw new AppError(
        `Invalid status transition from '${currentLead.status}' to '${updateLeadData.status}'`,
        400,
        undefined,
        "INVALID_STATE_TRANSITION"
      );
    }

    const resolvedBy = updateLeadData.status === LEAD_STATUS.CLOSED ? user.userId : null;
    await leadRepository.updateStatus(id, updateLeadData.status, user.userId, resolvedBy);
  }

  if (updateLeadData.assignedTo !== undefined && updateLeadData.assignedTo !== currentLead.assigned_to) {
    await leadRepository.assignLead(id, updateLeadData.assignedTo, user.userId);
  }
}
