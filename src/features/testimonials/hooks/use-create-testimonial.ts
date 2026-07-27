import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTestimonial } from "../api/create-testimonial";
import { TESTIMONIAL_QUERY_KEYS } from "../constants/query-keys";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useCreateTestimonial() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TESTIMONIAL_QUERY_KEYS.all });
      toast.success("Testimonial created successfully");
      router.push("/admin/testimonials");
    },
    onError: (error: Error) => {
      const err = error as Error & { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to create testimonial");
    },
  });
}
