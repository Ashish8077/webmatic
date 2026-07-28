import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTestimonial } from "../api/update-testimonial";
import { TESTIMONIAL_QUERY_KEYS } from "../constants/query-keys";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useUpdateTestimonial() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: updateTestimonial,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: TESTIMONIAL_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: TESTIMONIAL_QUERY_KEYS.detail(variables.id) });
      toast.success("Testimonial updated successfully");
      router.push("/admin/testimonials");
    },
    onError: (error: Error) => {
      const err = error as Error & { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to update testimonial");
    },
  });
}
