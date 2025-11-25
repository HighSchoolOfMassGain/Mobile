import React from "react";
import { View, StyleSheet } from "react-native";
import { UIBackButton } from "@/shared/ui/UIBackButton";
import { UIButton } from "@/shared/ui/UIButton";

interface BasicHeaderProps {
  onNavigate?: () => void;
  onSave?: () => void;
  type?: "withSave" | "withoutSave";
}

export const BasicHeader: React.FC<BasicHeaderProps> = ({
  onNavigate,
  onSave,
  type = "withoutSave",
}) => {
  if (type === "withSave") {
    return (
      <View style={styles.withSave}>
        <UIBackButton onPress={onNavigate} />
        <UIButton onPress={onSave} size='sm' variant="outline-blue">Сохранить</UIButton>
      </View>
    );
  }
  return (
    <View style={styles.withoutSave}>
      <UIBackButton onPress={onNavigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  withoutSave: {
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  withSave: {
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
