import { useState } from "react";
import { View, Text, Pressable, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Logo } from "@/components/Logo";
import { Screen } from "@/components/Screen";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useColors } from "@/theme/ThemeProvider";
import { shadows } from "@/theme/tokens";
import { cn } from "@/lib/utils";
import { loginSchema, signUpSchema } from "@/lib/validation";

type Mode = "signup" | "login";
type FormValues = { name?: string; email: string; password: string };

/**
 * Ported from src/routes/auth.tsx. The original form did not validate or
 * submit anywhere (onSubmit called e.preventDefault() and the button was
 * really just a Link) — this version wires up real client-side validation
 * via react-hook-form + zod on the same fields, still navigating to /role
 * on success since there's no backend to call.
 */
export default function Auth() {
  const [mode, setMode] = useState<Mode>("signup");
  const router = useRouter();
  const colors = useColors();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(mode === "signup" ? signUpSchema : loginSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = () => {
    router.push("/role");
  };

  return (
    <Screen>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1">
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View className="mt-6 items-center">
            <Logo size={64} />
            <Text
              className="mt-4 text-2xl text-foreground"
              style={{ fontFamily: "Poppins_600SemiBold", color: colors.foreground }}
            >
              Supportive Steps
            </Text>
            <Text className="mt-1 text-sm text-muted-foreground" style={{ color: colors.mutedForeground }}>
              A safe space for supervision feedback
            </Text>
          </View>

          <View className="mt-8 rounded-2xl bg-card p-5" style={shadows.soft}>
            <View className="flex-row gap-1 rounded-xl bg-secondary p-1">
              {(["signup", "login"] as const).map((m) => (
                <Pressable
                  key={m}
                  onPress={() => setMode(m)}
                  className={cn("flex-1 items-center rounded-lg py-2")}
                  style={{ backgroundColor: mode === m ? colors.card : "transparent" }}
                >
                  <Text
                    className="text-sm font-semibold"
                    style={{
                      fontFamily: "Poppins_600SemiBold",
                      color: mode === m ? colors.primary : `${colors.secondaryForeground}B3`,
                    }}
                  >
                    {m === "signup" ? "Sign Up" : "Login"}
                  </Text>
                </Pressable>
              ))}
            </View>

            <View className="mt-6 gap-4">
              {mode === "signup" ? (
                <View>
                  <Label>Full name</Label>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        placeholder="Jordan Ellis"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={!!errors.name}
                      />
                    )}
                  />
                  {errors.name ? <FieldError message={errors.name.message} /> : null}
                </View>
              ) : null}

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
                {errors.email ? <FieldError message={errors.email.message} /> : null}
              </View>

              <View>
                <Label>Password</Label>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder="••••••••"
                      secureTextEntry
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={!!errors.password}
                    />
                  )}
                />
                {errors.password ? <FieldError message={errors.password.message} /> : null}
              </View>

              <Button size="lg" className="mt-2" onPress={handleSubmit(onSubmit)}>
                {mode === "signup" ? "Create account" : "Log in"}
              </Button>
            </View>

            <Pressable onPress={() => router.push("/forgot-password")} className="mt-4">
              <Text className="text-center text-sm font-medium text-muted-foreground" style={{ color: colors.mutedForeground }}>
                Forgot password?
              </Text>
            </Pressable>
          </View>

          <Text className="mt-8 text-center text-xs leading-relaxed text-muted-foreground" style={{ color: colors.mutedForeground }}>
            Reviews on Supportive Steps are always anonymous. Your account details are never shown
            alongside your feedback.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

function FieldError({ message }: { message?: string }) {
  const colors = useColors();
  if (!message) return null;
  return (
    <Text className="mt-1 text-xs" style={{ color: colors.destructive }}>
      {message}
    </Text>
  );
}
