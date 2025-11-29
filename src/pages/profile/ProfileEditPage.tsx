import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { theme } from "@shared/config/theme";
import { BasicHeader } from "@widgets/basicHeader/BasicHeader";
import { ProfileMainInfoEditCard } from "@widgets/profile/ProfileMainInfoEditCard";
import { useCurrentUserStore } from "@entities/user";
import { useUpdateProfile } from "@features/updateProfile/hooks/useUpdateProfile";
import type { UpdateProfilePayload } from "@features/updateProfile/api/updateProfileApi";

export const ProfileEditPage = () => {
  const router = useRouter();
  const user = useCurrentUserStore((s) => s.user);

  const { mutate: updateProfile } = useUpdateProfile();

  // ВСЕ хуки — наверху, без условий:
  const [name, setName] = useState(user?.name ?? "");
  const [surname, setSurname] = useState(user?.surname ?? "");
  const [nickname, setNickname] = useState(user?.nickname ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [telegramUrl, setTelegramUrl] = useState(
    user?.social_media.telegram_url ?? "",
  );

  // если user придёт асинхронно в стор, синхронизируем форму
  useEffect(() => {
    if (!user) return;

    setName(user.name);
    setSurname(user.surname);
    setNickname(user.nickname ?? "");
    setEmail(user.email);
    setTelegramUrl(user.social_media.telegram_url ?? "");
  }, [user]);

  const handleAvatarPress = () => {
    // TODO: открыть выбор фото / bottom sheet
  };

  const handleSave = () => {
    if (!user) return;

    const payload: UpdateProfilePayload = {
      name,
      surname,
      nickname: nickname || "",
      email,
      social_media: {
        telegram_url: telegramUrl || null,
        // если нужно — прокидываешь остальные соцсети из user или формы:
        // vk_url: user.social_media.vk_url,
        // youtube_url: user.social_media.youtube_url,
      },
    };

    updateProfile(payload, {
      onSuccess: () => {
        router.replace("/profile");
      },
    });
  };

  // УСЛОВНЫЙ RETURN — уже ПОСЛЕ всех хуков, это ок для правил хуков
  if (!user) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <BasicHeader
        type="withSave"
        onSave={handleSave}
      />

      <ProfileMainInfoEditCard
        style={{ marginTop: 16 }}
        avatarUri={user.avatar ?? null}
        onAvatarPress={handleAvatarPress}
        name={name}
        surname={surname}
        nickname={nickname}
        email={email}
        telegramUrl={telegramUrl}
        onNameChange={setName}
        onSurnameChange={setSurname}
        onNicknameChange={setNickname}
        onEmailChange={setEmail}
        onTelegramUrlChange={setTelegramUrl}
      />
      {/* при желании: индикатор сохранения, ошибки и т.д. */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.palette.white,
  },
});
