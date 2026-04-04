import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRootNavigationState, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import "react-native-reanimated";
import "../global.css";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useUserStore } from "@/lib/storage";

SplashScreen.preventAutoHideAsync();

function useHasHydrated() {
  const [hasHydrated, setHasHydrated] = useState(() => {
    return useUserStore.persist.hasHydrated();
  });

  useEffect(() => {
    if (useUserStore.persist.hasHydrated()) {
      setHasHydrated(true);
      return;
    }

    const unsub = useUserStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });

    return () => unsub();
  }, []);

  return hasHydrated;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const navigationState = useRootNavigationState();
  const hasHydrated = useHasHydrated();

  const onboardingComplete = useUserStore((state) => state.onboardingComplete);
  const [isReady, setIsReady] = useState(false);
  // Guard: only run the initial redirect once
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (!hasHydrated) return;
    const timer = setTimeout(() => setIsReady(true), 50);
    return () => clearTimeout(timer);
  }, [hasHydrated]);

  useEffect(() => {
    if (!isReady || !navigationState?.key) return;
    // Only perform the initial redirect once
    if (hasNavigated.current) return;
    hasNavigated.current = true;

    if (!onboardingComplete) {
      router.replace("/onboarding/name");
    } else {
      router.replace("/(tabs)");
    }

    SplashScreen.hideAsync();
  }, [isReady, navigationState?.key]);

  // Also hide splash if we somehow land on the right screen without a redirect
  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  return (
    <ErrorBoundary>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="chapter/[id]" />
          <Stack.Screen
            name="quiz/[id]"
            options={{ animation: "slide_from_bottom" }}
          />
          <Stack.Screen name="sample/[id]" />
          <Stack.Screen name="search" />
          <Stack.Screen name="onboarding/name" />
          <Stack.Screen name="onboarding/avatar" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ErrorBoundary>
  );
}
