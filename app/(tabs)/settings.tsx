import type { ReactNode } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Bell, ChevronRight, HelpCircle, KeyRound, LogOut, ShieldCheck, Trash2, type LucideIcon } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Switch } from "@/components/ui/Switch";
import { useColors } from "@/theme/ThemeProvider";
import { shadows } from "@/theme/tokens";

/** Ported from src/routes/settings.tsx. */
export default function Settings() {
  const router = useRouter();
  const colors = useColors();

  return (
    <Screen padded={false}>
      <View className="px-5 pt-2">
        <ScreenHeader title="Settings" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingTop: 0 }}>
        <Group title="Privacy">
          <ToggleRow icon={ShieldCheck} label="Hide my activity" detail="Keep saved supervisors private" defaultChecked />
          <ToggleRow icon={ShieldCheck} label="Anonymous by default" detail="Always publish reviews anonymously" defaultChecked />
        </Group>

        <Group title="Account">
          <LinkRow icon={KeyRound} label="Change password" onPress={() => router.push("/change-password")} />
          <LinkRow icon={Bell} label="Notification preferences" />
          <LinkRow icon={HelpCircle} label="Help center" />
        </Group>

        <Group title="Notifications">
          <ToggleRow icon={Bell} label="Review approvals" detail="Push + email" defaultChecked />
          <ToggleRow icon={Bell} label="Product updates" detail="Occasional emails" />
        </Group>

        <View className="mt-6 gap-3">
          <Pressable
            onPress={() => router.push("/auth")}
            className="flex-row items-center justify-center gap-2 rounded-xl bg-card py-4"
            style={shadows.soft}
          >
            <LogOut size={16} color={colors.foreground} />
            <Text className="text-sm font-semibold" style={{ fontFamily: "Poppins_600SemiBold", color: colors.foreground }}>
              Log out
            </Text>
          </Pressable>
          <Pressable
            className="flex-row items-center justify-center gap-2 rounded-xl py-4"
            style={{ backgroundColor: `${colors.destructive}1A` }}
          >
            <Trash2 size={16} color={colors.destructive} />
            <Text className="text-sm font-semibold" style={{ fontFamily: "Poppins_600SemiBold", color: colors.destructive }}>
              Delete account
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  const colors = useColors();
  return (
    <View className="mt-6 first:mt-0">
      <Text className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground" style={{ color: colors.mutedForeground }}>
        {title}
      </Text>
      <View className="overflow-hidden rounded-2xl bg-card" style={shadows.soft}>
        {children}
      </View>
    </View>
  );
}

function ToggleRow({
  icon: Icon,
  label,
  detail,
  defaultChecked,
}: {
  icon: LucideIcon;
  label: string;
  detail: string;
  defaultChecked?: boolean;
}) {
  const colors = useColors();
  return (
    <View className="flex-row items-center gap-3 p-4" style={{ borderBottomWidth: 1, borderBottomColor: colors.border }}>
      <View className="size-9 shrink-0 items-center justify-center rounded-xl bg-secondary">
        <Icon size={16} color={colors.primary} strokeWidth={1.8} />
      </View>
      <View className="min-w-0 flex-1">
        <Text className="text-sm font-medium text-foreground" style={{ color: colors.foreground }}>
          {label}
        </Text>
        <Text className="text-xs text-muted-foreground" style={{ color: colors.mutedForeground }}>
          {detail}
        </Text>
      </View>
      <Switch defaultChecked={defaultChecked} />
    </View>
  );
}

function LinkRow({ icon: Icon, label, onPress }: { icon: LucideIcon; label: string; onPress?: () => void }) {
  const colors = useColors();
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-3 p-4"
      style={{ borderBottomWidth: 1, borderBottomColor: colors.border }}
    >
      <View className="size-9 shrink-0 items-center justify-center rounded-xl bg-secondary">
        <Icon size={16} color={colors.primary} strokeWidth={1.8} />
      </View>
      <Text className="flex-1 text-sm font-medium text-foreground" style={{ color: colors.foreground }}>
        {label}
      </Text>
      <ChevronRight size={16} color={colors.mutedForeground} />
    </Pressable>
  );
}
