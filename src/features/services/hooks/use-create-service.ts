import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createService } from "../api/create-service";
import { SERVICES_QUERY_KEYS } from "../constants/query-keys";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useCreateService() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SERVICES_QUERY_KEYS.ALL });
      toast.success("Service created successfully");
      router.push("/admin/services");
    },
    onError: (error: Error) => {
      const err = error as Error & { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to create service");
    },
  });
}
