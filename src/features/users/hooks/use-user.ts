import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/get-user";
import { USERS_QUERY_KEYS } from "../constants/query-keys";

export function useUser(id: number) {
  return useQuery({
    queryKey: USERS_QUERY_KEYS.DETAIL(id),
    queryFn: () => getUser(id),
    enabled: !!id,
  });
}
