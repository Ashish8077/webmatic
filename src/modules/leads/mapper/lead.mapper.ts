import { LeadListResult, LeadListRow, LeadRow } from "../types/repository.types";
import { LeadDetailsResponse, LeadListItem, LeadListResponse } from "../types/lead.types";

/**
 * Maps the lead details row to the lead details response.
 */
export function toLeadDetailsResponse(lead: LeadRow): LeadDetailsResponse {
  return {
    id: lead.id,
    name: lead.name,
    email: lead.email,
    phone: lead.phone ?? null,
    company: lead.company ?? null,
    message: lead.message,
    ipAddress: lead.ip_address ?? null,
    userAgent: lead.user_agent ?? null,
    status: lead.status,
    assignedTo: lead.assigned_to ?? null,
    updatedByAdminId: lead.updated_by_admin_id ?? null,
    resolvedBy: lead.resolved_by ?? null,
    createdAt: lead.created_at.toISOString(),
    updatedAt: lead.updated_at.toISOString(),
  };
}

/**
 * Maps the lead list row to the lead list item.
 */
export function toLeadListItem(lead: LeadListRow): LeadListItem {
  return {
    id: lead.id,
    name: lead.name,
    email: lead.email,
    phone: lead.phone ?? null,
    company: lead.company ?? null,
    status: lead.status,
    assignedTo: lead.assigned_to ?? null,
    createdAt: lead.created_at.toISOString(),
    updatedAt: lead.updated_at.toISOString(),
  };
}

/**
 * Maps the lead list result from the repository to the lead list response.
 */
export function toLeadListResponse(result: LeadListResult): LeadListResponse {
  return {
    items: result.items.map(toLeadListItem),
    total: result.total,
    page: result.page,
    limit: result.limit,
    totalPages: result.totalPages,
  };
}
