import { LeadListItem } from "@/modules/leads/types/lead.types";
import { LeadStatusBadge } from "./lead-status-badge";
import { Eye } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";

interface LeadsTableProps {
  leads: LeadListItem[];
  isLoading: boolean;
  onViewLead: (lead: LeadListItem) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function LeadsTable({
  leads,
  isLoading,
  onViewLead,
  currentPage,
  totalPages,
  onPageChange
}: LeadsTableProps) {
  if (isLoading) {
    return (
      <div className="bg-card-bg border border-card-border rounded-2xl overflow-hidden">
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground mt-3">Loading leads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card-bg border border-card-border rounded-2xl overflow-hidden flex flex-col">
      {leads.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <p className="text-sm text-muted-foreground">No leads match your filters.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-card-border">
                <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">Date</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">Name</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">Email</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">Status</th>

                <th className="text-right px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-card-border/50 last:border-0 hover:bg-surface-hover/50 transition-colors group"
                >
                  <td className="px-5 py-4 text-sm text-muted-foreground whitespace-nowrap">
                    {new Date(lead.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-foreground">{lead.name}</p>
                    {lead.company && <p className="text-xs text-muted-foreground mt-0.5">{lead.company}</p>}
                  </td>
                  <td className="px-5 py-4 text-sm text-foreground whitespace-nowrap">
                    {lead.email}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <LeadStatusBadge status={lead.status} />
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-end">
                      <button
                        title="View Lead"
                        onClick={() => onViewLead(lead)}
                        className="p-2 rounded-lg text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all cursor-pointer"
                      >
                        <Eye size={16} strokeWidth={1.8} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
