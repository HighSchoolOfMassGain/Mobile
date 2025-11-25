import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

import { UIText } from "@/shared/ui/UIText";
import { UiInput } from "@/shared/ui/UiInput";
import { UIAvatar } from "@/shared/ui/UIAvatar";
import { UIButton } from "@/shared/ui/UIButton";
import { palette } from "@/shared/config/theme";

interface ProfileMainInfoEditCardProps {
  avatarUri?: string | null;
  onAvatarPress?: () => void;

  name: string;
  surname: string;
  nickname: string;
  height?: string;
  weight?: string;

  onNameChange: (value: string) => void;
  onSurnameChange: (value: string) => void;
  onNicknameChange: (value: string) => void;
  onHeightChange?: (value: string) => void;
  onWeightChange?: (value: string) => void;

  style?: StyleProp<ViewStyle>;
}

export const ProfileMainInfoEditCard: React.FC<ProfileMainInfoEditCardProps> = ({
  avatarUri,
  onAvatarPress,
  name,
  surname,
  nickname,
  height,
  weight,
  onNameChange,
  onSurnameChange,
  onNicknameChange,
  onHeightChange,
  onWeightChange,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Аватар + "Изменить фото" */}
      <View style={styles.avatarBlock}>
        <UIAvatar
          uri={avatarUri ?? null}
          label={`${name} ${surname}` || nickname || undefined}
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
          style={styles.changePhotoButton}
        />
      </View>

      {/* Имя */}
      <View style={styles.fieldBlock}>
        <UIText weight="semibold" style={styles.label}>
          Имя
        </UIText>
        <UiInput
          value={name}
          onChangeText={onNameChange}
          placeholder="Введите имя"
          autoCapitalize="words"
        />
      </View>

      {/* Фамилия */}
      <View style={styles.fieldBlock}>
        <UIText weight="semibold" style={styles.label}>
          Фамилия
        </UIText>
        <UiInput
          value={surname}
          onChangeText={onSurnameChange}
          placeholder="Введите фамилию"
          autoCapitalize="words"
        />
      </View>

      {/* Ник */}
      <View style={styles.fieldBlock}>
        <UIText weight="semibold" style={styles.label}>
          Никнейм
        </UIText>
        <UiInput
          value={nickname}
          onChangeText={onNicknameChange}
          placeholder="Например, sportik"
          autoCapitalize="none"
        />
      </View>

      {/* Рост / Вес */}
      <View style={styles.row}>
        <View style={styles.halfField}>
          <UIText weight="semibold" style={styles.label}>
            Рост (см)
          </UIText>
          <UiInput
            value={height}
            onChangeText={onHeightChange}
            placeholder="например, 180"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.halfField}>
          <UIText weight="semibold" style={styles.label}>
            Вес (кг)
          </UIText>
          <UiInput
            value={weight}
            onChangeText={onWeightChange}
            placeholder="например, 75"
            keyboardType="numeric"
          />
        </View>
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
    alignItems: "center",
    marginBottom: 4,
    gap: 8,
  },
  changePhotoButton: {
    marginTop: 4,
  },
  fieldBlock: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    color: palette.lightGrey,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfField: {
    flex: 1,
    gap: 6,
  },
});
