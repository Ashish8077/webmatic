import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../api/delete-category";
import { showToast } from "@/components/ui/toast";

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["blog-categories"] });
      showToast("Category deleted successfully", "success");
    },
    onError() {
      showToast("Failed to delete category", "error");
    },
  });
}
