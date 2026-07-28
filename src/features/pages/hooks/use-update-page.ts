import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePage } from "../api/update-page";
import type { CreatePageRequest } from "../types/page.types";

export function useUpdatePage(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<CreatePageRequest>) => updatePage(id, data),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["pages"] });
      await queryClient.invalidateQueries({ queryKey: ["page", id] });
    },
  });
}
