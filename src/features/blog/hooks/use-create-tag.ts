import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTag } from "../api/create-tag";
import { showToast } from "@/components/ui/toast";

export function useCreateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTag,
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["blog-tags"],
      });
      showToast("Tag created successfully", "success");
    },
    onError(error: unknown) {
      const apiError = error as { status?: number };
      if (apiError?.status === 409) return;
      showToast("Failed to create tag", "error");
    },
  });
}
