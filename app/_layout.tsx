import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ThemeProvider } from "@/context/ThemeContext";

// noinspection JSUnusedGlobalSymbols
export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "Inter-Bold": Inter_700Bold,
    "Inter-Medium": Inter_500Medium,
    "Inter-Regular": Inter_400Regular,
    "Inter-SemiBold": Inter_600SemiBold,
    "Poppins-SemiBold": Poppins_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen once fonts are loaded or if there's an error
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  return (
    <GestureHandlerRootView>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name={"(tabs)"} options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
