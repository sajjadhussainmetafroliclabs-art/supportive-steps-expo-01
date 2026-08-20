import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { MapPin } from "lucide-react-native";
import { StarRating } from "@/components/StarRating";
import { useColors } from "@/theme/ThemeProvider";
import { shadows } from "@/theme/tokens";
import type { Supervisor } from "@/lib/data";

/** Ported from src/components/SupervisorCard.tsx. */
export function SupervisorCard({ supervisor }: { supervisor: Supervisor }) {
  const router = useRouter();
  const colors = useColors();

  const initials = supervisor.name
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .map((p) => p[0])
    .join("");

  return (
    <Pressable
      onPress={() => router.push(`/supervisor/${supervisor.id}` as never)}
      className="flex-row gap-4 rounded-2xl bg-card p-4"
      style={shadows.soft}
    >
      <View className="size-14 shrink-0 items-center justify-center rounded-2xl bg-secondary">
        <Text
          className="text-base font-semibold text-primary"
          style={{ fontFamily: "Poppins_600SemiBold", color: colors.primary }}
        >
          {initials}
        </Text>
      </View>
      <View className="min-w-0 flex-1">
        <Text
          className="text-sm font-semibold text-foreground"
          style={{ fontFamily: "Poppins_600SemiBold", color: colors.foreground }}
        >
          {supervisor.name}
        </Text>
        <Text className="text-xs text-muted-foreground" style={{ color: colors.mutedForeground }}>
          {supervisor.credentials} · {supervisor.specialty}
        </Text>
        <View className="mt-2 flex-row items-center gap-2">
          <StarRating value={supervisor.rating} />
          <Text className="text-xs font-medium text-foreground" style={{ color: colors.foreground }}>
            {supervisor.rating}
          </Text>
          <Text className="text-xs text-muted-foreground" style={{ color: colors.mutedForeground }}>
            ({supervisor.reviewCount})
          </Text>
        </View>
        <View className="mt-1 flex-row items-center gap-1">
          <MapPin size={12} color={colors.mutedForeground} />
          <Text className="text-xs text-muted-foreground" style={{ color: colors.mutedForeground }}>
            {supervisor.city}, {supervisor.state}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
