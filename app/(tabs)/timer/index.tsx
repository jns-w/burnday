import { StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/context/ThemeContext";
import { Theme } from "@/styles/Constants";

// noinspection JSUnusedGlobalSymbols
export default function TimerScreen() {
  const { theme } = useTheme();
  const styles = createThemedStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Timer</Text>
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
      color: theme.text,
    },
  });
}
