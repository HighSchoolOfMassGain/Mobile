// import { useMutation } from "@tanstack/react-query";

// import { updateProfile } from "../api/editProfileApi";
// import type { User } from "@entities/user/model/types";
// import { useCurrentUserStore } from "@/entities/user";

// export const useUpdateProfile = () => {
//   const user = useCurrentUserStore((s) => s.user);

//   return useMutation<User, unknown, User>({
//     mutationFn: updateProfile,
//     onSuccess: (updatedUser) => {
//       setUser(updatedUser);
//     },
//   });
// };
