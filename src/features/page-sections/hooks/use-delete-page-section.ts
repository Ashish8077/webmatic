import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query";
import { deletePageSection } from "../api/delete-page-section";
import { pageSectionKeys } from "./query-keys";

export function useDeletePageSection(pageId: number) {
  return useMutation({
    mutationFn: (sectionId: number) => deletePageSection(sectionId),
    async onSuccess(_response, sectionId) {
      await queryClient.invalidateQueries({
        queryKey: pageSectionKeys.list(pageId),
      });
      queryClient.removeQueries({
        queryKey: pageSectionKeys.detail(sectionId),
      });
    },
  });
}
