import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query";
import { updatePageSection } from "../api/update-page-section";
import type { UpdatePageSectionRequest } from "../types/page-section.types";
import { pageSectionKeys } from "./query-keys";

interface UpdatePageSectionVariables {
  sectionId: number;
  data: UpdatePageSectionRequest;
}

export function useUpdatePageSection(pageId: number) {
  return useMutation({
    mutationFn: ({ sectionId, data }: UpdatePageSectionVariables) =>
      updatePageSection(sectionId, data),
    async onSuccess(_response, { sectionId }) {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: pageSectionKeys.list(pageId),
        }),
        queryClient.invalidateQueries({
          queryKey: pageSectionKeys.detail(sectionId),
        }),
      ]);
    },
  });
}
