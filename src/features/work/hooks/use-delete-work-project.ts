import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWorkProject } from "../api/delete-work-project";
import { SERVICES_QUERY_KEYS } from "../constants/query-keys";
import { toast } from "sonner";

export function useDeleteWorkProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWorkProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SERVICES_QUERY_KEYS.ALL });
      toast.success("WorkProject deleted successfully");
    },
    onError: (error: Error) => {
      const err = error as Error & { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to delete workProject");
    },
  });
}
