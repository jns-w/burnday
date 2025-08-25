import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <ThemeProvider>
        <Stack />;
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
