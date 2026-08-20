import { forwardRef } from "react";
import { Pressable, Text, type PressableProps, type GestureResponderEvent } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Ported from the web app's shadcn/ui Button (src/components/ui/button.tsx).
 * Same variant/size matrix and same default look. `asChild` doesn't apply in
 * RN (there's no Radix Slot) — screens instead wrap navigation in onPress.
 */
const buttonVariants = cva(
  "flex-row items-center justify-center gap-2 rounded-md active:opacity-80 disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary",
        destructive: "bg-destructive",
        outline: "border border-input bg-background",
        secondary: "bg-secondary",
        ghost: "bg-transparent",
        link: "bg-transparent",
      },
      size: {
        default: "h-9 px-4",
        sm: "h-8 rounded-md px-3",
        lg: "h-13 rounded-xl px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const textVariants = cva("text-sm font-medium font-display", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      destructive: "text-destructive-foreground",
      outline: "text-foreground",
      secondary: "text-secondary-foreground",
      ghost: "text-foreground",
      link: "text-primary underline",
    },
    size: {
      default: "text-sm",
      sm: "text-xs",
      lg: "text-sm",
      icon: "text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends Omit<PressableProps, "children">,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  className?: string;
  textClassName?: string;
  loading?: boolean;
}

export const Button = forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ className, textClassName, variant, size, children, disabled, onPress, ...props }, ref) => {
    const handlePress = (e: GestureResponderEvent) => {
      if (disabled) return;
      onPress?.(e);
    };

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        disabled={disabled ?? false}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {typeof children === "string" ? (
          <Text className={cn(textVariants({ variant, size }), textClassName)}>{children}</Text>
        ) : (
          children
        )}
      </Pressable>
    );
  },
);
Button.displayName = "Button";

export { buttonVariants, textVariants };
