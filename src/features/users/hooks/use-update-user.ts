import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../api/update-user";
import { USERS_QUERY_KEYS } from "../constants/query-keys";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEYS.ALL });
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEYS.DETAIL(variables.id) });
      toast.success("User updated successfully");
      router.push("/admin/users");
    },
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error ? error.message : "Failed to update user";
      toast.error(errorMessage);
    },
  });
}
