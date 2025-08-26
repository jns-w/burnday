import {
  Canvas,
  LinearGradient,
  RoundedRect,
  vec,
} from "@shopify/react-native-skia";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { useSharedValue, withSpring } from "react-native-reanimated";

interface ProgressBarProps {
  borderRadius?: number; // Border radius for rounded corners
  colors: string[]; // Optional override for gradient colors
  height: number; // Height of the progress bar
  progress: number; // Progress percentage (0 to 100)
  style?: ViewStyle; // Container style
  trackColor?: string; // Background track color
  trackOpacity?: number; // Opacity of the track color
  width?: number; // Width of the progress bar
}

export default function ProgressBar(props: ProgressBarProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const progressWidth = useSharedValue((props.progress / 100) * containerWidth);

  useEffect(() => {
    progressWidth.value = withSpring((props.progress / 100) * containerWidth, {
      damping: 30,
      mass: 1,
      stiffness: 200,
    });
  }, [containerWidth, progressWidth, props.progress]);

  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
    // Initialize progressWidth when the container width is set
    progressWidth.value = (props.progress / 100) * containerWidth;
  };

  return (
    <View
      onLayout={handleLayout}
      style={[
        styles.container,
        { borderRadius: props.borderRadius, height: props.height },
      ]}
    >
      <Canvas style={styles.canvas}>
        <RoundedRect
          color={props.trackColor}
          height={props.height}
          r={props.borderRadius}
          width={containerWidth}
          x={0}
          y={0}
        />
        <RoundedRect
          height={props.height}
          r={props.borderRadius}
          width={progressWidth}
          x={0}
          y={0}
        >
          <LinearGradient
            colors={[props.colors[0], props.colors[1]]}
            end={vec(containerWidth, 0)}
            start={vec(0, 0)}
          />
        </RoundedRect>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    width: "100%",
  },
});
