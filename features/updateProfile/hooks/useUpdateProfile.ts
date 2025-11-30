import { useMutation } from "@tanstack/react-query";

import { useCurrentUserStore } from "@/entities/user";
import type { ApiError } from "@/shared/api/apiError";
import {
  updateProfile,
  type UpdateProfilePayload,
} from "../api/updateProfileApi";
import { getAuthorizedUser } from "@/features/auth/api/authApi";

export const useUpdateProfile = () => {
  const setUser = useCurrentUserStore((s) => s.setUser);

  return useMutation<void, ApiError, UpdateProfilePayload>({
    mutationFn: updateProfile,
    onSuccess: async () => {
      const freshUser = await getAuthorizedUser();
      setUser(freshUser);
    },
  });
};
