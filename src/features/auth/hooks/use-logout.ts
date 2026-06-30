import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";

import { login } from "../api/login";
import { queryClient } from "@/lib/query";
import { logout } from "../api/logout";

export function useLogout() {
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess() {
      queryClient.clear();
      router.replace("/login");
    },
  });
}
