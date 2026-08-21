import { useQuery } from "@tanstack/react-query";
import { getWorkProject } from "../api/get-work-project";
import { SERVICES_QUERY_KEYS } from "../constants/query-keys";

export function useWorkProject(id: number, enabled = true) {
  return useQuery({
    queryKey: SERVICES_QUERY_KEYS.DETAIL(id),
    queryFn: () => getWorkProject(id),
    enabled,
  });
}
