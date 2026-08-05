import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBlog } from "../api/delete-blog";
import { showToast } from "@/components/ui/toast";

export function useDeleteBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteBlog(id),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["blogs"] });
      showToast("Blog deleted successfully", "success");
    },
    onError() {
      showToast("Failed to delete blog", "error");
    },
  });
}
