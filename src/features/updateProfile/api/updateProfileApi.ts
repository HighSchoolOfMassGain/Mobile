import { API_ROUTES } from "@shared/config/hz";
import { api } from "@shared/api/client";

export type UpdateProfilePayload = {
  name: string;
  surname: string;
  nickname: string;
  email: string;
  social_media: {
    telegram_url: string | null;
    vk_url?: string | null;
    youtube_url?: string | null;
  };
};

export const updateProfile = async (
  payload: UpdateProfilePayload,
): Promise<void> => {
  await api.post(API_ROUTES.updateUser, payload); // или post, если так на бэке
};
