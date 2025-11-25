import type { User } from "@entities/user/model/types";
import { api } from "@shared/api/client";

export const updateProfile = async (payload: User): Promise<User> => {
  const { data } = await api.post<User>("/update_user_data", payload);
  return data;
};
