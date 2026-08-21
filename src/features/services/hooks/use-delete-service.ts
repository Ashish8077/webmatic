import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteService } from "../api/delete-service";
import { SERVICES_QUERY_KEYS } from "../constants/query-keys";
import { toast } from "sonner";

export function useDeleteService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SERVICES_QUERY_KEYS.ALL });
      toast.success("Service deleted successfully");
    },
    onError: (error: Error) => {
      const err = error as Error & { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to delete service");
    },
  });
}
