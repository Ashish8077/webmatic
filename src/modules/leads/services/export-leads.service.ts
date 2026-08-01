import { leadRepository } from "../repositories/lead.repository";
import { LeadFilters } from "../types/repository.types";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";

export async function exportLeadsService(filters: Omit<LeadFilters, "page" | "limit">, user: AuthUser): Promise<string> {
  requirePermission(user, PERMISSIONS.LEAD_EXPORT);
  
  // Use a high limit for export, or implement true streaming later if dataset grows
  const exportLimit = 50000;
  
  const result = await leadRepository.findMany({
    ...filters,
    page: 1,
    limit: exportLimit,
  });

  const headers = [
    "ID",
    "Name",
    "Email",
    "Phone",
    "Company",
    "Status",
    "Assigned To",
    "Created At",
    "Updated At",
  ];

  const escapeCSV = (value: string | number | null | undefined | Date): string => {
    if (value === null || value === undefined) return '""';
    if (value instanceof Date) return `"${value.toISOString()}"`;
    const str = String(value).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = result.items.map(lead => [
    lead.id,
    lead.name,
    lead.email,
    lead.phone,
    lead.company,
    lead.status,
    lead.assigned_to,
    lead.created_at,
    lead.updated_at
  ].map(escapeCSV).join(","));

  return [headers.join(","), ...rows].join("\n");
}
