import { useState } from "react";
import { View, Text, Pressable, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ShieldCheck } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { StarRating } from "@/components/StarRating";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { useColors } from "@/theme/ThemeProvider";
import { shadows } from "@/theme/tokens";
import { experienceTags, supervisors } from "@/lib/data";

const MAX = 1000;

/** Ported from src/routes/review.$id.tsx. Same 40-char minimum / 1000-char max validation. */
export default function WriteReview() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useColors();

  const supervisor = supervisors.find((s) => s.id === id);

  const [rating, setRating] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [body, setBody] = useState("");

  const valid = rating > 0 && body.trim().length >= 40;

  if (!supervisor) {
    return (
      <Screen className="items-center justify-center">
        <Text className="text-base text-foreground" style={{ color: colors.foreground }}>
          Supervisor not found.
        </Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScreenHeader
        backTo="/(tabs)/search"
        title="Write a review"
        subtitle={`About ${supervisor.name}, ${supervisor.credentials}`}
      />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1">
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View className="mb-6 flex-row items-start gap-3 rounded-2xl bg-secondary p-4">
            <ShieldCheck size={20} color={colors.primary} style={{ marginTop: 2 }} />
            <Text className="flex-1 text-xs leading-relaxed text-secondary-foreground" style={{ color: colors.secondaryForeground }}>
              This review is anonymous. Never include client details or information that could
              identify you.
            </Text>
          </View>

          <View className="items-center rounded-2xl bg-card p-5" style={shadows.soft}>
            <Text className="text-sm font-semibold text-foreground" style={{ fontFamily: "Poppins_600SemiBold", color: colors.foreground }}>
              Overall experience
            </Text>
            <View className="mt-3">
              <StarRating value={rating} size="lg" onChange={setRating} />
            </View>
          </View>

          <View className="mt-6">
            <Text className="mb-3 text-base text-foreground" style={{ color: colors.foreground }}>
              Experience tags
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {experienceTags.map((t) => {
                const active = tags.includes(t);
                return (
                  <Pressable
                    key={t}
                    onPress={() => setTags((p) => (active ? p.filter((x) => x !== t) : [...p, t]))}
                    className="rounded-full px-4 py-2"
                    style={[!active && shadows.soft, { backgroundColor: active ? colors.primary : colors.card }]}
                  >
                    <Text className="text-xs font-medium" style={{ color: active ? colors.primaryForeground : colors.mutedForeground }}>
                      {t}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View className="mt-6">
            <Text className="mb-3 text-base text-foreground" style={{ color: colors.foreground }}>
              Your experience
            </Text>
            <Textarea
              value={body}
              maxLength={MAX}
              onChangeText={(t) => setBody(t.slice(0, MAX))}
              numberOfLines={7}
              placeholder="What was supervision like week to week? How was feedback delivered? What would a future supervisee want to know?"
              className="min-h-[140px]"
              style={shadows.soft}
            />
            <Text className="mt-2 text-right text-xs text-muted-foreground" style={{ color: colors.mutedForeground }}>
              {body.length}/{MAX}
            </Text>
          </View>

          <Button size="lg" className="mt-6" disabled={!valid} onPress={() => router.push("/review-submitted")}>
            Submit anonymously
          </Button>
          <Text className="mt-3 text-center text-xs text-muted-foreground" style={{ color: colors.mutedForeground }}>
            Add a rating and at least 40 characters to submit.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
