import { useMutation, useQueryClient } from "@tanstack/react-query";
import { togglePageStatus } from "../api/publish-page";
import { showToast } from "@/components/ui/toast";

interface ToggleStatusParams {
  id: number;
  currentStatus: "draft" | "published";
}

export function useToggleStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, currentStatus }: ToggleStatusParams) => {
      const newStatus = currentStatus === "published" ? "draft" : "published";
      return togglePageStatus(id, newStatus);
    },
    async onSuccess(_, { currentStatus }) {
      await queryClient.invalidateQueries({ queryKey: ["pages"] });
      const action = currentStatus === "published" ? "moved to draft" : "published";
      showToast(`Page ${action} successfully`, "success");
    },
    onError() {
      showToast("Failed to update page status", "error");
    },
  });
}
