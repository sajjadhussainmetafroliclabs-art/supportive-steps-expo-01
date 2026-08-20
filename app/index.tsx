import { useEffect, useState } from "react";
import { View, Pressable, Text } from "react-native";
import { useRouter } from "expo-router";
import Animated, { FadeInUp, useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from "react-native-reanimated";
import { Logo, LogoLockup } from "@/components/Logo";
import { Screen } from "@/components/Screen";
import { useColors } from "@/theme/ThemeProvider";

/** Ported from src/routes/index.tsx. Same 1.4s auto-reveal of the Continue button. */
export default function Splash() {
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const colors = useColors();
  const pulse = useSharedValue(1);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(0.75, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [pulse]);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: pulse.value,
  }));

  return (
    <Screen backgroundColor={colors.splashBackground} className="items-center justify-center" padded={false}>
      {/* Oversized watermark, echoing the brand splash artwork */}
      <View className="pointer-events-none absolute -bottom-16 left-1/2 -translate-x-1/2 opacity-[0.07]">
        <Logo size={416} />
      </View>

      <Animated.View entering={FadeInUp.duration(500)} className="items-center px-8">
        <LogoLockup className="w-full" />
      </Animated.View>

      <View className="absolute inset-x-6 bottom-12 items-center">
        {ready ? (
          <Animated.View entering={FadeInUp.duration(500)} className="w-full">
            <Pressable
              onPress={() => router.push("/onboarding")}
              className="h-13 w-full items-center justify-center rounded-xl py-4"
              style={{ backgroundColor: colors.primary }}
            >
              <Text
                className="text-sm font-semibold"
                style={{ fontFamily: "Poppins_600SemiBold", color: colors.primaryForeground }}
              >
                Continue
              </Text>
            </Pressable>
          </Animated.View>
        ) : (
          <View className="h-1.5 w-24 overflow-hidden rounded-full" style={{ backgroundColor: `${colors.primary}33` }}>
            <Animated.View
              style={[{ height: "100%", width: "50%", borderRadius: 9999, backgroundColor: `${colors.primary}B3` }, pulseStyle]}
            />
          </View>
        )}
      </View>
    </Screen>
  );
}
