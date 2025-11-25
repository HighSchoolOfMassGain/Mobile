import { useMutation } from "@tanstack/react-query";

import { updateProfile } from "../api/editProfileApi";
import { useAuthStore } from "@features/auth/model/useAuthStore";
import type { User } from "@entities/user/model/types";

export const useUpdateProfile = () => {
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation<User, unknown, User>({
    mutationFn: updateProfile,
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
    },
  });
};
