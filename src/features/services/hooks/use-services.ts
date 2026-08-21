import { useQuery } from "@tanstack/react-query";
import { getServices, GetServicesQuery } from "../api/get-services";
import { SERVICES_QUERY_KEYS } from "../constants/query-keys";

export function useServices(params: GetServicesQuery) {
  return useQuery({
    queryKey: SERVICES_QUERY_KEYS.LIST(params as Record<string, unknown>),
    queryFn: () => getServices(params),
  });
}
