import type { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { cn } from "@/lib/utils";
import { useColors } from "@/theme/ThemeProvider";

/**
 * Replaces PhoneFrame from the original web app. PhoneFrame simulated a
 * mobile viewport (max-width 430px, centered) inside a desktop browser
 * window — on native the device itself is already that viewport, so this
 * becomes a plain safe-area + padding container. `padded` / `className`
 * keep the same defaults the original screens relied on.
 */
export function Screen({
  children,
  className,
  padded = true,
  backgroundColor,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
  backgroundColor?: string;
}) {
  const colors = useColors();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: backgroundColor ?? colors.background }}
      edges={["top", "bottom"]}
    >
      <View className={cn("flex-1", padded && "px-5 pb-4 pt-2", className)}>{children}</View>
    </SafeAreaView>
  );
}
