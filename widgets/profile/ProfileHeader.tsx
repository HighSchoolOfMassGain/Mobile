import React from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Pressable,
} from "react-native";

import { UIAvatar } from "@shared/ui/UIAvatar";
import { UIText } from "@shared/ui/UIText";
import { ProfileMainInfo } from "@/entities/user";
import { UIIcon } from "@shared/ui/UIIcon";
import { palette } from "@/shared/config/theme";

interface ProfileHeaderProps {
  name: string;
  surname: string;
  nickname: string;
  avatarUri?: string | null;

  style?: StyleProp<ViewStyle>;
  onEditProfilePress?: () => void; // тап по карточке с аватаром/именем
  onChangeCoverPress?: () => void; // "Изменить обложку"
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  surname,
  nickname,
  avatarUri,
  style,
  onEditProfilePress,
  onChangeCoverPress,
}) => {
  return (
    <View style={style}>
      {/* Обложка */}
      <View style={styles.cover}>
        {/* Левая иконка (например, Telegram) */}
        <View style={styles.coverLeftIcon}>
          <UIIcon name="tg" size={28} />
        </View>

        {/* Кнопка "Изменить обложку" */}
        <Pressable
          style={styles.changeCoverButton}
          onPress={onChangeCoverPress}
          disabled={!onChangeCoverPress}
          hitSlop={8}
        >
          <UIText style={styles.changeCoverText}>Изменить обложку</UIText>
        </Pressable>
      </View>
      <View style={styles.coverA}></View>

      {/* Карточка с аватаром и основной инфой, «приклеенная» к обложке снизу */}
      <Pressable
        style={styles.card}
        disabled={!onEditProfilePress}
        onPress={onEditProfilePress}
      >
        <View style={styles.avatarWrapper}>
          <UIAvatar
            uri={avatarUri ?? null}
            label={`${name} ${surname}` || nickname || undefined}
            size={72}
            showBorder
          />
        </View>

        <View style={styles.infoWrapper}>
          <ProfileMainInfo user={{ name, surname, nickname }} />
        </View>

        <View style={styles.chevronWrapper}>
          <UIIcon name="chevr" size={20} />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cover: {
    height: 120,
    borderBottomColor: "#000",
    backgroundColor: "#D6D6D6",
    overflow: "hidden",
    justifyContent: "center",
  },
  coverA: {
    height: 70,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    backgroundColor: palette.lightGrey,
  },
  coverLeftIcon: {
    position: "absolute",
    left: 16,
    top: 16,
  },
  changeCoverButton: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  changeCoverText: {
    fontSize: 14,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginHorizontal: 16,
    borderRadius: 24,
    marginTop: -102,
  },
  avatarWrapper: {
    marginRight: 16,
  },
  infoWrapper: {
    flex: 1,
  },
  chevronWrapper: {
    marginLeft: 8,
  },
});
