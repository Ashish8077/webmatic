import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/get-users";
import { USERS_QUERY_KEYS } from "../constants/query-keys";

export function useUsers(params: Record<string, unknown>) {
  return useQuery({
    queryKey: USERS_QUERY_KEYS.LIST(params),
    queryFn: () => getUsers(params),
  });
}
