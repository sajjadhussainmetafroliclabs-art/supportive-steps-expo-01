import { View, Text, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Bell, PenLine, Search } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { StarRating } from "@/components/StarRating";
import { SupervisorCard } from "@/components/SupervisorCard";
import { useColors } from "@/theme/ThemeProvider";
import { shadows } from "@/theme/tokens";
import { recentReviews, supervisors } from "@/lib/data";

/** Ported from src/routes/dashboard.tsx. */
export default function Dashboard() {
  const router = useRouter();
  const colors = useColors();

  return (
    <Screen padded={false}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        <View className="mb-6 flex-row items-center justify-between">
          <View>
            <Text className="text-sm text-muted-foreground" style={{ color: colors.mutedForeground }}>
              Good morning,
            </Text>
            <Text className="text-2xl text-foreground" style={{ fontFamily: "Poppins_600SemiBold", color: colors.foreground }}>
              Jordan
            </Text>
          </View>
          <Pressable
            onPress={() => router.push("/(tabs)/notifications")}
            accessibilityLabel="Notifications"
            className="relative size-11 items-center justify-center rounded-full bg-card"
            style={shadows.soft}
          >
            <Bell size={20} color={colors.primary} strokeWidth={1.8} />
            <View className="absolute right-3 top-3 size-2 rounded-full" style={{ backgroundColor: colors.warning }} />
          </Pressable>
        </View>

        <View className="rounded-2xl p-5" style={[shadows.soft, { backgroundColor: colors.primary }]}>
          <Text className="text-lg font-semibold" style={{ fontFamily: "Poppins_600SemiBold", color: colors.primaryForeground }}>
            You're verified
          </Text>
          <Text className="mt-1 text-sm leading-relaxed" style={{ color: `${colors.primaryForeground}D9` }}>
            Counseling Student · 42 supervision hours logged this term. Your reviews stay fully
            anonymous.
          </Text>
        </View>

        <View className="mt-6">
          <Text className="mb-3 text-base text-foreground" style={{ color: colors.foreground }}>
            Quick actions
          </Text>
          <View className="flex-row gap-3">
            <Pressable onPress={() => router.push("/(tabs)/search")} className="flex-1 rounded-2xl bg-card p-4" style={shadows.soft}>
              <View className="size-10 items-center justify-center rounded-xl bg-secondary">
                <Search size={20} color={colors.primary} strokeWidth={1.8} />
              </View>
              <Text className="mt-3 text-sm font-semibold text-foreground" style={{ fontFamily: "Poppins_600SemiBold", color: colors.foreground }}>
                Find Supervisor
              </Text>
              <Text className="mt-1 text-xs text-muted-foreground" style={{ color: colors.mutedForeground }}>
                Filter by state & specialty
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.push(`/review/${supervisors[0].id}`)}
              className="flex-1 rounded-2xl bg-card p-4"
              style={shadows.soft}
            >
              <View className="size-10 items-center justify-center rounded-xl bg-secondary">
                <PenLine size={20} color={colors.primary} strokeWidth={1.8} />
              </View>
              <Text className="mt-3 text-sm font-semibold text-foreground" style={{ fontFamily: "Poppins_600SemiBold", color: colors.foreground }}>
                Write Review
              </Text>
              <Text className="mt-1 text-xs text-muted-foreground" style={{ color: colors.mutedForeground }}>
                Anonymous & moderated
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="mt-7">
          <Text className="mb-3 text-base text-foreground" style={{ color: colors.foreground }}>
            Recent reviews
          </Text>
          <View className="gap-3">
            {recentReviews.map((r) => (
              <View key={r.id} className="rounded-2xl bg-card p-4" style={shadows.soft}>
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm font-semibold text-foreground" style={{ fontFamily: "Poppins_600SemiBold", color: colors.foreground }}>
                    {r.supervisorName}
                  </Text>
                  <Text className="text-xs text-muted-foreground" style={{ color: colors.mutedForeground }}>
                    {r.date}
                  </Text>
                </View>
                <View className="mt-1">
                  <StarRating value={r.rating} />
                </View>
                <Text className="mt-2 text-xs leading-relaxed text-muted-foreground" style={{ color: colors.mutedForeground }}>
                  {r.body}
                </Text>
                <View className="mt-3 flex-row flex-wrap gap-2">
                  {r.tags.map((t) => (
                    <View key={t} className="rounded-full bg-secondary px-3 py-1">
                      <Text className="text-[11px] font-medium text-secondary-foreground" style={{ color: colors.secondaryForeground }}>
                        {t}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-7">
          <Text className="mb-3 text-base text-foreground" style={{ color: colors.foreground }}>
            Suggested supervisors
          </Text>
          <View className="gap-3">
            {supervisors.slice(0, 2).map((s) => (
              <SupervisorCard key={s.id} supervisor={s} />
            ))}
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
