import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleBlogStatus } from "../api/toggle-blog-status";
import { showToast } from "@/components/ui/toast";

interface ToggleStatusParams {
  id: number;
  currentStatus: "draft" | "published" | "scheduled";
}

export function useToggleStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, currentStatus }: ToggleStatusParams) => {
      const newStatus = currentStatus === "published" ? "draft" : "published";
      return toggleBlogStatus(id, newStatus);
    },
    async onSuccess(_, { currentStatus }) {
      await queryClient.invalidateQueries({ queryKey: ["blogs"] });
      const action = currentStatus === "published" ? "moved to draft" : "published";
      showToast(`Blog ${action} successfully`, "success");
    },
    onError() {
      showToast("Failed to update blog status", "error");
    },
  });
}
