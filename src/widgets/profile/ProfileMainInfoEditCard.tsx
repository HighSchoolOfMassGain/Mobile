import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

import { UIAvatar } from "@shared/ui/UIAvatar";
import { UIButton } from "@shared/ui/UIButton";
import { UILabeledInput } from "@shared/ui/UILabeledInput";
import { palette } from "@shared/config/theme";
import { UIText } from "@shared/ui/UIText";

interface ProfileMainInfoEditCardProps {
  avatarUri?: string | null;
  onAvatarPress?: () => void;

  name: string;
  surname: string;
  nickname: string;
  email: string;
  telegramUrl: string;

  onNameChange: (value: string) => void;
  onSurnameChange: (value: string) => void;
  onNicknameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onTelegramUrlChange: (value: string) => void;

  style?: StyleProp<ViewStyle>;
}

export const ProfileMainInfoEditCard: React.FC<
  ProfileMainInfoEditCardProps
> = ({
  avatarUri,
  onAvatarPress,
  name,
  surname,
  nickname,
  email,
  telegramUrl,
  onNameChange,
  onSurnameChange,
  onNicknameChange,
  onEmailChange,
  onTelegramUrlChange,
  style,
}) => {
  const fullName = `${name} ${surname}`.trim();
  const avatarLabel = fullName || nickname || undefined;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.avatarBlock}>
        <UIText weight="semibold" style={styles.subtitle}>
          Редактирование
        </UIText>

        <UIAvatar
          uri={avatarUri ?? null}
          label={avatarLabel}
          size={96}
          showBorder
          onPress={onAvatarPress}
        />

        <UIButton
          title="Изменить фото"
          variant="ghost"
          size="sm"
          fullWidth={false}
          onPress={onAvatarPress}
          style={[styles.changePhotoButton, { alignSelf: "center" }]}
        />
      </View>
      <UIText weight="semibold" style={styles.subtitle}>
        Личные данные
      </UIText>
      {/* Имя */}
      <View style={styles.fieldBlock}>
        <UILabeledInput
          label="Имя"
          value={name}
          onChangeText={onNameChange}
          placeholder="Введите имя"
          autoCapitalize="words"
        />
      </View>

      {/* Фамилия */}
      <View style={styles.fieldBlock}>
        <UILabeledInput
          label="Фамилия"
          value={surname}
          onChangeText={onSurnameChange}
          placeholder="Введите фамилию"
          autoCapitalize="words"
        />
      </View>

      {/* Ник */}
      <View style={styles.fieldBlock}>
        <UILabeledInput
          label="Никнейм"
          value={nickname}
          onChangeText={onNicknameChange}
          placeholder="Например, sportik"
          autoCapitalize="none"
        />
      </View>

      {/* Email */}
      <View style={styles.fieldBlock}>
        <UILabeledInput
          label="Почта"
          value={email}
          onChangeText={onEmailChange}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Ссылка на Telegram */}
      <View style={styles.fieldBlock}>
        <UILabeledInput
          label="Telegram"
          value={telegramUrl}
          onChangeText={onTelegramUrlChange}
          placeholder="https://t.me/username"
          autoCapitalize="none"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    backgroundColor: palette.white,
    paddingVertical: 20,
    gap: 16,
  },
  avatarBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
    gap: 8,
  },
  changePhotoButton: {
    marginTop: 4,
  },
  fieldBlock: {
    gap: 6,
  },
  subtitle: {
    color: palette.black,
    fontSize: 20,
  },
});
