import { User } from '@entities/user/model/types';
import { API_ROUTES } from '@shared/config/hz';
import { api } from '@shared/api/client';

export interface LoginPayload {
  email: string;
  password: string;
};

export interface LoginResponse {
  message: string;
  token: string;
};

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  surname: string;
  nickname: string;
};

export const loginRequest = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>(API_ROUTES.login, payload);
  return data;
};

export const registerRequest = async (payload: RegisterPayload): Promise<void> => {
  await api.post(API_ROUTES.register, payload);
};

export const getAuthorizedUser = async (): Promise<User> => {
  const { data } = await api.get<User>(API_ROUTES.getAuthUserData);
  return data;
};
