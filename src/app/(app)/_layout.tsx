// import React, { useEffect, useState } from "react";
// import { Slot, useSegments } from "expo-router";
// import { View, StatusBar } from "react-native";
// import { theme } from "@shared/config/theme";
// import { Screen } from "@shared/ui/Screen";
// import { Header } from "@widgets/header/Header";
// import { MenuOverlay } from "@widgets/menu/MenuOverlay";
// import { AppFooter } from "@widgets/footer/AppFooter";

// export default function AppLayout() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);
//   const handleCloseMenu = () => setIsMenuOpen(false);
//   const segments = useSegments();

//   useEffect(() => {
//     setIsMenuOpen(false);
//   }, [segments]);
//   return (
//     <View style={{ flex: 1, backgroundColor: theme.palette.totalBlack }}>
//       {/* <StatusBar
//         barStyle="light-content"
//         backgroundColor={theme.palette.totalBlack}
//       /> */}

//       <Header isMenuOpen={isMenuOpen} onBurgerPress={handleToggleMenu} />

//       <Screen>
//         <Slot />
//       </Screen>
//       <AppFooter />

//       {isMenuOpen && <MenuOverlay onClose={handleCloseMenu} />}
//     </View>
//   );
// }

// app/(app)/_layout.tsx
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@widgets/header/Header";
import { AppFooter } from "@widgets/footer/AppFooter";

export default function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);
  // const handleCloseMenu = () => setIsMenuOpen(false);
  return (
    <View style={styles.root}>
      {/* Хедер под статусбаром */}
      <SafeAreaView edges={["top", "left", "right"]} style={styles.headerSafe}>
        <Header isMenuOpen={isMenuOpen} onBurgerPress={handleToggleMenu} />
      </SafeAreaView>

      {/* Контент экрана */}
      <View style={styles.content}>
        <Slot />
      </View>

      {/* Футер с учётом нижней safe-area */}
      <SafeAreaView edges={["bottom"]} style={styles.footerSafe}>
        <AppFooter />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
  },
  headerSafe: {
    // фон под хедером, обычно тот же, что у хедера
    backgroundColor: "#000",
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
  },
  footerSafe: {
    backgroundColor: "#000",
  },
});
