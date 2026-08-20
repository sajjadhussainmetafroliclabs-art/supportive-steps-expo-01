import { View, Text } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { useColors } from "@/theme/ThemeProvider";
import { cn } from "@/lib/utils";

/**
 * NOTE ON ASSETS: the original web app's Logo/LogoLockup rendered PNGs
 * (`src/assets/logo.png.asset.json`, `mark.png.asset.json`) that pointed to
 * Lovable's CDN — the actual binary files are not part of the repository,
 * so they can't be bundled as-is. This is an SVG recreation of the brand
 * mark using the same design tokens (sage/beige), so the app is fully
 * self-contained. Swap in the real exported PNGs via `expo-image` /
 * `Image` when available — the component API below won't need to change.
 */

/** Supportive Steps brand mark (emblem only). */
export function Logo({ className, size = 64 }: { className?: string; size?: number }) {
  const colors = useColors();

  return (
    <View className={cn("items-center justify-center", className)} style={{ width: size, height: size }}>
      <Svg viewBox="0 0 64 64" width={size} height={size}>
        <Circle cx="32" cy="32" r="31" fill={colors.secondary} />
        <Path
          d="M32 14c-6 0-10 4.2-10 9.6 0 4.3 2.7 6.9 6.6 9.3l2.5 1.5c2.9 1.8 4.3 3 4.3 5.1 0 2.4-1.9 4-4.9 4-3 0-5.3-1.5-6.6-4.1l-3.9 2.3C21.4 46.1 25.4 49 30.8 49c6.1 0 10.6-3.7 10.6-9.2 0-4.6-2.6-7-6.8-9.5l-2.5-1.5c-2.7-1.6-4-2.9-4-4.8 0-2.1 1.7-3.5 4.1-3.5 2.3 0 3.9 1.1 5.1 3.2l3.8-2.5C39.9 17.3 36.6 14 32 14z"
          fill={colors.primary}
        />
      </Svg>
    </View>
  );
}

/** Full brand lockup: emblem + wordmark + tagline. */
export function LogoLockup({ className }: { className?: string }) {
  const colors = useColors();

  return (
    <View className={cn("items-center", className)}>
      <Logo size={72} />
      <Text
        className="mt-4 text-center text-2xl text-foreground"
        style={{ fontFamily: "Poppins_700Bold", color: colors.foreground }}
      >
        Supportive Steps
      </Text>
      <Text
        className="mt-1 text-center text-xs text-muted-foreground"
        style={{ fontFamily: "Inter_400Regular", color: colors.mutedForeground }}
      >
        Empowering Future Counselors Through Trusted Support
      </Text>
    </View>
  );
}
