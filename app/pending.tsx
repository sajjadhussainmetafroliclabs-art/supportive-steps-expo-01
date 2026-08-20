import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import Svg, { Rect, Path } from "react-native-svg";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Screen } from "@/components/Screen";
import { Button } from "@/components/ui/Button";
import { useColors } from "@/theme/ThemeProvider";
import { shadows } from "@/theme/tokens";

/** Ported from src/routes/pending.tsx. */
export default function Pending() {
  const router = useRouter();
  const colors = useColors();

  return (
    <Screen className="items-center justify-center">
      <Animated.View entering={FadeInUp.duration(500)} className="items-center">
        <View className="size-48 items-center justify-center rounded-3xl bg-secondary">
          <Hourglass />
        </View>

        <Text
          className="mt-10 text-center text-2xl text-foreground"
          style={{ fontFamily: "Poppins_600SemiBold", color: colors.foreground }}
        >
          Your account is under review
        </Text>
        <Text className="mt-3 max-w-[19rem] text-center text-sm leading-relaxed text-muted-foreground" style={{ color: colors.mutedForeground }}>
          Our team is confirming your credentials. Most accounts are approved within one to two
          business days — we'll notify you by email as soon as you're in.
        </Text>

        <View className="mt-8 w-full rounded-2xl bg-card p-4" style={shadows.soft}>
          <Text className="text-sm font-semibold text-foreground" style={{ fontFamily: "Poppins_600SemiBold", color: colors.foreground }}>
            What happens next
          </Text>
          <View className="mt-3 gap-2">
            <Text className="text-xs leading-relaxed text-muted-foreground" style={{ color: colors.mutedForeground }}>
              1. Credential check by a moderator
            </Text>
            <Text className="text-xs leading-relaxed text-muted-foreground" style={{ color: colors.mutedForeground }}>
              2. Account approval notification
            </Text>
            <Text className="text-xs leading-relaxed text-muted-foreground" style={{ color: colors.mutedForeground }}>
              3. Full access to search and reviews
            </Text>
          </View>
        </View>
      </Animated.View>

      <Button size="lg" className="mt-10 w-full" onPress={() => router.push("/(tabs)/dashboard")}>
        Preview the dashboard
      </Button>
    </Screen>
  );
}

function Hourglass() {
  return (
    <Svg viewBox="0 0 100 100" width={112} height={112} accessibilityLabel="Hourglass">
      <Rect x="24" y="14" width="52" height="7" rx="3.5" fill="#4f6b5a" />
      <Rect x="24" y="79" width="52" height="7" rx="3.5" fill="#4f6b5a" />
      <Path d="M32 21h36c0 16-14 22-14 29s14 13 14 29H32c0-16 14-22 14-29s-14-13-14-29z" fill="#8a9b8466" />
      <Path d="M38 74c0-9 12-13 12-13s12 4 12 13z" fill="#d7c3a0" />
    </Svg>
  );
}
