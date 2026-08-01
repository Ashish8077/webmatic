import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Building, Clock } from "lucide-react";
import { LeadDetailsResponse as Lead } from "@/modules/leads/types/lead.types";
import { LeadStatus } from "@/modules/leads/constants/lead.constants";
import { LEAD_STATUS } from "@/modules/leads/constants/lead.constants";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useUpdateLead } from "../hooks/use-update-lead";

interface LeadDetailFormProps {
  lead: Lead;
  onCancel: () => void;
  onSuccessClose: () => void;
}

const STATUS_OPTIONS = [
  { label: "New", value: LEAD_STATUS.NEW },
  { label: "In Progress", value: LEAD_STATUS.IN_PROGRESS },
  { label: "Contacted", value: LEAD_STATUS.CONTACTED },
  { label: "Closed", value: LEAD_STATUS.CLOSED },
  { label: "Spam", value: LEAD_STATUS.SPAM },
];

export function LeadDetailForm({ lead, onCancel, onSuccessClose }: LeadDetailFormProps) {
  const { mutate, isPending } = useUpdateLead();
  
  const { register, handleSubmit, reset, formState: { isDirty } } = useForm<{ status: LeadStatus }>({
    defaultValues: {
      status: lead.status
    }
  });

  const onSubmit = (data: { status: LeadStatus }) => {
    mutate({
      id: lead.id,
      data: {
        status: data.status,
        lastUpdatedAt: lead.updatedAt // Optimistic concurrency check
      }
    }, {
      onSuccess: () => {
        reset({ status: data.status });
        onSuccessClose();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
      <div className="space-y-6 pb-2">
        {/* Header Info */}
        <div className="flex flex-col gap-4">
          {lead.company && (
            <p className="text-sm text-muted-foreground flex items-center gap-1.5 -mt-2">
              <Building className="w-4 h-4" />
              {lead.company}
            </p>
          )}
          
          <div className="bg-surface-hover/30 p-4 rounded-lg border border-card-border flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Status</span>
            <div className="w-48">
              <Select
                options={STATUS_OPTIONS}
                disabled={isPending}
                {...register("status")}
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-0 bg-surface-hover/20 rounded-xl border border-card-border overflow-hidden">
          {lead.email && (
            <div className="flex items-center gap-3 text-sm p-4 border-b border-card-border/50 last:border-0 hover:bg-surface-hover/30 transition-colors">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <a href={`mailto:${lead.email}`} className="text-foreground hover:text-accent font-medium transition-colors">
                {lead.email}
              </a>
            </div>
          )}
          {lead.phone && (
            <div className="flex items-center gap-3 text-sm p-4 border-b border-card-border/50 last:border-0 hover:bg-surface-hover/30 transition-colors">
              <User className="w-4 h-4 text-muted-foreground" />
              <a href={`tel:${lead.phone}`} className="text-foreground hover:text-accent font-medium transition-colors">
                {lead.phone}
              </a>
            </div>
          )}
          <div className="flex items-center gap-3 text-sm p-4 hover:bg-surface-hover/30 transition-colors">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              Received on {new Date(lead.createdAt).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Message */}
        {lead.message && (
          <div>
            <h4 className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wider">Message</h4>
            <div className="bg-surface-hover/20 p-5 rounded-xl border border-card-border relative">
              <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                {lead.message}
              </p>
            </div>
          </div>
        )}

        {/* Audit Info */}
        <div className="pt-4">
          <h4 className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wider">System Information</h4>
          <div className="bg-surface-hover/20 p-4 rounded-xl border border-card-border space-y-3 text-xs text-muted-foreground">
            <div className="flex justify-between items-center">
              <span className="font-medium">Updated By:</span>
              <span className="text-foreground">
                {/* Fallback to Admin ID or Unknown since name isn't available yet */}
                {lead.updatedByAdminId ? `Admin ID: ${lead.updatedByAdminId}` : "Unknown"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Last Updated At:</span>
              <span className="text-foreground">{new Date(lead.updatedAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-card-border flex justify-end gap-3">
        <Button 
          type="button" 
          variant="secondary" 
          onClick={() => onCancel()}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={!isDirty || isPending}
        >
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
