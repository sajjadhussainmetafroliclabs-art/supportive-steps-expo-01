import { Text, type TextProps } from "react-native";
import { cn } from "@/lib/utils";

export interface LabelProps extends TextProps {
  className?: string;
}

/** Ported from src/components/ui/label.tsx. */
export function Label({ className, children, ...props }: LabelProps) {
  return (
    <Text className={cn("mb-1.5 text-xs font-medium text-muted-foreground", className)} {...props}>
      {children}
    </Text>
  );
}
