import { Tabs } from "expo-router";
import { Home, Search, Bell, User, Settings } from "lucide-react-native";
import { useColors } from "@/theme/ThemeProvider";

/**
 * Replaces src/components/BottomNav.tsx. The original rendered a custom
 * sticky nav bar inside every screen; Expo Router's tab navigator is the
 * native-idiomatic equivalent and keeps the same 5 destinations, icons,
 * labels and active-state color treatment (primary on secondary bg).
 */
export default function TabsLayout() {
  const colors = useColors();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          height: 64,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontSize: 11, fontFamily: "Inter_500Medium" },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{ title: "Home", tabBarIcon: ({ color, size }) => <Home color={color} size={size} strokeWidth={1.8} /> }}
      />
      <Tabs.Screen
        name="search"
        options={{ title: "Search", tabBarIcon: ({ color, size }) => <Search color={color} size={size} strokeWidth={1.8} /> }}
      />
      <Tabs.Screen
        name="notifications"
        options={{ title: "Alerts", tabBarIcon: ({ color, size }) => <Bell color={color} size={size} strokeWidth={1.8} /> }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", tabBarIcon: ({ color, size }) => <User color={color} size={size} strokeWidth={1.8} /> }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: "Settings", tabBarIcon: ({ color, size }) => <Settings color={color} size={size} strokeWidth={1.8} /> }}
      />
    </Tabs>
  );
}
