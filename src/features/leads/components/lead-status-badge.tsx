import { Badge } from "@/components/ui/badge";
import { LeadStatus } from "@/modules/leads/constants/lead.constants";

interface LeadStatusBadgeProps {
  status: LeadStatus;
}

const statusConfig: Record<LeadStatus, { label: string; variant: "published" | "draft" | "active" | "inactive" | "default" | "secondary" }> = {
  new: { label: "New", variant: "default" },
  in_progress: { label: "In Progress", variant: "draft" },
  contacted: { label: "Contacted", variant: "published" },
  closed: { label: "Closed", variant: "secondary" },
  spam: { label: "Spam", variant: "inactive" },
};

export function LeadStatusBadge({ status }: LeadStatusBadgeProps) {
  const config = statusConfig[status];
  if (!config) return null;

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
}
