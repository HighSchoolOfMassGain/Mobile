import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";

import { theme } from "@shared/config/theme";
import { clearAuth } from "@features/auth/lib/tokenStorage";
import { ProfileHeader } from "@widgets/profile/ProfileHeader";
import { useCurrentUserStore } from "@entities/user";

export const ProfilePage = () => {
  const router = useRouter();

  const user = useCurrentUserStore((s) => s.user);

  const handleLogout = async () => {
    await clearAuth();
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <ProfileHeader
        name={user?.name ?? ""}
        surname={user?.surname ?? ""}
        nickname={user?.nickname ?? ""}
        avatarUri={user?.avatar ?? null}
        onEditProfilePress={() => router.push("/profile/edit")}
        onChangeCoverPress={() => {
        }}
      />

      <View style={styles.logoutWrapper}>
        <Button title="статистика" onPress={() => router.push("/statistics")} />
        <Button
          title="Выйти"
          onPress={handleLogout}
          color={theme.palette.red}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.palette.white,
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
    color: theme.palette.totalBlack,
  },
  subtitle: {
    fontSize: 16,
    color: theme.palette.darkGrey,
    marginBottom: 32,
  },
  logoutWrapper: {
    marginTop: "auto",
  },
});
