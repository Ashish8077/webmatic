import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePageSection } from "../api/delete-page-section";
import { pageSectionKeys } from "./query-keys";

export function useDeletePageSection(pageId: number) {
  const queryClient = useQueryClient();
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
