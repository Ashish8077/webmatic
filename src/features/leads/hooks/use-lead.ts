import { useQuery } from "@tanstack/react-query";
import { getLead } from "../api/get-lead";

export function useLead(id: number | null) {
  return useQuery({
    queryKey: ["admin-lead", id],
    queryFn: () => getLead(id!),
    enabled: !!id,
    staleTime: 60 * 1000,
  });
}
