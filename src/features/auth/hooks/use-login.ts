import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/login";

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      router.replace("/admin/dashboard");
    },
  });
}

  // queryClient.removeQueries({ queryKey: ["current-user"] });
  //     router.refresh();
