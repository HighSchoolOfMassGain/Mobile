import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useRouter, type Href } from "expo-router";
import { UIIcon } from "@shared/ui/UIIcon";
import type { IconName } from "@shared/ui/UIIcon";

type NavRoute = "/profile" | "/search" | "/trainings";

type NavItem = {
  label: string;
  route: NavRoute;
  icon: IconName;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Профиль",       route: "/profile",  icon: "profile" },
  { label: "Поиск",         route: "/search",   icon: "search" },
  { label: "Тренировочная", route: "/trainings", icon: "trainings" },
];

export const AppFooter: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {NAV_ITEMS.map((item) => (
          <Pressable
            key={item.label}
            onPress={() => router.push(item.route as Href)}
          >
            <UIIcon size={44} name={item.icon} />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const FOOTER_HEIGHT = 64;

const styles = StyleSheet.create({
  wrapper: {
    height: FOOTER_HEIGHT,
    borderTopWidth: 1,
    borderTopColor: "#222",
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
