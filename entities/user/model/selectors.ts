import type { User } from "./types";

/**
 * Полное имя: "Имя Фамилия" или пустая строка.
 */
export const getUserFullName = (
  user: Pick<User, "name" | "surname"> | null | undefined,
): string => {
  if (!user) return "";
  return `${user.name ?? ""} ${user.surname ?? ""}`.trim();
};

/**
 * Лейбл для аватарки:
 * 1) ник
 * 2) имя + фамилия
 * 3) пустая строка
 */
export const getUserAvatarLabel = (
  user: Pick<User, "name" | "surname" | "nickname"> | null | undefined,
): string => {
  if (!user) return "";
  if (user.nickname) return user.nickname;
  return getUserFullName(user);
};
