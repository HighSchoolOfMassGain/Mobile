// features/auth/hooks/useAuthBootstrap.ts
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "../model/useAuthStore";
import { getAuthorizedUser } from "../api/authApi";
import { clearAuth } from "../lib/tokenStorage";
import { useCurrentUserStore } from "@entities/user";
import type { User } from "@entities/user";
import type { ApiError } from "@shared/api/apiError";
import { STORAGE_KEYS } from "@/shared/config/hz";

export const useAuthBootstrap = () => {
  const [isReady, setIsReady] = useState(false);

  const accessToken = useAuthStore((s) => s.accessToken);
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setStatus = useAuthStore((s) => s.setStatus);
  const setUser = useCurrentUserStore((s) => s.setUser);

  // 1. читаем токен из AsyncStorage при старте
  useEffect(() => {
    const init = async () => {
      try {
        const tokenFromStorage = await AsyncStorage.getItem(
          STORAGE_KEYS.accessToken,
        );

        if (tokenFromStorage) {
          setAccessToken(tokenFromStorage);
          setStatus("checking");
        } else {
          setStatus("unauthenticated");
        }
      } catch (e) {
        setStatus("unauthenticated");
        console.log(e);
      } finally {
        setIsReady(true);
      }
    };

    void init();
  }, [setAccessToken, setStatus]);

  // 2. если токен есть — тянем /get_authorized_user_data
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User, ApiError>({
    queryKey: ["authorizedUser"],
    queryFn: getAuthorizedUser,
    enabled: !!accessToken,
    retry: 1,
  });

  // успешная загрузка пользователя
  useEffect(() => {
    if (!accessToken) return;
    if (!user) return;

    setUser(user);
    setStatus("authenticated");
  }, [user, accessToken, setUser, setStatus]);

  // ошибка при загрузке пользователя
  useEffect(() => {
    if (!accessToken) return;
    if (!error) return;

    void clearAuth();
  }, [error, accessToken]);

  const status = useAuthStore((s) => s.status);
  const isAuthChecking = status === "checking" || (!!accessToken && isLoading);

  return {
    isReady,
    isAuthChecking,
    status,
    accessToken,
  };
};
