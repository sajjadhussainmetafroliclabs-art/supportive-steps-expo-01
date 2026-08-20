import { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { GraduationCap, BookOpen, Check } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Button } from "@/components/ui/Button";
import { useColors } from "@/theme/ThemeProvider";
import { shadows } from "@/theme/tokens";

/** Ported from src/routes/role.tsx. */
const roles = [
  {
    id: "student",
    emoji: "🎓",
    Icon: GraduationCap,
    title: "Counseling Student",
    description:
      "Currently enrolled in a master's or doctoral counseling program and looking for practicum or internship supervision.",
    requirements: ["Active university email", "Student ID (optional)"],
  },
  {
    id: "associate",
    emoji: "📚",
    Icon: BookOpen,
    title: "Licensed Associate",
    description: "Accruing post-graduate hours under a board-approved supervisor toward full licensure.",
    requirements: ["State license number", "License proof (optional)"],
  },
] as const;

export default function RoleSelect() {
  const [selected, setSelected] = useState("student");
  const router = useRouter();
  const colors = useColors();

  return (
    <Screen>
      <ScreenHeader backTo="/auth" title="Select your role" subtitle="This tailors verification and what you can review." />

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="gap-4">
          {roles.map((role) => {
            const active = selected === role.id;
            const Icon = role.Icon;
            return (
              <Pressable
                key={role.id}
                onPress={() => setSelected(role.id)}
                className="rounded-2xl border-2 bg-card p-5"
                style={[shadows.soft, { borderColor: active ? colors.primary : "transparent" }]}
              >
                <View className="flex-row items-start gap-4">
                  <View className="size-12 shrink-0 items-center justify-center rounded-xl bg-secondary">
                    <Icon size={24} color={colors.primary} strokeWidth={1.8} />
                  </View>
                  <View className="min-w-0 flex-1">
                    <View className="flex-row items-center gap-2">
                      <Text
                        className="text-base font-semibold text-foreground"
                        style={{ fontFamily: "Poppins_600SemiBold", color: colors.foreground }}
                      >
                        {role.emoji} {role.title}
                      </Text>
                      {active ? (
                        <View className="ml-auto size-5 items-center justify-center rounded-full" style={{ backgroundColor: colors.primary }}>
                          <Check size={14} color={colors.primaryForeground} />
                        </View>
                      ) : null}
                    </View>
                    <Text className="mt-2 text-sm leading-relaxed text-muted-foreground" style={{ color: colors.mutedForeground }}>
                      {role.description}
                    </Text>
                    <View className="mt-3 gap-1">
                      {role.requirements.map((r) => (
                        <Text key={r} className="text-xs font-medium text-secondary-foreground" style={{ color: colors.secondaryForeground }}>
                          • {r}
                        </Text>
                      ))}
                    </View>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <Button size="lg" className="mt-4" onPress={() => router.push("/verification")}>
        Continue
      </Button>
    </Screen>
  );
}
