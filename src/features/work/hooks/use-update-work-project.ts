import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWorkProject } from "../api/update-work-project";
import { SERVICES_QUERY_KEYS } from "../constants/query-keys";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useUpdateWorkProject() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: updateWorkProject,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: SERVICES_QUERY_KEYS.ALL });
      queryClient.invalidateQueries({ queryKey: SERVICES_QUERY_KEYS.DETAIL(variables.id) });
      toast.success("WorkProject updated successfully");
      router.push("/admin/work/projects");
    },
    onError: (error: Error) => {
      const err = error as Error & { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to update workProject");
    },
  });
}
