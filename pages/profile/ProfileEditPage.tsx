import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { theme } from "@shared/config/theme";
import { BasicHeader } from "@/widgets/basicHeader/BasicHeader";
import { ProfileMainInfoEditCard } from "@/widgets/profile/ProfileMainInfoEditCard";
import { useCurrentUserStore } from "@/entities/user";

export const ProfileEditPage = () => {
  const router = useRouter();

  const user = useCurrentUserStore((s) => s.user);

  const [name, setName] = useState(user?.name ?? "");
  const [surname, setSurname] = useState(user?.surname ?? "");
  const [nickname, setNickname] = useState(user?.nickname ?? "");
  const [height, setHeight] = useState<string | undefined>(undefined);
  const [weight, setWeight] = useState<string | undefined>(undefined);



  const handleAvatarPress = () => {
    // TODO: открыть выбор фото / bottom sheet
  };

  return (
    <View style={styles.container}>
      <BasicHeader type="withSave" onPress={() => router.push("/profile")} />
       <ProfileMainInfoEditCard
        style={{ marginTop: 16 }}
        avatarUri={user?.avatar ?? null}
        onAvatarPress={handleAvatarPress}
        name={name}
        surname={surname}
        nickname={nickname}
        height={height}
        weight={weight}
        onNameChange={setName}
        onSurnameChange={setSurname}
        onNicknameChange={setNickname}
        onHeightChange={setHeight}
        onWeightChange={setWeight}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
