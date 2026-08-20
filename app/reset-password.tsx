import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useColors } from "@/theme/ThemeProvider";
import { shadows } from "@/theme/tokens";
import { resetPasswordSchema } from "@/lib/validation";

type FormValues = { password: string; confirmPassword: string };

/** Ported from src/routes/reset-password.tsx, with validation added. */
export default function ResetPassword() {
  const router = useRouter();
  const colors = useColors();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  return (
    <Screen>
      <ScreenHeader title="Set a new password" backTo="/verify-code" />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1">
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View className="rounded-2xl bg-card p-5" style={shadows.soft}>
            <View className="size-12 items-center justify-center rounded-2xl bg-secondary">
              <LockKeyhole size={24} color={colors.primary} />
            </View>

            <View className="mt-6 gap-4">
              <View>
                <Label>New password</Label>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input placeholder="••••••••" secureTextEntry value={value} onChangeText={onChange} onBlur={onBlur} error={!!errors.password} />
                  )}
                />
                {errors.password ? (
                  <Text className="mt-1 text-xs" style={{ color: colors.destructive }}>
                    {errors.password.message}
                  </Text>
                ) : (
                  <Text className="mt-1 text-xs text-muted-foreground" style={{ color: colors.mutedForeground }}>
                    8+ characters, one uppercase letter, one number or symbol.
                  </Text>
                )}
              </View>
              <View>
                <Label>Confirm password</Label>
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder="••••••••"
                      secureTextEntry
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={!!errors.confirmPassword}
                    />
                  )}
                />
                {errors.confirmPassword ? (
                  <Text className="mt-1 text-xs" style={{ color: colors.destructive }}>
                    {errors.confirmPassword.message}
                  </Text>
                ) : null}
              </View>

              <Button size="lg" onPress={handleSubmit(() => router.push("/password-updated"))}>
                Reset password
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
