import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Bookmark, Briefcase, MapPin, PenLine } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { StarRating } from "@/components/StarRating";
import { Button } from "@/components/ui/Button";
import { useColors } from "@/theme/ThemeProvider";
import { shadows } from "@/theme/tokens";
import { recentReviews, supervisors } from "@/lib/data";

/**
 * Ported from src/routes/supervisor.$id.tsx. TanStack Router's `loader` +
 * `notFound()` becomes a direct lookup from the route param — Expo Router
 * has no route loaders, so the "not found" case is handled inline.
 */
export default function SupervisorProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useColors();

  const supervisor = supervisors.find((s) => s.id === id);

  if (!supervisor) {
    return (
      <Screen className="items-center justify-center">
        <Text className="text-base text-foreground" style={{ color: colors.foreground }}>
          Supervisor not found.
        </Text>
      </Screen>
    );
  }

  const reviews = recentReviews.filter((r) => r.supervisorId === supervisor.id);
  const initials = supervisor.name
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .map((p) => p[0])
    .join("");

  return (
    <Screen padded={false}>
      <View className="px-5 pt-2">
        <ScreenHeader backTo="/(tabs)/search" title="Supervisor profile" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingTop: 0, paddingBottom: 8 }}>
        <View className="rounded-2xl bg-card p-5" style={shadows.soft}>
          <View className="mx-auto size-20 items-center justify-center rounded-3xl bg-secondary self-center">
            <Text className="text-xl font-semibold text-primary" style={{ fontFamily: "Poppins_600SemiBold", color: colors.primary }}>
              {initials}
            </Text>
          </View>
          <Text className="mt-4 text-center text-lg font-semibold text-foreground" style={{ fontFamily: "Poppins_600SemiBold", color: colors.foreground }}>
            {supervisor.name}
          </Text>
          <Text className="text-center text-sm text-muted-foreground" style={{ color: colors.mutedForeground }}>
            {supervisor.credentials} · {supervisor.licenseType}
          </Text>
          <View className="mt-3 flex-row items-center justify-center gap-2">
            <StarRating value={supervisor.rating} />
            <Text className="text-sm font-semibold" style={{ color: colors.foreground }}>
              {supervisor.rating}
            </Text>
            <Text className="text-xs text-muted-foreground" style={{ color: colors.mutedForeground }}>
              ({supervisor.reviewCount} reviews)
            </Text>
          </View>

          <View className="mt-4 flex-row gap-3">
            <View className="flex-1 rounded-xl bg-secondary p-3">
              <View className="flex-row items-center gap-1">
                <Briefcase size={12} color={`${colors.secondaryForeground}CC`} />
                <Text className="text-[11px]" style={{ color: `${colors.secondaryForeground}CC` }}>
                  Experience
                </Text>
              </View>
              <Text className="mt-1 text-sm font-semibold" style={{ fontFamily: "Poppins_600SemiBold", color: colors.foreground }}>
                {supervisor.years} years
              </Text>
            </View>
            <View className="flex-1 rounded-xl bg-secondary p-3">
              <View className="flex-row items-center gap-1">
                <MapPin size={12} color={`${colors.secondaryForeground}CC`} />
                <Text className="text-[11px]" style={{ color: `${colors.secondaryForeground}CC` }}>
                  Location
                </Text>
              </View>
              <Text className="mt-1 text-sm font-semibold" style={{ fontFamily: "Poppins_600SemiBold", color: colors.foreground }}>
                {supervisor.city}, {supervisor.state}
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-6">
          <Text className="mb-2 text-base text-foreground" style={{ color: colors.foreground }}>
            Specialization
          </Text>
          <View className="rounded-2xl bg-card p-4" style={shadows.soft}>
            <Text className="mb-2 text-sm font-semibold text-foreground" style={{ fontFamily: "Poppins_600SemiBold", color: colors.foreground }}>
              {supervisor.specialty}
            </Text>
            <Text className="text-sm leading-relaxed text-muted-foreground" style={{ color: colors.mutedForeground }}>
              {supervisor.bio}
            </Text>
          </View>
        </View>

        <View className="mt-6">
          <Text className="mb-3 text-base text-foreground" style={{ color: colors.foreground }}>
            Anonymous reviews
          </Text>
          <View className="gap-3">
            {reviews.length ? (
              reviews.map((r) => (
                <View key={r.id} className="rounded-2xl bg-card p-4" style={shadows.soft}>
                  <View className="flex-row items-center justify-between">
                    <StarRating value={r.rating} />
                    <Text className="text-xs text-muted-foreground" style={{ color: colors.mutedForeground }}>
                      {r.date}
                    </Text>
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
              ))
            ) : (
              <View className="rounded-2xl bg-card p-5" style={shadows.soft}>
                <Text className="text-center text-sm text-muted-foreground" style={{ color: colors.mutedForeground }}>
                  No published reviews yet. Be the first to share your experience.
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <View className="flex-row gap-3 border-t px-5 py-4" style={{ borderTopColor: colors.border, backgroundColor: colors.background }}>
        <Button className="flex-1" onPress={() => router.push(`/review/${supervisor.id}`)}>
          <View className="flex-row items-center gap-2">
            <PenLine size={16} color={colors.primaryForeground} />
            <Text className="text-sm font-semibold" style={{ fontFamily: "Poppins_600SemiBold", color: colors.primaryForeground }}>
              Write Review
            </Text>
          </View>
        </Button>
        <Button variant="secondary" className="px-5">
          <View className="flex-row items-center gap-2">
            <Bookmark size={16} color={colors.secondaryForeground} />
            <Text className="text-sm font-semibold" style={{ fontFamily: "Poppins_600SemiBold", color: colors.secondaryForeground }}>
              Save
            </Text>
          </View>
        </Button>
      </View>
    </Screen>
  );
}
