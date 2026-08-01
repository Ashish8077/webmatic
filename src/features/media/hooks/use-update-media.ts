import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { updateMedia } from "../api/update-media";
import { mediaKeys } from "../constants/query-keys";
import { toast } from "sonner";

export function useUpdateMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMedia,
    onSuccess: (updatedMedia) => {
      toast.success("Media updated successfully");
      queryClient.invalidateQueries({ queryKey: mediaKeys.lists() });
      queryClient.setQueryData(mediaKeys.detail(updatedMedia.id), updatedMedia);
    },
    onError: (err: unknown) => {
      const error = err as AxiosError<{ error: string }>;
      const message = error?.response?.data?.error || "Failed to update media";
      toast.error(message);
    },
  });
}
