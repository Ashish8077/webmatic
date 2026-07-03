import { useMutation } from "@tanstack/react-query";
import { deletePage } from "../api/delete-page";
import { queryClient } from "@/lib/query";
import { showToast } from "@/components/ui/toast";

export function useDeletePage() {
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
