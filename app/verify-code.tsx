import { useRef, useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { KeyRound } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Button } from "@/components/ui/Button";
import { useColors } from "@/theme/ThemeProvider";
import { shadows } from "@/theme/tokens";

const LENGTH = 6;

/** Ported from src/routes/verify-code.tsx. Same 6-box OTP input pattern. */
export default function VerifyCode() {
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(""));
  const router = useRouter();
  const colors = useColors();
  const inputs = useRef<Array<TextInput | null>>([]);

  const code = digits.join("");
  const complete = code.length === LENGTH;

  const setDigit = (i: number, value: string) => {
    const v = value.replace(/[^0-9]/g, "").slice(-1);
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    if (v && i < LENGTH - 1) inputs.current[i + 1]?.focus();
  };

  const onKeyPress = (i: number, key: string) => {
    if (key === "Backspace" && !digits[i] && i > 0) inputs.current[i - 1]?.focus();
  };

  return (
    <Screen>
      <ScreenHeader title="Enter verification code" backTo="/forgot-password" />

      <View className="rounded-2xl bg-card p-5" style={shadows.soft}>
        <View className="size-12 items-center justify-center rounded-2xl bg-secondary">
          <KeyRound size={24} color={colors.primary} />
        </View>
        <Text className="mt-4 text-sm leading-relaxed text-muted-foreground" style={{ color: colors.mutedForeground }}>
          We sent a 6-digit code to your email. Enter it below to continue.
        </Text>

        <View className="mt-6 flex-row justify-between gap-2">
          {digits.map((d, i) => (
            <TextInput
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              value={d}
              onChangeText={(v) => setDigit(i, v)}
              onKeyPress={(e) => onKeyPress(i, e.nativeEvent.key)}
              keyboardType="number-pad"
              maxLength={1}
              className="h-14 w-11 rounded-xl border text-center text-lg font-semibold"
              style={{ borderColor: colors.input, backgroundColor: colors.background, color: colors.foreground }}
            />
          ))}
        </View>

        <Button size="lg" className="mt-6" disabled={!complete} onPress={() => router.push("/reset-password")}>
          Verify
        </Button>
      </View>

      <View className="mt-6 flex-row justify-center">
        <Text className="text-sm text-muted-foreground" style={{ color: colors.mutedForeground }}>
          Didn't get a code?{" "}
        </Text>
        <Pressable>
          <Text className="text-sm font-semibold" style={{ color: colors.primary }}>
            Resend
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}
