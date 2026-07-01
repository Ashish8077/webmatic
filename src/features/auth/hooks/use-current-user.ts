import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "../api/get-current-user";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["current-user"],

    queryFn: getCurrentUser,

    staleTime: 5 * 60 * 1000,

    gcTime: 30 * 60 * 1000,

    retry: false,
  });
}
