import { useState } from "react";
import { Switch as RNSwitch, type SwitchProps as RNSwitchProps } from "react-native";
import { useColors } from "@/theme/ThemeProvider";

export interface SwitchProps extends Omit<RNSwitchProps, "value" | "onValueChange"> {
  defaultChecked?: boolean;
  checked?: boolean;
  onCheckedChange?: (value: boolean) => void;
}

/**
 * Ported from src/components/ui/switch.tsx (Radix Switch). RN's Switch has
 * no native "defaultValue" concept, so uncontrolled usage (as settings.tsx
 * relies on) is reproduced with local state that falls back when `checked`
 * isn't passed in.
 */
export function Switch({ defaultChecked, checked, onCheckedChange, ...props }: SwitchProps) {
  const colors = useColors();
  const [internal, setInternal] = useState(defaultChecked ?? false);
  const isControlled = checked !== undefined;
  const value = isControlled ? checked : internal;

  const handleChange = (next: boolean) => {
    if (!isControlled) setInternal(next);
    onCheckedChange?.(next);
  };

  return (
    <RNSwitch
      value={value}
      onValueChange={handleChange}
      trackColor={{ false: colors.border, true: colors.primary }}
      thumbColor={colors.card}
      ios_backgroundColor={colors.border}
      {...props}
    />
  );
}
