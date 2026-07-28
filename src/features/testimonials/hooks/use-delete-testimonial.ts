import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTestimonial } from "../api/delete-testimonial";
import { TESTIMONIAL_QUERY_KEYS } from "../constants/query-keys";
import { toast } from "sonner";

export function useDeleteTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TESTIMONIAL_QUERY_KEYS.all });
      toast.success("Testimonial deleted successfully");
    },
    onError: (error: Error) => {
      const err = error as Error & { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to delete testimonial");
    },
  });
}
