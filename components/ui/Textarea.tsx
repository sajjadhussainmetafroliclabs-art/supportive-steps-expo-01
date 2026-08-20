import { forwardRef } from "react";
import { TextInput, type TextInputProps } from "react-native";
import { cn } from "@/lib/utils";
import { useColors } from "@/theme/ThemeProvider";

export interface TextareaProps extends TextInputProps {
  className?: string;
}

/** Ported from src/components/ui/textarea.tsx (rendered via shadcn Textarea in review.$id.tsx). */
export const Textarea = forwardRef<TextInput, TextareaProps>(
  ({ className, style, placeholderTextColor, ...props }, ref) => {
    const colors = useColors();
    return (
      <TextInput
        ref={ref}
        multiline
        textAlignVertical="top"
        placeholderTextColor={placeholderTextColor ?? colors.mutedForeground}
        className={cn("rounded-2xl bg-card p-4 text-sm text-foreground", className)}
        style={style}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";
