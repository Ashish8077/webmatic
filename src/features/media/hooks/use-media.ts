import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getMedia } from "../api/get-media";
import { mediaKeys } from "../constants/query-keys";
import { MediaQuery, MediaListResponse } from "../types";

export function useMedia(params: MediaQuery, options?: Omit<UseQueryOptions<MediaListResponse, Error>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: mediaKeys.list(params),
    queryFn: () => getMedia(params),
    placeholderData: (previousData) => previousData, // keep previous data while fetching next page
    ...options,
  });
}
