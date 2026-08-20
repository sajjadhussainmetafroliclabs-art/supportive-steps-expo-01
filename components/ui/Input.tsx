import { forwardRef } from "react";
import { TextInput, type TextInputProps } from "react-native";
import { cn } from "@/lib/utils";
import { useColors } from "@/theme/ThemeProvider";

export interface InputProps extends TextInputProps {
  className?: string;
  error?: boolean;
}

/** Ported from src/components/ui/input.tsx. Same 12-height / rounded-xl look used across the app's forms. */
export const Input = forwardRef<TextInput, InputProps>(
  ({ className, style, error, placeholderTextColor, ...props }, ref) => {
    const colors = useColors();
    return (
      <TextInput
        ref={ref}
        placeholderTextColor={placeholderTextColor ?? colors.mutedForeground}
        className={cn(
          "h-12 rounded-xl border bg-card px-4 text-sm text-foreground",
          error ? "border-destructive" : "border-input",
          className,
        )}
        style={style}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
