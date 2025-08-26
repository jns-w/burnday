import { Pressable, StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/context/ThemeContext";
import { COLORS, type Theme, TYPOGRAPHY } from "@/styles/Constants";

// noinspection JSUnusedGlobalSymbols
export default function Home() {
  const { theme, toggleTheme } = useTheme();

  const styles = createThemedStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.introText}>app/index.tsx</Text>
      <Pressable onPress={() => toggleTheme()}>
        <Text style={styles.swapBtn}>
          {theme.name === "light" ? "go dark" : "go light"}
        </Text>
      </Pressable>
    </View>
  );
}

function createThemedStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: theme.bg1,
      flex: 1,
      justifyContent: "center",
    },
    introText: {
      ...TYPOGRAPHY.bodyL,
      color: theme.text,
    },
    swapBtn: {
      color: theme.name === "light" ? COLORS.sky[300] : COLORS.primary[200],
    },
  });
}
