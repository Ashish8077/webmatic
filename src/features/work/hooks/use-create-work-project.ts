import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWorkProject } from "../api/create-work-project";
import { SERVICES_QUERY_KEYS } from "../constants/query-keys";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useCreateWorkProject() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createWorkProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SERVICES_QUERY_KEYS.ALL });
      toast.success("WorkProject created successfully");
      router.push("/admin/work/projects");
    },
    onError: (error: Error) => {
      const err = error as Error & { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to create workProject");
    },
  });
}
