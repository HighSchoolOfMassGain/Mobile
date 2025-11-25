import type { AxiosInstance } from 'axios';

import { useAuthStore } from '../model/useAuthStore';

/**
 * Подключает auth-интерцептор к переданному AxiosInstance.
 * На каждый запрос подставляет текущий accessToken из auth-стора.
 *
 * ВАЖНО: вызывать один раз на уровне инициализации приложения.
 */
let isAttached = false;

export const attachAuthInterceptor = (api: AxiosInstance) => {
  if (isAttached) return;

  api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }

    return config;
  });

  isAttached = true;
};
