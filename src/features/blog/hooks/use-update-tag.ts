import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTag } from "../api/update-tag";
import { showToast } from "@/components/ui/toast";
import type { CreateTagRequest } from "../types/blog.types";

export function useUpdateTag(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<CreateTagRequest>) => updateTag(id, data),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["blog-tags"] });
      showToast("Tag updated successfully", "success");
    },
    onError(error: unknown) {
      const apiError = error as { status?: number };
      if (apiError?.status === 409) return;
      showToast("Failed to update tag", "error");
    },
  });
}
