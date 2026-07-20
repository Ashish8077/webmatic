import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateService } from "../api/update-service";
import { SERVICES_QUERY_KEYS } from "../constants/query-keys";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useUpdateService() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: updateService,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: SERVICES_QUERY_KEYS.ALL });
      queryClient.invalidateQueries({ queryKey: SERVICES_QUERY_KEYS.DETAIL(variables.id) });
      toast.success("Service updated successfully");
      router.push("/admin/services");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update service");
    },
  });
}
