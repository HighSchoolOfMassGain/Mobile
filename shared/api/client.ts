import axios from 'axios';
import { useAuthStore } from '@features/auth/model/useAuthStore';

const API_URL = 'http://192.168.10.107:8081/api'

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});
