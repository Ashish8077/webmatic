
import { useLead } from "../hooks/use-lead";
import { Modal } from "@/components/ui/modal";
import { LeadDetailForm } from "./lead-detail-form";

interface LeadDetailDrawerProps {
  leadId: number | null;
  onClose: () => void;
}

export function LeadDetailDrawer({ leadId, onClose }: LeadDetailDrawerProps) {
  const { data: response, isLoading } = useLead(leadId);
  const lead = response?.data;
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={!!leadId}
      onClose={() => handleClose()}
      title={lead ? lead.name : "Lead Details"}
      size="md"
    >
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 h-full">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm text-muted-foreground">Loading details...</p>
        </div>
      ) : lead ? (
        <LeadDetailForm 
          lead={lead} 
          onCancel={handleClose} 
          onSuccessClose={onClose}
        />
      ) : (
        <p className="text-sm text-danger">Lead not found or you don&apos;t have access.</p>
      )}
    </Modal>
  );
}
