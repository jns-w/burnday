import { Moon, Sun } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/context/ThemeContext";
import { COLORS, type Theme, TYPOGRAPHY } from "@/styles/Constants";
import { scale } from "@/utils/Display";

export default function SettingsTab() {
  const { theme, toggleTheme } = useTheme();

  const styles = createThemedStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>app/(tabs)/settings/index.tsx</Text>
      <Pressable onPress={() => toggleTheme()}>
        <View style={styles.themeToggleBtn}>
          {theme.name === "light" ? (
            <Moon
              color={COLORS.sky[300]}
              size={scale(18)}
              strokeWidth={scale(1.5)}
            />
          ) : (
            <Sun
              color={COLORS.primary[200]}
              size={scale(18)}
              strokeWidth={scale(1.5)}
            />
          )}
        </View>
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
    text: {
      ...TYPOGRAPHY.bodyL,
      color: theme.text,
    },
    themeToggleBtn: {
      borderColor:
        theme.name === "light" ? COLORS.sky[300] : COLORS.primary[200],
      borderRadius: scale(8),
      borderWidth: scale(1),
      margin: scale(5),
      padding: scale(3),
    },
  });
}
