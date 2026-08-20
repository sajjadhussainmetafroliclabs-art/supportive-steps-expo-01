/**
 * Supportive Steps design tokens.
 *
 * These are a 1:1 conversion of the original web app's oklch tokens
 * (src/styles.css) into hex, since React Native styling needs concrete
 * color values. Do NOT hand-edit these without re-deriving from the
 * source oklch values — see the migration notes for the conversion.
 *
 * Sage green + warm beige, calming healthcare-tech aesthetic.
 */

export const lightColors = {
  background: "#f8f7f4",
  foreground: "#24322b",
  card: "#ffffff",
  cardForeground: "#24322b",
  popover: "#ffffff",
  popoverForeground: "#24322b",

  primary: "#4f6b5a",
  primaryForeground: "#fbfaf7",

  secondary: "#e8ede7",
  secondaryForeground: "#3d5446",

  muted: "#eef0ea",
  mutedForeground: "#6b7280",

  accent: "#e8ede7",
  accentForeground: "#3d5446",

  sage: "#8a9b84",
  sageForeground: "#fbfaf7",

  beige: "#d7c3a0",
  beigeForeground: "#24322b",

  success: "#2e7d32",
  successForeground: "#fbfaf7",
  warning: "#d4a018",
  warningForeground: "#261e0e",
  destructive: "#c62828",
  destructiveForeground: "#fbfaf7",

  border: "#e1e4df",
  input: "#e1e4df",
  ring: "#8a9b84",

  // Named literal used only on the splash screen in the original app
  splashBackground: "#FBF6EF",
} as const;

export const darkColors = {
  background: "#121e18",
  foreground: "#f1f2ee",
  card: "#1d2a23",
  cardForeground: "#f1f2ee",
  popover: "#1d2a23",
  popoverForeground: "#f1f2ee",

  primary: "#8a9b84",
  primaryForeground: "#121e18",

  secondary: "#28372f",
  secondaryForeground: "#f1f2ee",

  muted: "#28372f",
  mutedForeground: "#9ea7a0",

  accent: "#28372f",
  accentForeground: "#f1f2ee",

  // Unchanged from light theme in the original (not redefined in .dark)
  sage: "#8a9b84",
  sageForeground: "#fbfaf7",
  beige: "#d7c3a0",
  beigeForeground: "#24322b",
  success: "#2e7d32",
  successForeground: "#fbfaf7",
  warning: "#d4a018",
  warningForeground: "#261e0e",
  destructive: "#c62828",
  destructiveForeground: "#fbfaf7",

  // Original used translucent white for border/input in dark mode
  border: "rgba(255,255,255,0.12)",
  input: "rgba(255,255,255,0.15)",
  ring: "#8a9b84",

  splashBackground: "#121e18",
} as const;

export const radii = {
  sm: 8, // calc(var(--radius) - 8px) = 16 - 8
  md: 10, // 16 - 6
  lg: 12, // 16 - 4
  xl: 16, // var(--radius)
  "2xl": 24, // 16 + 8
  "3xl": 32, // 16 + 16
  "4xl": 40, // 16 + 24
  full: 9999,
} as const;

export const fonts = {
  display: "Poppins_600SemiBold",
  displayBold: "Poppins_700Bold",
  displayMedium: "Poppins_500Medium",
  sans: "Inter_400Regular",
  sansMedium: "Inter_500Medium",
  sansSemiBold: "Inter_600SemiBold",
} as const;

export const shadows = {
  soft: {
    shadowColor: "#264033",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  lift: {
    shadowColor: "#264033",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 6,
  },
} as const;

export type ThemeColors = { [K in keyof typeof lightColors]: string };
