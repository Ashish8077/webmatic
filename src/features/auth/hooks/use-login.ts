import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/login";
import { AUTH_ROUTES } from "@/modules/auth/constants/routes";

export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      
      const redirectPath = searchParams?.get("redirect");
      
      // Validate redirect parameter to prevent open redirects
      // Only allow relative paths starting with "/" and explicitly block protocol-based absolute URLs
      if (
        redirectPath && 
        redirectPath.startsWith("/") && 
        !redirectPath.startsWith("//") &&
        !redirectPath.includes("://")
      ) {
        if (redirectPath === "/admin") {
          router.replace(AUTH_ROUTES.DASHBOARD);
        } else {
          router.replace(redirectPath);
        }
      } else {
        router.replace(AUTH_ROUTES.DASHBOARD);
      }
    },
  });
}

  // queryClient.removeQueries({ queryKey: ["current-user"] });
  //     router.refresh();
