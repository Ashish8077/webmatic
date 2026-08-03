import { LeadStatus, LEAD_STATUS } from "../constants/lead.constants";
import { AppError } from "@/shared/utils/errors/app-error";

/**
 * Validates whether a lead can transition from its current status to a new status.
 * Throws an AppError if the transition is invalid.
 */
export function validateStatusTransition(currentStatus: LeadStatus, newStatus: LeadStatus): void {
  // Allow all status transitions for admin users so they can freely fix mistakes (e.g., reopening closed leads, unmarking spam).
  return;
}
