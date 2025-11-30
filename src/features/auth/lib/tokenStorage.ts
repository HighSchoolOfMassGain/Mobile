// features/auth/lib/tokenStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAuthStore } from "../model/useAuthStore";
import { useCurrentUserStore } from "@entities/user";
import { STORAGE_KEYS } from "@shared/config/hz";

// успешный логин / получение нового токена
export const applyAuth = async (token: string) => {
  const { setAccessToken, setStatus } = useAuthStore.getState();

  setAccessToken(token);
  setStatus("authenticated");

  await AsyncStorage.setItem(STORAGE_KEYS.accessToken, token);
};

// полный разлогин: чистим auth-стор, стор пользователя и storage
export const clearAuth = async () => {
  const { resetAuth } = useAuthStore.getState();
  const { resetUser } = useCurrentUserStore.getState();

  resetAuth();
  resetUser();

  await AsyncStorage.removeItem(STORAGE_KEYS.accessToken);
};
