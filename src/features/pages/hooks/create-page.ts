import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPage } from "../api/create-page";
import { useRouter } from "next/navigation";

export function useCreatePage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPage,
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["pages"],
      });
      // queryClient.setQueryData(["page", page.id], page);
      router.push("/admin/pages");
    },
  });
}
