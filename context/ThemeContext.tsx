import React, { createContext, ReactNode, useContext, useState } from "react";

import { type Theme, THEME, type ThemeName } from "@/styles/Constants";

interface ThemeContextType {
  theme: Theme;
  themeName: ThemeName;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>("dark");

  function toggleTheme() {
    setThemeName((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider
      value={{
        theme: THEME[themeName],
        themeName,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context: any = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
