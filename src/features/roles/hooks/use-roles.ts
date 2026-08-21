import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../api/get-roles";
import { ROLES_QUERY_KEYS } from "../constants/query-keys";

export function useRoles() {
  return useQuery({
    queryKey: ROLES_QUERY_KEYS.LIST(),
    queryFn: getRoles,
  });
}
