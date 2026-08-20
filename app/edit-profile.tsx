import { View, Text, Pressable, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { useColors } from "@/theme/ThemeProvider";
import { shadows } from "@/theme/tokens";
import { editProfileSchema } from "@/lib/validation";

type FormValues = {
  fullName: string;
  email: string;
  location: string;
  program: string;
  licenseTrack: string;
  bio?: string;
};

/** Ported from src/routes/edit-profile.tsx, with real validation wired up (see lib/validation.ts). */
export default function EditProfile() {
  const router = useRouter();
  const colors = useColors();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      fullName: "Jordan Ellis",
      email: "jordan.ellis@university.edu",
      location: "Austin, Texas",
      program: "M.Ed. Clinical Mental Health",
      licenseTrack: "LPC-Associate",
      bio: "Second-year counseling student focused on trauma-informed care and group work.",
    },
  });

  return (
    <Screen>
      <ScreenHeader title="Edit profile" subtitle="Keep your details up to date" backTo="/(tabs)/profile" />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1">
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View className="items-center rounded-2xl bg-card p-5" style={shadows.soft}>
            <View className="relative">
              <View className="size-20 items-center justify-center rounded-3xl bg-secondary">
                <Text className="text-xl font-semibold text-primary" style={{ fontFamily: "Poppins_600SemiBold", color: colors.primary }}>
                  JE
                </Text>
              </View>
              <Pressable
                accessibilityLabel="Change photo"
                className="absolute -bottom-1 -right-1 size-8 items-center justify-center rounded-full"
                style={{ backgroundColor: colors.primary }}
              >
                <Camera size={16} color={colors.primaryForeground} strokeWidth={1.8} />
              </Pressable>
            </View>
            <Text className="mt-4 text-center text-xs text-muted-foreground" style={{ color: colors.mutedForeground }}>
              Your photo is only visible to you — reviews stay anonymous.
            </Text>
          </View>

          <View className="mt-6 gap-4">
            <Field control={control} name="fullName" label="Full name" error={errors.fullName?.message} />
            <Field control={control} name="email" label="Email" keyboardType="email-address" error={errors.email?.message} />
            <Field control={control} name="location" label="Location" error={errors.location?.message} />
            <Field control={control} name="program" label="Program" error={errors.program?.message} />
            <Field control={control} name="licenseTrack" label="License track" error={errors.licenseTrack?.message} />

            <View>
              <Label>About you</Label>
              <Controller
                control={control}
                name="bio"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Textarea value={value} onChangeText={onChange} onBlur={onBlur} numberOfLines={4} style={shadows.soft} />
                )}
              />
              {errors.bio ? <FieldError message={errors.bio.message} /> : null}
            </View>

            <View className="gap-3 pt-2">
              <Button size="lg" onPress={handleSubmit(() => router.push("/(tabs)/profile"))}>
                Save changes
              </Button>
              <Button variant="secondary" size="lg" onPress={() => router.push("/(tabs)/profile")}>
                Cancel
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

function Field({
  control,
  name,
  label,
  error,
  keyboardType,
}: {
  control: ReturnType<typeof useForm<FormValues>>["control"];
  name: keyof FormValues;
  label: string;
  error?: string;
  keyboardType?: "default" | "email-address";
}) {
  return (
    <View>
      <Label>{label}</Label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType={keyboardType}
            autoCapitalize={keyboardType === "email-address" ? "none" : "sentences"}
            error={!!error}
          />
        )}
      />
      {error ? <FieldError message={error} /> : null}
    </View>
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
