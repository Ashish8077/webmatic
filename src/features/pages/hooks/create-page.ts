import { useMutation } from "@tanstack/react-query";
import { createPage } from "../api/create-page";
import { useRouter } from "next/navigation";
import { queryClient } from "@/lib/query";

export function useCreatePage() {
  const router = useRouter();

  return useMutation({
    mutationFn: createPage,
    async onSuccess(page) {
      await queryClient.invalidateQueries({
        queryKey: ["pages"],
      });
      // queryClient.setQueryData(["page", page.id], page);
      router.push("/pages");
    },
  });
}
