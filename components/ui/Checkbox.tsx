import { Pressable } from "react-native";
import { Check } from "lucide-react-native";
import { cn } from "@/lib/utils";
import { useColors } from "@/theme/ThemeProvider";

export interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
  id?: string;
}

/** Ported from src/components/ui/checkbox.tsx (Radix Checkbox), used in terms.tsx. */
export function Checkbox({ checked, onCheckedChange, className }: CheckboxProps) {
  const colors = useColors();

  return (
    <Pressable
      onPress={() => onCheckedChange(!checked)}
      className={cn(
        "size-5 items-center justify-center rounded-md border",
        checked ? "bg-primary border-primary" : "bg-card border-input",
        className,
      )}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
    >
      {checked ? <Check size={12} color={colors.primaryForeground} strokeWidth={3} /> : null}
    </Pressable>
  );
}
