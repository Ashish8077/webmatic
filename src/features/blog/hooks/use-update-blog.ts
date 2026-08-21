import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBlog } from "../api/update-blog";
import type { CreateBlogRequest } from "../types/blog.types";

export function useUpdateBlog(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<CreateBlogRequest>) => updateBlog(id, data),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["blogs"] });
      await queryClient.invalidateQueries({ queryKey: ["blog", id] });
    },
  });
}
