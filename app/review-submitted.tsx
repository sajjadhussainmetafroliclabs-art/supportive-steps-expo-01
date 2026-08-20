import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Check } from "lucide-react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Screen } from "@/components/Screen";
import { Button } from "@/components/ui/Button";
import { useColors } from "@/theme/ThemeProvider";

/** Ported from src/routes/review-submitted.tsx. */
const steps = [
  { title: "Moderation", detail: "A moderator checks for identifying details and community guideline fit.", state: "active" },
  { title: "Publish", detail: "Your review appears on the supervisor's profile.", state: "todo" },
  { title: "Notification", detail: "We let you know the moment it goes live.", state: "todo" },
] as const;

export default function ReviewSubmitted() {
  const router = useRouter();
  const colors = useColors();

  return (
    <Screen>
      <Animated.View entering={FadeInUp.duration(500)} className="mt-10 items-center">
        <View className="size-40 items-center justify-center rounded-full bg-secondary">
          <View className="size-24 items-center justify-center rounded-full" style={{ backgroundColor: colors.success }}>
            <Check size={48} color={colors.successForeground} strokeWidth={2.5} />
          </View>
        </View>
        <Text className="mt-8 text-2xl text-foreground" style={{ fontFamily: "Poppins_600SemiBold", color: colors.foreground }}>
          Review submitted
        </Text>
        <Text className="mt-3 max-w-[19rem] text-center text-sm leading-relaxed text-muted-foreground" style={{ color: colors.mutedForeground }}>
          Thank you for helping the next cohort choose supervision with confidence. Your identity
          was not attached to this submission.
        </Text>
      </Animated.View>

      <View className="mt-10">
        {steps.map((s, i) => (
          <View key={s.title} className="flex-row gap-4">
            <View className="items-center">
              <View
                className="size-8 items-center justify-center rounded-full"
                style={{ backgroundColor: s.state === "active" ? colors.primary : colors.secondary }}
              >
                <Text
                  className="text-xs font-semibold"
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    color: s.state === "active" ? colors.primaryForeground : colors.secondaryForeground,
                  }}
                >
                  {i + 1}
                </Text>
              </View>
              {i < steps.length - 1 ? <View className="w-px flex-1" style={{ backgroundColor: colors.border, minHeight: 48 }} /> : null}
            </View>
            <View className="flex-1 pb-4">
              <Text className="text-sm font-semibold text-foreground" style={{ fontFamily: "Poppins_600SemiBold", color: colors.foreground }}>
                {s.title}
              </Text>
              <Text className="mt-1 text-xs leading-relaxed text-muted-foreground" style={{ color: colors.mutedForeground }}>
                {s.detail}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View className="mt-auto gap-3">
        <Button size="lg" onPress={() => router.push("/(tabs)/dashboard")}>
          Back to dashboard
        </Button>
        <Button variant="secondary" size="lg" onPress={() => router.push("/(tabs)/search")}>
          Find another supervisor
        </Button>
      </View>
    </Screen>
  );
}
