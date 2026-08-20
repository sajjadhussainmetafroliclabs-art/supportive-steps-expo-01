/** @type {import('tailwindcss').Config} */
const { lightColors, radii } = require("./theme/tokens");

module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: lightColors.background,
        foreground: lightColors.foreground,
        card: lightColors.card,
        "card-foreground": lightColors.cardForeground,
        primary: lightColors.primary,
        "primary-foreground": lightColors.primaryForeground,
        secondary: lightColors.secondary,
        "secondary-foreground": lightColors.secondaryForeground,
        muted: lightColors.muted,
        "muted-foreground": lightColors.mutedForeground,
        accent: lightColors.accent,
        "accent-foreground": lightColors.accentForeground,
        sage: lightColors.sage,
        "sage-foreground": lightColors.sageForeground,
        beige: lightColors.beige,
        "beige-foreground": lightColors.beigeForeground,
        success: lightColors.success,
        "success-foreground": lightColors.successForeground,
        warning: lightColors.warning,
        "warning-foreground": lightColors.warningForeground,
        destructive: lightColors.destructive,
        "destructive-foreground": lightColors.destructiveForeground,
        border: lightColors.border,
        input: lightColors.input,
        ring: lightColors.ring,
      },
      borderRadius: {
        sm: `${radii.sm}px`,
        md: `${radii.md}px`,
        lg: `${radii.lg}px`,
        xl: `${radii.xl}px`,
        "2xl": `${radii["2xl"]}px`,
        "3xl": `${radii["3xl"]}px`,
        "4xl": `${radii["4xl"]}px`,
      },
      fontFamily: {
        display: ["Poppins_600SemiBold"],
        sans: ["Inter_400Regular"],
      },
    },
  },
  plugins: [],
};
