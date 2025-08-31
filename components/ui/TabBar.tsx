import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/context/ThemeContext";
import { Theme } from "@/styles/Constants";
import { scale } from "@/utils/Display";

interface TabBarProps {
  descriptors: any;
  navigation: any;
  state: TabNavigationState<ParamListBase>;
}

export default function TabBar({
  descriptors,
  navigation,
  state,
}: TabBarProps) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const styles = createThemedStyle(theme);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <BlurView
        intensity={100}
        style={{ ...StyleSheet.absoluteFillObject, position: "absolute" }}
        tint={theme.name === "light" ? "light" : "dark"}
      />
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            canPreventDefault: true,
            target: route.key,
            type: "tabPress",
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onPressIn = async () => {
          // Add any haptic feedback or additional functionality here if needed
          if (process.env.EXPO_OS === "ios") {
            // Add a soft haptic feedback when pressing down on the tabs.
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
        };

        return (
          <TouchableOpacity
            activeOpacity={1}
            key={route.key}
            onPress={onPress}
            onPressIn={onPressIn}
            style={{
              alignItems: "center",
              flex: 1,
              gap: scale(2),
              padding: scale(10),
            }}
          >
            {options.tabBarIcon &&
              options.tabBarIcon({
                color: isFocused ? theme.primary : theme.inactive,
                size: 25,
              })}
            <Text
              style={{
                color: isFocused ? theme.primary : theme.inactive,
                fontSize: scale(10),
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function createThemedStyle(theme: Theme) {
  return StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: "transparent",
      borderTopColor: theme.border,
      borderTopWidth: 1,
      bottom: 0,
      color: "transparent",
      flexDirection: "row",
      height: scale(80),
      justifyContent: "space-around",
      position: "absolute",
      width: "100%",
    },
  });
}
