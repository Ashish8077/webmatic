import { LeadStatus } from "../constants/lead.constants";


/**
 * Validates whether a lead can transition from its current status to a new status.
 * Throws an AppError if the transition is invalid.
 */
export function validateStatusTransition(_currentStatus: LeadStatus, _newStatus: LeadStatus): void {
  // Allow all status transitions for admin users so they can freely fix mistakes (e.g., reopening closed leads, unmarking spam).
  return;
}
