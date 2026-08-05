import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory } from "../api/update-category";
import { showToast } from "@/components/ui/toast";
import type { CreateCategoryRequest } from "../types/blog.types";

export function useUpdateCategory(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<CreateCategoryRequest>) => updateCategory(id, data),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["blog-categories"] });
      showToast("Category updated successfully", "success");
    },
    onError(error: any) {
      if (error?.status === 409) return;
      showToast("Failed to update category", "error");
    },
  });
}
