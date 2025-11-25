export type UserId = number;

export interface UserSocialMedia {
  telegram_url: string | null;
  vk_url: string | null;
  youtube_url: string | null;
}

export interface User {
  user_id: UserId;
  email: string;
  name: string;
  surname: string;
  nickname: string;
  avatar: string;
  social_media: UserSocialMedia;
}
