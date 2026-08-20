import { View, Pressable } from "react-native";
import { Star } from "lucide-react-native";
import { useColors } from "@/theme/ThemeProvider";

/** Ported from src/components/StarRating.tsx. */
export function StarRating({
  value,
  size = "sm",
  onChange,
}: {
  value: number;
  size?: "sm" | "lg";
  onChange?: (v: number) => void;
}) {
  const colors = useColors();
  const px = size === "lg" ? 36 : 16;

  return (
    <View className="flex-row items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= Math.round(value);
        const star = (
          <Star
            size={px}
            color={filled ? colors.beige : colors.border}
            fill={filled ? colors.beige : "transparent"}
            strokeWidth={1.5}
          />
        );
        return onChange ? (
          <Pressable key={n} accessibilityLabel={`${n} stars`} onPress={() => onChange(n)}>
            {star}
          </Pressable>
        ) : (
          <View key={n}>{star}</View>
        );
      })}
    </View>
  );
}
