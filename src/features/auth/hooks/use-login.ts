import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";

import { login } from "../api/login";
import { queryClient } from "@/lib/query";

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      router.replace("/dashboard");
    },
  });
}

  // queryClient.removeQueries({ queryKey: ["current-user"] });
  //     router.refresh();
