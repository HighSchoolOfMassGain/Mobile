import "react-native-reanimated";
import React, { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import { useAuthBootstrap } from "@features/auth/hooks/useAuthBootstrap";
import { attachAuthInterceptor } from "@/features/auth/lib/attachAuthInterceptor";
import { api } from "@/shared/api/client";
import { AppLoadingScreen } from "@/shared/ui/AppLoadingScreen";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
attachAuthInterceptor(api);

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoadingScreen />;
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AuthGate />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

function AuthGate() {
  const segments = useSegments();
  const router = useRouter();

  const { isReady, isAuthChecking, accessToken, status } = useAuthBootstrap();

  useEffect(() => {
    if (!isReady || isAuthChecking) return;

    const rootSegment = segments[0];
    const subSegment = segments[1];

    const inAuthGroup = rootSegment === "(auth)";
    const inAppGroup = rootSegment === "(app)";
    const isHome = !rootSegment;

    const isUnauthenticated = !accessToken || status === "unauthenticated";

    if (isUnauthenticated) {
      if (inAppGroup) {
        router.replace("/");
      }
      return;
    }

    const onProfile = inAppGroup && subSegment === "profile";

    if ((isHome || inAuthGroup) && !onProfile) {
      router.replace("/profile");
    }
  }, [isReady, isAuthChecking, accessToken, status, segments, router]);

  if (!isReady || isAuthChecking) {
    return <AppLoadingScreen />;
  }

  return <Slot />;
}
