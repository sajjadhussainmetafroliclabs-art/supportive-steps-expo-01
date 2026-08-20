import { View, Text, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck, Upload } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useColors } from "@/theme/ThemeProvider";
import { verificationSchema } from "@/lib/validation";

type FormValues = { universityEmail?: string; license?: string };

/** Ported from src/routes/verification.tsx. */
export default function Verification() {
  const router = useRouter();
  const colors = useColors();

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: { universityEmail: "", license: "" },
  });

  return (
    <Screen>
      <ScreenHeader backTo="/role" title="Verification" subtitle="We verify every member so reviews stay credible." />

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="mb-6 flex-row items-start gap-3 rounded-2xl bg-secondary p-4">
          <ShieldCheck size={20} color={colors.primary} style={{ marginTop: 2 }} />
          <Text className="flex-1 text-xs leading-relaxed text-secondary-foreground" style={{ color: colors.secondaryForeground }}>
            Verification details are used only to confirm eligibility. They are never published or
            linked to any review you write.
          </Text>
        </View>

        <View className="gap-5">
          <View>
            <Label>University email</Label>
            <Controller
              control={control}
              name="universityEmail"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="jordan.ellis@university.edu"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </View>
          <View>
            <Label>License number</Label>
            <Controller
              control={control}
              name="license"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input placeholder="LPC-A 84102" value={value} onChangeText={onChange} onBlur={onBlur} />
              )}
            />
          </View>

          <UploadField label="Student ID" hint="JPG or PDF, optional" />
          <UploadField label="License proof" hint="JPG or PDF, optional" />
        </View>
      </ScrollView>

      <Button size="lg" className="mt-4" onPress={handleSubmit(() => router.push("/terms"))}>
        Submit for review
      </Button>
    </Screen>
  );
}

function UploadField({ label, hint }: { label: string; hint: string }) {
  const colors = useColors();
  return (
    <View>
      <Label>{label}</Label>
      <Pressable
        className="flex-row items-center gap-3 rounded-xl border border-dashed p-4"
        style={{ borderColor: colors.border, backgroundColor: colors.card }}
      >
        <View className="size-10 items-center justify-center rounded-lg bg-secondary">
          <Upload size={16} color={colors.primary} />
        </View>
        <View>
          <Text className="text-sm font-medium text-foreground" style={{ color: colors.foreground }}>
            Upload {label.toLowerCase()}
          </Text>
          <Text className="text-xs text-muted-foreground" style={{ color: colors.mutedForeground }}>
            {hint}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
