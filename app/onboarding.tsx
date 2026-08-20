import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Screen } from "@/components/Screen";
import { Button } from "@/components/ui/Button";
import { useColors } from "@/theme/ThemeProvider";
import { cn } from "@/lib/utils";

/** Ported from src/routes/onboarding.tsx. Same 3 slides, same copy, same inline SVG art. */
const slides = [
  {
    title: "Find Trusted Clinical Supervisors",
    body: "Browse verified supervisors by state, specialty and license type — with honest ratings from peers who trained under them.",
    Art: StudentSupervisorArt,
  },
  {
    title: "Share Safe Anonymous Experiences",
    body: "Your identity is never attached to a review. Moderation keeps feedback constructive, factual and emotionally safe.",
    Art: AnonymousArt,
  },
  {
    title: "Build Better Professional Relationships",
    body: "Choose supervision that fits your growth path, so your pre-licensure hours build real clinical confidence.",
    Art: GrowthArt,
  },
] as const;

export default function Onboarding() {
  const [i, setI] = useState(0);
  const router = useRouter();
  const colors = useColors();
  const slide = slides[i];
  const last = i === slides.length - 1;
  const Art = slide.Art;

  return (
    <Screen>
      <View className="flex-row justify-end">
        <Pressable onPress={() => router.push("/auth")}>
          <Text className="text-sm font-medium text-muted-foreground" style={{ color: colors.mutedForeground }}>
            Skip
          </Text>
        </Pressable>
      </View>

      <Animated.View key={i} entering={FadeInUp.duration(400)} className="flex-1 items-center justify-center">
        <View className="size-56 items-center justify-center rounded-3xl bg-secondary">
          <Art />
        </View>
        <Text
          className="mt-10 text-center text-2xl leading-snug text-foreground"
          style={{ fontFamily: "Poppins_600SemiBold", color: colors.foreground }}
        >
          {slide.title}
        </Text>
        <Text
          className="mt-3 text-center text-sm leading-relaxed text-muted-foreground"
          style={{ color: colors.mutedForeground }}
        >
          {slide.body}
        </Text>
      </Animated.View>

      <View className="mt-8 flex-row items-center justify-center gap-2">
        {slides.map((s, idx) => (
          <View
            key={s.title}
            className={cn("h-1.5 rounded-full", idx === i ? "w-6" : "w-1.5")}
            style={{ backgroundColor: idx === i ? colors.primary : colors.border }}
          />
        ))}
      </View>

      <Button size="lg" className="mt-6" onPress={() => (last ? router.push("/auth") : setI(i + 1))}>
        {last ? "Get Started" : "Next"}
      </Button>
    </Screen>
  );
}

function StudentSupervisorArt() {
  return (
    <Svg viewBox="0 0 120 120" width={160} height={160} accessibilityLabel="Student and supervisor">
      <Circle cx="42" cy="42" r="14" fill="#4f6b5a" />
      <Path d="M20 92c0-14 10-24 22-24s22 10 22 24z" fill="#4f6b5aB3" />
      <Circle cx="82" cy="48" r="12" fill="#8a9b84" />
      <Path d="M62 94c0-12 9-20 20-20s20 8 20 20z" fill="#d7c3a0" />
    </Svg>
  );
}

function AnonymousArt() {
  return (
    <Svg viewBox="0 0 120 120" width={160} height={160} accessibilityLabel="Anonymous review">
      <Rect x="20" y="26" width="80" height="54" rx="14" fill="#ffffff" />
      <Rect x="32" y="42" width="46" height="6" rx="3" fill="#8a9b84" />
      <Rect x="32" y="56" width="34" height="6" rx="3" fill="#d7c3a0" />
      <Circle cx="84" cy="86" r="18" fill="#4f6b5a" />
      <Path d="M78 86v-5a6 6 0 0 1 12 0v5" stroke="#fbfaf7" strokeWidth={3} fill="none" strokeLinecap="round" />
      <Rect x="76" y="86" width="16" height="12" rx="3" fill="#fbfaf7" />
    </Svg>
  );
}

function GrowthArt() {
  return (
    <Svg viewBox="0 0 120 120" width={160} height={160} accessibilityLabel="Growth path">
      <Rect x="20" y="76" width="20" height="22" rx="6" fill="#d7c3a0" />
      <Rect x="48" y="58" width="20" height="40" rx="6" fill="#8a9b84" />
      <Rect x="76" y="34" width="20" height="64" rx="6" fill="#4f6b5a" />
      <Circle cx="86" cy="22" r="7" fill="#d7c3a0" />
    </Svg>
  );
}
