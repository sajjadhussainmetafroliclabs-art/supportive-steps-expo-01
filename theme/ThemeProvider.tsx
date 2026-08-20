import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useColorScheme } from "react-native";
import { darkColors, lightColors, type ThemeColors } from "./tokens";

const ThemeContext = createContext<ThemeColors>(lightColors);

/**
 * Provides resolved color tokens based on the device color scheme.
 * Mirrors the original app's `:root` / `.dark` token split in styles.css.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const scheme = useColorScheme();
  const colors = useMemo(() => (scheme === "dark" ? darkColors : lightColors), [scheme]);

  return <ThemeContext.Provider value={colors}>{children}</ThemeContext.Provider>;
}

export function useColors() {
  return useContext(ThemeContext);
}
