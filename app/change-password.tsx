import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useColors } from "@/theme/ThemeProvider";
import { shadows } from "@/theme/tokens";
import { changePasswordSchema } from "@/lib/validation";

type FormValues = { currentPassword: string; newPassword: string; confirmPassword: string };

/** Ported from src/routes/change-password.tsx, with validation added. */
export default function ChangePassword() {
  const router = useRouter();
  const colors = useColors();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  return (
    <Screen>
      <ScreenHeader title="Change password" backTo="/(tabs)/settings" />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1">
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View className="rounded-2xl bg-card p-5" style={shadows.soft}>
            <View className="gap-4">
              <View>
                <Label>Current password</Label>
                <Controller
                  control={control}
                  name="currentPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input placeholder="••••••••" secureTextEntry value={value} onChangeText={onChange} onBlur={onBlur} error={!!errors.currentPassword} />
                  )}
                />
                {errors.currentPassword ? (
                  <Text className="mt-1 text-xs" style={{ color: colors.destructive }}>
                    {errors.currentPassword.message}
                  </Text>
                ) : null}
              </View>
              <View>
                <Label>New password</Label>
                <Controller
                  control={control}
                  name="newPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input placeholder="••••••••" secureTextEntry value={value} onChangeText={onChange} onBlur={onBlur} error={!!errors.newPassword} />
                  )}
                />
                {errors.newPassword ? (
                  <Text className="mt-1 text-xs" style={{ color: colors.destructive }}>
                    {errors.newPassword.message}
                  </Text>
                ) : (
                  <Text className="mt-1 text-xs text-muted-foreground" style={{ color: colors.mutedForeground }}>
                    8+ characters, one uppercase letter, one number or symbol.
                  </Text>
                )}
              </View>
              <View>
                <Label>Confirm new password</Label>
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

              <Button size="lg" onPress={handleSubmit(() => router.push("/(tabs)/settings"))}>
                Update password
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
