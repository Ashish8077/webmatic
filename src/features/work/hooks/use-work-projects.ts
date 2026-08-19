import { useQuery } from "@tanstack/react-query";
import { getWorkProjects, GetWorkProjectsQuery } from "../api/get-work-projects";
import { SERVICES_QUERY_KEYS } from "../constants/query-keys";

export function useWorkProjects(params: GetWorkProjectsQuery) {
  return useQuery({
    queryKey: SERVICES_QUERY_KEYS.LIST(params as Record<string, unknown>),
    queryFn: () => getWorkProjects(params),
  });
}
