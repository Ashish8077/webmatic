import { useQuery } from "@tanstack/react-query";
import { getService } from "../api/get-service";
import { SERVICES_QUERY_KEYS } from "../constants/query-keys";

export function useService(id: number, enabled = true) {
  return useQuery({
    queryKey: SERVICES_QUERY_KEYS.DETAIL(id),
    queryFn: () => getService(id),
    enabled,
  });
}
