import { useQuery } from "@tanstack/react-query";
import { getPageSections } from "../api/get-page-sections";
import { pageSectionKeys } from "./query-keys";

export function usePageSections(pageId: number) {
  return useQuery({
    queryKey: pageSectionKeys.list(pageId),
    queryFn: () => getPageSections(pageId),
    enabled: Number.isInteger(pageId) && pageId > 0,
    staleTime: 60 * 1000,
  });
}
