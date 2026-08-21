import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../api/delete-user";
import { USERS_QUERY_KEYS } from "../constants/query-keys";
import { toast } from "sonner";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEYS.ALL });
      toast.success("User deleted successfully");
    },
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error ? error.message : "Failed to delete user";
      toast.error(errorMessage);
    },
  });
}
