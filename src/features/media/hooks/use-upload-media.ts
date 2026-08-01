import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { uploadMedia } from "../api/upload-media";
import { mediaKeys } from "../constants/query-keys";
import { toast } from "sonner";

export function useUploadMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadMedia,
    onSuccess: () => {
      toast.success("Media uploaded successfully");
      queryClient.invalidateQueries({ queryKey: mediaKeys.lists() });
    },
    onError: (err: unknown) => {
      const error = err as AxiosError<{ error: string }>;
      const message = error?.response?.data?.error || "Failed to upload media";
      toast.error(message);
    },
  });
}
