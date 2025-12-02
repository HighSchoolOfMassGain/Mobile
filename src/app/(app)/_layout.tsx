import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Slot } from "expo-router";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Header } from "@widgets/header/Header";
import { AppFooter } from "@widgets/footer/AppFooter";
import { MenuOverlay } from "@widgets/menu/MenuOverlay";

export default function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const insets = useSafeAreaInsets();

  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    <View style={styles.root}>
      {/* Header */}
      <SafeAreaView edges={["top", "left", "right"]} style={styles.headerSafe}>
        <Header isMenuOpen={isMenuOpen} onBurgerPress={handleToggleMenu} />
      </SafeAreaView>

      {/* Scrollable content */}
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom },
        ]}
      >
        <Slot />
      </ScrollView>

      {/* Footer */}
      <SafeAreaView edges={["bottom"]} style={styles.footerSafe}>
        <AppFooter />
      </SafeAreaView>

      {/* Menu overlay поверх всего */}
      {isMenuOpen && <MenuOverlay onClose={handleCloseMenu} />}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
  },
  headerSafe: {
    backgroundColor: "#000",
  },
  content: {
    flexGrow: 1,      // чтобы контент растягивался и скролл работал нормально
    minHeight: "100%",
    backgroundColor: "#fff",
  },
  footerSafe: {
    backgroundColor: "#000",
  },
});
