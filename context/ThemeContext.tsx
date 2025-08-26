import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { StatusBar } from "react-native";

import { type Theme, THEME, type ThemeName } from "@/styles/Constants";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>("light");

  function toggleTheme() {
    setThemeName((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }

  useEffect(() => {
    if (themeName === "light") {
      StatusBar.setBarStyle("dark-content");
    } else {
      StatusBar.setBarStyle("light-content");
    }
  }, [themeName]);

  return (
    <ThemeContext.Provider
      value={{
        theme: THEME[themeName],
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
