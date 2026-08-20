import { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { useColors } from "@/theme/ThemeProvider";
import { shadows } from "@/theme/tokens";

/** Ported from src/routes/terms.tsx. */
const consents = [
  {
    id: "anon",
    label: "Anonymous reviews",
    detail:
      "I understand reviews are published without my name and that I must not include identifying details about clients.",
  },
  {
    id: "privacy",
    label: "Privacy policy",
    detail: "I consent to Supportive Steps storing my verification details securely and separately from my reviews.",
  },
  {
    id: "community",
    label: "Community guidelines",
    detail: "I will keep feedback factual, professional and free of harassment or defamatory claims.",
  },
] as const;

export default function Terms() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const router = useRouter();
  const colors = useColors();
  const allChecked = consents.every((c) => checked[c.id]);

  return (
    <Screen>
      <ScreenHeader backTo="/verification" title="Terms & consent" subtitle="Please read and accept before continuing." />

      <View className="mb-5 max-h-56 overflow-hidden rounded-2xl bg-card" style={shadows.soft}>
        <ScrollView className="p-5" showsVerticalScrollIndicator={false}>
          <Text className="mb-2 text-sm font-semibold text-foreground" style={{ fontFamily: "Poppins_600SemiBold", color: colors.foreground }}>
            Anonymous review policy
          </Text>
          <Text className="text-xs leading-relaxed text-muted-foreground" style={{ color: colors.mutedForeground }}>
            Supportive Steps exists so counseling students and licensed associates can describe
            supervision experiences without fear of retaliation. Reviews are published without any
            identifying information about the reviewer.
          </Text>
          <Text className="mt-3 text-xs leading-relaxed text-muted-foreground" style={{ color: colors.mutedForeground }}>
            Every submission passes human moderation before publication. Moderators remove client
            information, personal attacks, allegations that cannot be described factually, and
            anything that could identify the reviewer.
          </Text>
          <Text className="mb-2 mt-4 text-sm font-semibold text-foreground" style={{ fontFamily: "Poppins_600SemiBold", color: colors.foreground }}>
            Privacy
          </Text>
          <Text className="text-xs leading-relaxed text-muted-foreground" style={{ color: colors.mutedForeground }}>
            Verification records are stored separately from review content and are never visible to
            supervisors, other members, or the public. You may request deletion of your account and
            associated records at any time.
          </Text>
          <Text className="mb-2 mt-4 text-sm font-semibold text-foreground" style={{ fontFamily: "Poppins_600SemiBold", color: colors.foreground }}>
            Community guidelines
          </Text>
          <Text className="text-xs leading-relaxed text-muted-foreground" style={{ color: colors.mutedForeground }}>
            Describe what happened, how it affected your training, and what you would want a future
            supervisee to know. Avoid speculation about motives, diagnoses of any individual, and
            language intended to harm.
          </Text>
        </ScrollView>
      </View>

      <View className="gap-3">
        {consents.map((c) => (
          <View key={c.id} className="flex-row gap-3 rounded-2xl bg-card p-4" style={shadows.soft}>
            <Checkbox
              checked={!!checked[c.id]}
              onCheckedChange={(v) => setChecked((p) => ({ ...p, [c.id]: v }))}
            />
            <View className="flex-1">
              <Text className="text-sm font-semibold text-foreground" style={{ fontFamily: "Poppins_600SemiBold", color: colors.foreground }}>
                {c.label}
              </Text>
              <Text className="mt-1 text-xs leading-relaxed text-muted-foreground" style={{ color: colors.mutedForeground }}>
                {c.detail}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <Button size="lg" className="mt-4" disabled={!allChecked} onPress={() => router.push("/pending")}>
        I agree, continue
      </Button>
    </Screen>
  );
}
