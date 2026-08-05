import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "../api/create-blog";
import { useRouter } from "next/navigation";

export function useCreateBlog() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBlog,
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
      router.push("/admin/blogs");
    },
  });
}
