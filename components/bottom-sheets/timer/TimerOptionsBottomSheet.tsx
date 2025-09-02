import type BottomSheet from "@gorhom/bottom-sheet";

import { useCallback, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import BottomSheetBase from "@/components/bottom-sheets/BottomSheetBase";
import { COLORS } from "@/styles/Constants";

export default function TimerOptionsBottomSheet() {
  const [isOpen, setIsOpen] = useState(true);
  const drawerRef = useRef<BottomSheet | null>(null);

  const animatedIndex = useSharedValue(0);

  // Handle snap point changes to update open/closed state
  const handleDrawerChanges = useCallback(
    (index: number) => {
      setIsOpen(index >= 0); // Open if index is 0 or higher, closed if -1
      animatedIndex.value = withTiming(index >= 0 ? 1 : 0, { duration: 400 }); // Animate to open/closed state
    },
    [animatedIndex],
  );

  // Open the sheet to a specific snap point
  const openSheet = useCallback(() => {
    drawerRef.current?.snapToIndex(1);
    animatedIndex.value = withTiming(1, { duration: 300 }); // Animate to open state
    setIsOpen(true);
    // Focus the input when the sheet opens
  }, [animatedIndex]);

  // Close the sheet
  const closeSheet = useCallback(() => {
    drawerRef.current?.close(); // Close (sets index to -1)
    animatedIndex.value = withTiming(0, { duration: 300 }); // Animate to closed state
    setIsOpen(false);
  }, [animatedIndex]);

  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animatedIndex.value,
      [0, 1], // Map from bottom sheet's index (0: closed, 1: first snap point)
      [1, 0.95], // Scale range (1: normal, 0.9: scaled down)
      Extrapolation.CLAMP, // Prevent values outside the range
    );
    return {
      transform: [
        {
          scale: scale, // Apply the scale transformation
        },
      ],
    };
  });
  return (
    <BottomSheetBase
      animatedIndex={animatedIndex}
      isOpen={isOpen}
      onClose={closeSheet}
      onHeightChange={handleDrawerChanges}
      openIndex={1}
      ref={drawerRef}
      snapPoints={["20%", "30%"]}
      title="Prompt"
    >
      <BottomSheetBase.MenuButton color={COLORS.error[100]} label={"Reset"} />
    </BottomSheetBase>
  );
}
