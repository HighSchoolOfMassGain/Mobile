import { ActivityIndicator, StatusBar, View } from "react-native";
import { theme } from "../config/theme";

const loadingScreenStyles = {
  flex: 1,
  backgroundColor: theme.palette.totalBlack,
  justifyContent: "center" as const,
  alignItems: "center" as const,
};

export function AppLoadingScreen() {
  return (
    <View style={loadingScreenStyles}>
      <StatusBar barStyle="light-content" />
      <ActivityIndicator size="large" color={theme.palette.white} />
    </View>
  );
}
