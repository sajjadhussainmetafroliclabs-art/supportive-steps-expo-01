import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Check } from "lucide-react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Screen } from "@/components/Screen";
import { Button } from "@/components/ui/Button";
import { useColors } from "@/theme/ThemeProvider";

/** Ported from src/routes/password-updated.tsx. */
export default function PasswordUpdated() {
  const router = useRouter();
  const colors = useColors();

  return (
    <Screen className="items-center justify-center">
      <Animated.View entering={FadeInUp.duration(500)} className="items-center">
        <View className="size-32 items-center justify-center rounded-full" style={{ backgroundColor: colors.success }}>
          <Check size={56} color={colors.successForeground} strokeWidth={2.5} />
        </View>
        <Text className="mt-8 text-2xl text-foreground" style={{ fontFamily: "Poppins_600SemiBold", color: colors.foreground }}>
          Password updated
        </Text>
        <Text className="mt-3 max-w-[19rem] text-center text-sm leading-relaxed text-muted-foreground" style={{ color: colors.mutedForeground }}>
          Your password has been changed successfully. Use it next time you log in.
        </Text>
      </Animated.View>

      <Button size="lg" className="mt-10 w-full" onPress={() => router.push("/auth")}>
        Back to login
      </Button>
    </Screen>
  );
}
