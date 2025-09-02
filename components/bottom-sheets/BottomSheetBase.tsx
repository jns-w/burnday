import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { forwardRef, ReactNode } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedKeyboard,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { useTheme } from "@/context/ThemeContext";
import {
  SPACING,
  THEME,
  type Theme,
  TYPOGRAPHY,
  UTILS,
} from "@/styles/Constants";
import { scale } from "@/utils/Display";

interface BottomSheetBaseProps {
  animatedIndex: SharedValue<number>;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  onHeightChange?: (height: number) => void;
  openIndex?: number; // Optional prop to control the open index
  ref: any;
  snapPoints?: string[];
  title?: string;
}

interface MenuButtonProps {
  color?: string;
  label: string;
}

export default function BottomSheetBase({
  animatedIndex,
  children,
  isOpen,
  onClose,
  onHeightChange,
  openIndex = 1, // Default to open index 1
  ref,
  snapPoints,
  title,
}: BottomSheetBaseProps) {
  const { theme } = useTheme();
  const styles = createThemedStyles(theme);
  return (
    <BottomSheet
      animatedIndex={animatedIndex}
      // android_keyboardInputMode="adjustResize" // For Android compatibility
      // animationConfigs={{ duration: 350 }} // Faster animation for smoother UX
      backdropComponent={() => (
        <Backdrop animatedIndex={animatedIndex} isOpen={isOpen} />
      )}
      backgroundStyle={{
        backgroundColor: "transparent",
      }}
      enableBlurKeyboardOnGesture={true}
      enableDynamicSizing={false}
      enablePanDownToClose={true}
      handleIndicatorStyle={{
        backgroundColor: theme.inactive,
        width: 50,
      }}
      index={isOpen ? openIndex : -1}
      keyboardBehavior="extend"
      keyboardBlurBehavior="restore"
      onClose={onClose}
      ref={ref}
      snapPoints={snapPoints}
      style={styles.container}
    >
      <BottomSheetView style={styles.content}>{children}</BottomSheetView>
    </BottomSheet>
  );
}

function Backdrop({
  animatedIndex,
  isOpen,
}: {
  animatedIndex: SharedValue<number>;
  isOpen?: boolean;
}) {
  const { theme } = useTheme();
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        animatedIndex.value,
        [0, 1], // Assuming 0 is closed and 1 is open
        [0, 1], // Opacity range from 0 (closed) to 1 (open)
        Extrapolation.CLAMP, // Prevents values outside the range
      ),
    };
  });

  return (
    <Animated.View
      style={[
        {
          ...StyleSheet.absoluteFillObject,
        },
        animatedStyle,
      ]}
    >
      <BlurView
        intensity={30}
        style={{ ...StyleSheet.absoluteFillObject, zIndex: 5 }}
        tint={theme.name === "light" ? "light" : "dark"}
      />
    </Animated.View>
  );
}

function MenuButton({ color, label }: MenuButtonProps) {
  const { theme } = useTheme();
  return (
    <Pressable
      style={{
        alignItems: "center",
        height: "100%",
        justifyContent: "center",
        paddingVertical: scale(10),
        width: "100%",
      }}
    >
      <Text
        style={{
          color: color ? color : theme.text,
          ...TYPOGRAPHY.bodyL,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

BottomSheetBase.MenuButton = MenuButton;

function createThemedStyles(theme: Theme) {
  return StyleSheet.create({
    button: {
      height: "100%",
      width: "100%",
    },
    container: {
      backgroundColor: theme.bg2,
      borderRadius: scale(20),
      flex: 1,
      overflow: "hidden",
      width: "100%",
      zIndex: 10,
    },
    content: {
      flex: 1,
      padding: SPACING.xs,
      ...UTILS.center,
    },
  });
}
