import { useState } from "react";
import { Select } from "@/components/ui/select";
import { LeadStatus } from "@/modules/leads/constants/lead.constants";
import { useUpdateLead } from "../hooks/use-update-lead";

interface UpdateStatusMenuProps {
  leadId: number;
  currentStatus: LeadStatus;
}

const STATUS_OPTIONS = [
  { label: "New", value: "new" },
  { label: "In Progress", value: "in_progress" },
  { label: "Contacted", value: "contacted" },
  { label: "Closed", value: "closed" },
  { label: "Spam", value: "spam" },
];

export function UpdateStatusMenu({ leadId, currentStatus }: UpdateStatusMenuProps) {
  const { mutate, isPending } = useUpdateLead();
  const [status, setStatus] = useState<LeadStatus>(currentStatus);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as LeadStatus;
    setStatus(newStatus);
    
    mutate({
      id: leadId,
      data: {
        status: newStatus,
        lastUpdatedAt: new Date().toISOString() // Required for optimistic concurrency in backend
      }
    });
  };

  return (
    <div className="flex items-center gap-3">
      <div className="w-48">
        <Select
          options={STATUS_OPTIONS}
          value={status}
          onChange={handleChange}
          disabled={isPending}
        />
      </div>
      {isPending && (
        <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      )}
    </div>
  );
}
