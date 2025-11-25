import React from "react";
import { StyleProp, ViewStyle } from "react-native";

import { UIAvatar } from "@shared/ui/UIAvatar";
import type { User } from "../model/types";
import { getUserAvatarLabel } from "../model/selectors";

export type UserAvatarSize = "sm" | "md" | "lg" | number;

interface UserAvatarProps {
  user: Pick<User, "name" | "surname" | "nickname" | "avatar"> | null | undefined;
  size?: UserAvatarSize;
  showBorder?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  size = "md",
  showBorder = false,
  style,
  onPress,
}) => {
  const uri = user?.avatar ?? null;
  const label = getUserAvatarLabel(user) || undefined;

  return (
    <UIAvatar
      uri={uri}
      label={label}
      size={size}
      showBorder={showBorder}
      style={style}
      onPress={onPress}
    />
  );
};
