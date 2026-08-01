import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { deleteMedia } from "../api/delete-media";
import { mediaKeys } from "../constants/query-keys";
import { toast } from "sonner";

export function useDeleteMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMedia,
    onSuccess: () => {
      toast.success("Media deleted successfully");
      queryClient.invalidateQueries({ queryKey: mediaKeys.lists() });
    },
    onError: (err: unknown) => {
      const error = err as AxiosError<{ error: string }>;
      const message = error?.response?.data?.error || "Failed to delete media";
      toast.error(message);
    },
  });
}
