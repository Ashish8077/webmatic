import { useQuery } from "@tanstack/react-query";
import { getPageSection } from "../api/get-page-section";
import { pageSectionKeys } from "./query-keys";

export function usePageSection(sectionId: number | null) {
  return useQuery({
    queryKey: sectionId
      ? pageSectionKeys.detail(sectionId)
      : pageSectionKeys.details(),
    queryFn: () => getPageSection(sectionId as number),
    enabled: Number.isInteger(sectionId) && Boolean(sectionId && sectionId > 0),
  });
}
