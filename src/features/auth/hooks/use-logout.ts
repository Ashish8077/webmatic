import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout } from "../api/logout";
import { AUTH_ROUTES } from "@/modules/auth/constants/routes";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess() {
      queryClient.clear();
      router.replace(AUTH_ROUTES.LOGIN);
    },
  });
}
