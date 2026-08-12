import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../api/get-dashboard-stats";

export function useDashboardStats(period?: number) {
  return useQuery({
    queryKey: ["dashboard-stats", period],
    queryFn: () => getDashboardStats(period),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}
