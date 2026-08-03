import { useQuery } from "@tanstack/react-query";
import { getLeads } from "../api/get-leads";
import { GetLeadsQuerySchemaData } from "@/modules/leads/validation/admin-lead.schema";

export function useLeads(params: GetLeadsQuerySchemaData) {
  return useQuery({
    queryKey: ["admin-leads", params],
    queryFn: () => getLeads(params),
    staleTime: 60 * 1000, 
    gcTime: 5 * 60 * 1000,  
    placeholderData: (previousData) => previousData,
  });
}
