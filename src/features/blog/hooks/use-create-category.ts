import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../api/create-category";
import { showToast } from "@/components/ui/toast";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["blog-categories"],
      });
      showToast("Category created successfully", "success");
    },
    onError(error: unknown) {
      const apiError = error as { status?: number };
      if (apiError?.status === 409) return;
      showToast("Failed to create category", "error");
    },
  });
}
