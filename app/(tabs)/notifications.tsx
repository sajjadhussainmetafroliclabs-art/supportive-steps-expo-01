import { View, Text, ScrollView } from "react-native";
import { BadgeCheck, Info, MessageSquare, type LucideIcon } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { useColors } from "@/theme/ThemeProvider";
import { shadows } from "@/theme/tokens";

/** Ported from src/routes/notifications.tsx. */
const items: { icon: LucideIcon; tone: "success" | "primary" | "beige"; title: string; body: string; time: string }[] = [
  {
    icon: MessageSquare,
    tone: "success",
    title: "Review approved",
    body: "Your review of Dr. Amara Hale passed moderation and is now published.",
    time: "1h ago",
  },
  {
    icon: BadgeCheck,
    tone: "primary",
    title: "Account approved",
    body: "Your university email was verified. Full access is unlocked.",
    time: "Yesterday",
  },
  {
    icon: Info,
    tone: "beige",
    title: "System update",
    body: "New specialty filters added for school-based and community settings.",
    time: "3 days ago",
  },
];

export default function Notifications() {
  const colors = useColors();

  const toneStyle: Record<string, { bg: string; fg: string }> = {
    success: { bg: `${colors.success}1F`, fg: colors.success },
    primary: { bg: colors.secondary, fg: colors.primary },
    beige: { bg: `${colors.beige}59`, fg: colors.beigeForeground },
  };

  return (
    <Screen padded={false}>
      <View className="px-5 pt-2">
        <ScreenHeader title="Notifications" subtitle="Everything about your account and reviews." />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingTop: 0 }}>
        <View className="gap-3">
          {items.map((n) => {
            const Icon = n.icon;
            const tone = toneStyle[n.tone];
            return (
              <View key={n.title} className="flex-row gap-4 rounded-2xl bg-card p-4" style={shadows.soft}>
                <View className="size-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: tone.bg }}>
                  <Icon size={20} color={tone.fg} strokeWidth={1.8} />
                </View>
                <View className="min-w-0 flex-1">
                  <View className="flex-row items-baseline justify-between gap-2">
                    <Text className="text-sm font-semibold text-foreground" style={{ fontFamily: "Poppins_600SemiBold", color: colors.foreground }}>
                      {n.title}
                    </Text>
                    <Text className="shrink-0 text-xs text-muted-foreground" style={{ color: colors.mutedForeground }}>
                      {n.time}
                    </Text>
                  </View>
                  <Text className="mt-1 text-xs leading-relaxed text-muted-foreground" style={{ color: colors.mutedForeground }}>
                    {n.body}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </Screen>
  );
}
