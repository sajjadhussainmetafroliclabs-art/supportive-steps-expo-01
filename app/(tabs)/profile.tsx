import { View, Text, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { BadgeCheck, ChevronRight, PenLine } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { SupervisorCard } from "@/components/SupervisorCard";
import { useColors } from "@/theme/ThemeProvider";
import { shadows } from "@/theme/tokens";
import { supervisors } from "@/lib/data";

/** Ported from src/routes/profile.tsx. */
export default function Profile() {
  const router = useRouter();
  const colors = useColors();

  return (
    <Screen padded={false}>
      <View className="px-5 pt-2">
        <ScreenHeader
          title="My profile"
          action={
            <Pressable
              onPress={() => router.push("/edit-profile")}
              accessibilityLabel="Edit profile"
              className="mt-1 size-9 shrink-0 items-center justify-center rounded-full bg-secondary"
            >
              <PenLine size={16} color={colors.primary} />
            </Pressable>
          }
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingTop: 0 }}>
        <View className="rounded-2xl bg-card p-5" style={shadows.soft}>
          <View className="mx-auto size-20 items-center justify-center rounded-3xl bg-secondary self-center">
            <Text className="text-xl font-semibold text-primary" style={{ fontFamily: "Poppins_600SemiBold", color: colors.primary }}>
              JE
            </Text>
          </View>
          <Text className="mt-4 text-center text-lg font-semibold text-foreground" style={{ fontFamily: "Poppins_600SemiBold", color: colors.foreground }}>
            Jordan Ellis
          </Text>
          <Text className="text-center text-sm text-muted-foreground" style={{ color: colors.mutedForeground }}>
            Counseling Student · Austin, Texas
          </Text>
          <View
            className="mt-1 flex-row items-center gap-1 self-center rounded-full px-3 py-1"
            style={{ backgroundColor: `${colors.success}1F` }}
          >
            <BadgeCheck size={14} color={colors.success} />
            <Text className="text-xs font-medium" style={{ color: colors.success }}>
              Verified
            </Text>
          </View>
        </View>

        <View className="mt-4 flex-row gap-3">
          <Stat label="Reviews" value="7" />
          <Stat label="Saved" value="4" />
          <Stat label="Hours" value="42" />
        </View>

        <View className="mt-6">
          <Text className="mb-3 text-base text-foreground" style={{ color: colors.foreground }}>
            Personal info
          </Text>
          <View className="overflow-hidden rounded-2xl bg-card" style={shadows.soft}>
            <Row label="Email" value="jordan.ellis@university.edu" />
            <Divider />
            <Row label="Program" value="M.Ed. Clinical Mental Health" />
            <Divider />
            <Row label="License track" value="LPC-Associate" />
          </View>
        </View>

        <View className="mt-6">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-base text-foreground" style={{ color: colors.foreground }}>
              Saved supervisors
            </Text>
            <Pressable onPress={() => router.push("/(tabs)/search")} className="flex-row items-center">
              <Text className="text-xs font-medium text-primary" style={{ color: colors.primary }}>
                Browse
              </Text>
              <ChevronRight size={14} color={colors.primary} />
            </Pressable>
          </View>
          <View className="gap-3">
            {supervisors.slice(2).map((s) => (
              <SupervisorCard key={s.id} supervisor={s} />
            ))}
          </View>
        </View>

        <View className="mt-6 flex-row items-center gap-3 rounded-2xl bg-secondary p-4">
          <PenLine size={20} color={colors.primary} />
          <Text className="flex-1 text-xs leading-relaxed text-secondary-foreground" style={{ color: colors.secondaryForeground }}>
            Your published reviews are anonymous — supervisors can never trace them to this profile.
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  const colors = useColors();
  return (
    <View className="flex-1 items-center rounded-2xl bg-card p-4" style={shadows.soft}>
      <Text className="text-xl font-semibold text-primary" style={{ fontFamily: "Poppins_600SemiBold", color: colors.primary }}>
        {value}
      </Text>
      <Text className="mt-1 text-xs text-muted-foreground" style={{ color: colors.mutedForeground }}>
        {label}
      </Text>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  const colors = useColors();
  return (
    <View className="flex-row items-center justify-between gap-3 p-4">
      <Text className="text-xs text-muted-foreground" style={{ color: colors.mutedForeground }}>
        {label}
      </Text>
      <Text className="text-sm font-medium text-foreground" numberOfLines={1} style={{ color: colors.foreground }}>
        {value}
      </Text>
    </View>
  );
}

function Divider() {
  const colors = useColors();
  return <View style={{ height: 1, backgroundColor: colors.border }} />;
}
