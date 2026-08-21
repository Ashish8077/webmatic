import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLead } from "../api/update-lead";
import { LEAD_STATUS, LeadStatus } from "@/modules/leads/constants/lead.constants";
import { toast } from "sonner";
import { LeadDetailsResponse, LeadListResponse, LeadListItem } from "@/modules/leads/types/lead.types";

export function useUpdateLead() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateLead,
    
    // Conditional optimistic update
    onMutate: async ({ id, data }) => {
      const isSafeTransition = data.status && ([LEAD_STATUS.IN_PROGRESS, LEAD_STATUS.CONTACTED] as LeadStatus[]).includes(data.status as LeadStatus);
      
      if (!isSafeTransition) return;
      
      await queryClient.cancelQueries({ queryKey: ["admin-leads"] });
      await queryClient.cancelQueries({ queryKey: ["admin-lead", id] });
      
      const previousLeads = queryClient.getQueryData(["admin-leads"]);
      const previousLead = queryClient.getQueryData(["admin-lead", id]);
      
      if (data.status) {
        queryClient.setQueryData(["admin-lead", id], (old: { data?: LeadDetailsResponse } | undefined) => {
          if (!old?.data) return old;
          return { ...old, data: { ...old.data, status: data.status } };
        });
        
        queryClient.setQueryData(["admin-leads"], (old: { data?: LeadListResponse } | undefined) => {
           // We might have a complex paginated shape depending on how we cache
           // assuming structure: { data: { items: [...] } }
           if (!old?.data?.items) return old;
           return {
             ...old,
             data: {
               ...old.data,
               items: old.data.items.map((lead: LeadListItem) => 
                 lead.id === id ? { ...lead, status: data.status } : lead
               )
             }
           }
        });
      }
      
      return { previousLeads, previousLead };
    },
    onError: (error: Error, variables, context) => {
      if (context?.previousLeads) {
        queryClient.setQueryData(["admin-leads"], context.previousLeads);
      }
      if (context?.previousLead) {
        queryClient.setQueryData(["admin-lead", variables.id], context.previousLead);
      }
      
      const message = error?.message || "Failed to update lead";
      toast.error(message);
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-leads"] });
      queryClient.invalidateQueries({ queryKey: ["admin-lead", variables.id] });
    },
  });
}
