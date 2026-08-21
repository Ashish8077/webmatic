import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPageSection } from "../api/create-page-section";
import type { CreatePageSectionRequest } from "../types/page-section.types";
import { pageSectionKeys } from "./query-keys";

export function useCreatePageSection(pageId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePageSectionRequest) =>
      createPageSection(pageId, data),
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: pageSectionKeys.list(pageId),
      });
    },
  });
}
