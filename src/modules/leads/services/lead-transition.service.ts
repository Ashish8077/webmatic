import { LeadStatus, LEAD_STATUS } from "../constants/lead.constants";
import { AppError } from "@/shared/utils/errors/app-error";

/**
 * Validates whether a lead can transition from its current status to a new status.
 * Throws an AppError if the transition is invalid.
 */
export function validateStatusTransition(currentStatus: LeadStatus, newStatus: LeadStatus): void {
  // If the status is not changing, it's always valid
  if (currentStatus === newStatus) {
    return;
  }

  const validTransitions: Record<LeadStatus, LeadStatus[]> = {
    [LEAD_STATUS.NEW]: [LEAD_STATUS.IN_PROGRESS, LEAD_STATUS.CONTACTED, LEAD_STATUS.CLOSED, LEAD_STATUS.SPAM],
    [LEAD_STATUS.IN_PROGRESS]: [LEAD_STATUS.CONTACTED, LEAD_STATUS.CLOSED],
    [LEAD_STATUS.CONTACTED]: [LEAD_STATUS.CLOSED],
    [LEAD_STATUS.CLOSED]: [], // Terminal state
    [LEAD_STATUS.SPAM]: [], // Terminal state
  };

  const allowedNextStates = validTransitions[currentStatus];

  if (!allowedNextStates.includes(newStatus)) {
    throw new AppError(
      `Invalid status transition from '${currentStatus}' to '${newStatus}'.`,
      400,
      undefined,
      "INVALID_STATE_TRANSITION"
    );
  }
}
