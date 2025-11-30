import React from "react";
import { StyleSheet, View, ViewStyle, StyleProp } from "react-native";
import type { User } from "@entities/user/model/types";
import { UIText } from "@shared/ui/UIText";
import { palette } from "@/shared/config/theme";

interface ProfileMainInfoProps {
  user: Pick<User, "name" | "surname" | "nickname">;
  style?: StyleProp<ViewStyle>;
}

export const ProfileMainInfo: React.FC<ProfileMainInfoProps> = ({
  user,
  style,
}) => {
  const fullName = `${user.name} ${user.surname}`.trim() || "Имя Фамилия";

  return (
    <View style={style}>
      <View style={styles.firstLine}>
        <UIText weight="semibold" style={styles.nameText} numberOfLines={1}>
          {fullName}
        </UIText>

        <UIText style={styles.nicknameText} numberOfLines={1}>
          {" "}
          @{user.nickname}
        </UIText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  firstLine: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameText: {
    fontSize: 20,
    color: palette.black,
  },
  nicknameText: {
    fontSize: 16,
    color: palette.darkBlue,
  },
});
