import "../global.css";
import { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  useFonts as usePoppins,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import {
  useFonts as useInter,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { ThemeProvider, useColors } from "@/theme/ThemeProvider";

SplashScreen.preventAutoHideAsync().catch(() => {});

const queryClient = new QueryClient();

export default function RootLayout() {
  const [poppinsLoaded] = usePoppins({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const [interLoaded] = useInter({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  const fontsLoaded = poppinsLoaded && interLoaded;

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <RootStack />
          </QueryClientProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function RootStack() {
  const colors = useColors();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="role" />
      <Stack.Screen name="verification" />
      <Stack.Screen name="terms" />
      <Stack.Screen name="pending" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="supervisor/[id]" />
      <Stack.Screen name="review/[id]" />
      <Stack.Screen name="review-submitted" />
      <Stack.Screen name="edit-profile" options={{ presentation: "card" }} />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="verify-code" />
      <Stack.Screen name="reset-password" />
      <Stack.Screen name="password-updated" />
      <Stack.Screen name="change-password" />
    </Stack>
  );
}
