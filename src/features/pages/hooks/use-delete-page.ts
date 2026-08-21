import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePage } from "../api/delete-page";
import { showToast } from "@/components/ui/toast";

export function useDeletePage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deletePage(id),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["pages"] });
      showToast("Page deleted successfully", "success");
    },
    onError() {
      showToast("Failed to delete page", "error");
    },
  });
}
