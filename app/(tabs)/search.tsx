import { useMemo, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { Search as SearchIcon, SlidersHorizontal } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { SupervisorCard } from "@/components/SupervisorCard";
import { Input } from "@/components/ui/Input";
import { useColors } from "@/theme/ThemeProvider";
import { shadows } from "@/theme/tokens";
import { licenseTypes, specialties, states, supervisors } from "@/lib/data";

type Filters = { state?: string; specialty?: string; licenseType?: string };

/** Ported from src/routes/search.tsx. Same filter/search logic. */
export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({});
  const colors = useColors();

  const results = useMemo(
    () =>
      supervisors.filter((s) => {
        const q = query.trim().toLowerCase();
        const matchesQuery =
          !q || s.name.toLowerCase().includes(q) || s.specialty.toLowerCase().includes(q) || s.city.toLowerCase().includes(q);
        return (
          matchesQuery &&
          (!filters.state || s.state === filters.state) &&
          (!filters.specialty || s.specialty === filters.specialty) &&
          (!filters.licenseType || s.licenseType === filters.licenseType)
        );
      }),
    [query, filters],
  );

  const toggle = (key: keyof Filters, value: string) =>
    setFilters((p) => ({ ...p, [key]: p[key] === value ? undefined : value }));

  return (
    <Screen padded={false}>
      <View className="px-5 pt-2">
        <ScreenHeader title="Find a supervisor" subtitle="Verified supervisors, reviewed by peers." />

        <View className="relative">
          <View className="absolute left-4 top-1/2 z-10 -translate-y-1/2">
            <SearchIcon size={16} color={colors.mutedForeground} />
          </View>
          <Input value={query} onChangeText={setQuery} placeholder="Name, specialty or city" className="pl-11" />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingTop: 0 }}>
        <View className="mt-5 gap-4">
          <FilterRow label="State" options={states} active={filters.state} onSelect={(v) => toggle("state", v)} />
          <FilterRow label="Specialty" options={specialties} active={filters.specialty} onSelect={(v) => toggle("specialty", v)} />
          <FilterRow label="License type" options={licenseTypes} active={filters.licenseType} onSelect={(v) => toggle("licenseType", v)} />
        </View>

        <View className="mt-6 flex-row items-center justify-between">
          <Text className="text-base text-foreground" style={{ color: colors.foreground }}>
            {results.length} supervisors
          </Text>
          <View className="flex-row items-center gap-1">
            <SlidersHorizontal size={14} color={colors.mutedForeground} />
            <Text className="text-xs text-muted-foreground" style={{ color: colors.mutedForeground }}>
              Sorted by rating
            </Text>
          </View>
        </View>

        <View className="mt-3 gap-3">
          {results.length ? (
            results
              .slice()
              .sort((a, b) => b.rating - a.rating)
              .map((s) => <SupervisorCard key={s.id} supervisor={s} />)
          ) : (
            <View className="rounded-2xl bg-card p-6" style={shadows.soft}>
              <Text className="text-center text-sm text-muted-foreground" style={{ color: colors.mutedForeground }}>
                No supervisors match these filters yet.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}

function FilterRow({
  label,
  options,
  active,
  onSelect,
}: {
  label: string;
  options: string[];
  active?: string;
  onSelect: (v: string) => void;
}) {
  const colors = useColors();
  return (
    <View>
      <Text className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground" style={{ color: colors.mutedForeground }}>
        {label}
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {options.map((o) => {
          const isActive = active === o;
          return (
            <Pressable
              key={o}
              onPress={() => onSelect(o)}
              className="rounded-full px-3.5 py-1.5"
              style={[!isActive && shadows.soft, { backgroundColor: isActive ? colors.primary : colors.card }]}
            >
              <Text
                className="text-xs font-medium"
                style={{ color: isActive ? colors.primaryForeground : colors.mutedForeground }}
              >
                {o}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
