import { View, Text, Pressable, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailQuestion } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useColors } from "@/theme/ThemeProvider";
import { shadows } from "@/theme/tokens";
import { forgotPasswordSchema } from "@/lib/validation";

type FormValues = { email: string };

/** Ported from src/routes/forgot-password.tsx, with validation added. */
export default function ForgotPassword() {
  const router = useRouter();
  const colors = useColors();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(forgotPasswordSchema), defaultValues: { email: "" } });

  return (
    <Screen>
      <ScreenHeader title="Forgot password?" backTo="/auth" />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1">
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View className="rounded-2xl bg-card p-5" style={shadows.soft}>
            <View className="size-12 items-center justify-center rounded-2xl bg-secondary">
              <MailQuestion size={24} color={colors.primary} />
            </View>
            <Text className="mt-4 text-sm leading-relaxed text-muted-foreground" style={{ color: colors.mutedForeground }}>
              Enter the email linked to your account. We'll send a 6-digit verification code so you
              can set a new password.
            </Text>

            <View className="mt-6 gap-4">
              <View>
                <Label>Email</Label>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder="you@university.edu"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={!!errors.email}
                    />
                  )}
                />
                {errors.email ? (
                  <Text className="mt-1 text-xs" style={{ color: colors.destructive }}>
                    {errors.email.message}
                  </Text>
                ) : null}
              </View>
              <Button size="lg" onPress={handleSubmit(() => router.push("/verify-code"))}>
                Send code
              </Button>
            </View>
          </View>

          <View className="mt-6 flex-row justify-center">
            <Text className="text-sm text-muted-foreground" style={{ color: colors.mutedForeground }}>
              Remembered it?{" "}
            </Text>
            <Pressable onPress={() => router.push("/auth")}>
              <Text className="text-sm font-semibold" style={{ color: colors.primary }}>
                Back to login
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
