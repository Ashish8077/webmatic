import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateProfile } from "../api/profile";
import type { UserProfile, UpdateProfilePayload } from "../api/profile";

export const profileKeys = {
  all: ["profile"] as const,
  details: () => [...profileKeys.all, "details"] as const,
};

export function useProfile() {
  return useQuery<UserProfile>({
    queryKey: profileKeys.details(),
    queryFn: getProfile,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.details() });
      // We might also want to invalidate the 'me' query to update header avatars etc.
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });
}
