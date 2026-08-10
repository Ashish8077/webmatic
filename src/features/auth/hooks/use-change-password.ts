import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePassword } from "../api/change-password";
import { AUTH_ROUTES } from "@/modules/auth/constants/routes";

export function useChangePassword() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changePassword,
    onSuccess() {
      // Clear all cached queries (auth state, user data, etc.)
      queryClient.clear();
      // Redirect to login since all sessions have been revoked
      router.replace(AUTH_ROUTES.LOGIN);
    },
  });
}
