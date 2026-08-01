import { leadRepository } from "../repositories/lead.repository";
import { LeadFilters } from "../types/repository.types";
import { AuthUser } from "@/modules/auth/types/auth-user";
import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";

export function exportLeadsService(filters: Omit<LeadFilters, "page" | "limit">, user: AuthUser): ReadableStream {
  requirePermission(user, PERMISSIONS.LEAD_EXPORT);

  const headers = [
    "Name",
    "Email",
    "Phone",
    "Company",
    "Status",
    "Assigned Admin",
    "Created At",
    "Updated At",
  ];

  const escapeCSV = (value: string | number | null | undefined | Date): string => {
    if (value === null || value === undefined) return '""';
    if (value instanceof Date) return `"${value.toISOString()}"`;
    const str = String(value).replace(/"/g, '""');
    return `"${str}"`;
  };

  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      // Add UTF-8 BOM
      controller.enqueue(encoder.encode("\uFEFF"));
      controller.enqueue(encoder.encode(headers.join(",") + "\n"));
      
      let lastId = 0;
      const limit = 500;
      let hasMore = true;

      try {
        while (hasMore) {
          const batch = await leadRepository.findBatchForExport(lastId, limit, filters);
          
          if (batch.length === 0) {
            hasMore = false;
            break;
          }

          let chunk = "";
          for (const lead of batch) {
            const row = [
              lead.name,
              lead.email,
              lead.phone,
              lead.company,
              lead.status,
              lead.assigned_to, // Assigned Admin ID
              lead.created_at,
              lead.updated_at
            ].map(escapeCSV).join(",");
            chunk += row + "\n";
            lastId = lead.id;
          }

          controller.enqueue(encoder.encode(chunk));
        }
      } catch (error) {
        controller.error(error);
      } finally {
        controller.close();
      }
    }
  });
}
