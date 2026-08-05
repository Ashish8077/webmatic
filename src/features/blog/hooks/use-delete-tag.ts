import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTag } from "../api/delete-tag";
import { showToast } from "@/components/ui/toast";

export function useDeleteTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteTag(id),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["blog-tags"] });
      showToast("Tag deleted successfully", "success");
    },
    onError() {
      showToast("Failed to delete tag", "error");
    },
  });
}
