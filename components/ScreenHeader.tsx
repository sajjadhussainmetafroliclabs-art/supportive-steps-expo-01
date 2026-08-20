import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import type { ReactNode } from "react";
import { useColors } from "@/theme/ThemeProvider";

/** Ported from src/components/ScreenHeader.tsx. `backTo` navigates via router.push to preserve the original's explicit-destination behavior (vs. router.back()). */
export function ScreenHeader({
  title,
  subtitle,
  backTo,
  action,
}: {
  title: string;
  subtitle?: string;
  backTo?: string;
  action?: ReactNode;
}) {
  const router = useRouter();
  const colors = useColors();

  return (
    <View className="mb-6 flex-row items-start gap-3">
      {backTo ? (
        <Pressable
          onPress={() => router.push(backTo as never)}
          accessibilityLabel="Go back"
          className="mt-1 size-9 shrink-0 items-center justify-center rounded-full bg-secondary"
        >
          <ChevronLeft size={20} color={colors.secondaryForeground} />
        </Pressable>
      ) : null}
      <View className="min-w-0 flex-1">
        <Text
          className="text-2xl leading-tight text-foreground"
          style={{ fontFamily: "Poppins_600SemiBold", color: colors.foreground }}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            className="mt-1 text-sm text-muted-foreground"
            style={{ fontFamily: "Inter_400Regular", color: colors.mutedForeground }}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
      {action}
    </View>
  );
}
