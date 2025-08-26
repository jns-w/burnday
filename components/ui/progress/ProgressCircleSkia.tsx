import {
  Canvas,
  Group,
  Paint,
  Path,
  Shadow,
  Skia,
  SweepGradient,
  vec,
} from "@shopify/react-native-skia";
import React, { useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import { THEME } from "@/styles/Constants";

interface ProgressCircleProps {
  color: string;
  colors?: string[]; // Optional, not used in this example
  percentage: number; // Value between 0 and 100
  size: number;
  strokeWidth: number;
  trackColor?: string;
  trackOpacity?: number; // Opacity of the track color
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  color = "#0090FF",
  colors = ["#0090FF", "#3d8bb4", "#3d8bb4", "#0090FF"], // Default gradient colors
  percentage = 0,
  size = 100,
  strokeWidth = 10,
  trackColor = THEME.dark.bg2,
  trackOpacity = 0.2,
}) => {
  // Calculate radius and center
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  // Create circular path using Skia
  const path = useMemo(() => {
    const p = Skia.Path.Make();
    p.addCircle(center, center, radius);
    return p;
  }, [radius, center]);

  // Create fixed circular path for the tip
  const tipPath = useMemo(() => {
    const p = Skia.Path.Make();
    const tipRadius = strokeWidth / 2; // Match progress arc thickness
    p.addCircle(center + radius, center, tipRadius); // Positioned at (radius, 0) relative to group origin
    return p;
  }, [center, radius, strokeWidth]);

  // Create rectangular clip path to mask inner half of the tip
  const clipRect = useMemo(() => {
    return Skia.Path.Make().addRect(
      Skia.XYWHRect(
        center + radius - strokeWidth / 2,
        center,
        strokeWidth,
        strokeWidth * 1.05,
      ),
    );
  }, [center, radius, strokeWidth]);

  // Animated progress value
  const progress = useSharedValue(0);
  // const tipStart = useSharedValue(0);
  // const tipEnd = useSharedValue(0);
  const cappedProgress = useSharedValue(0);
  const tipRotation = useSharedValue(0);

  const progressOpacity = useSharedValue(0);
  const tipOpacity = useSharedValue(0);

  useEffect(() => {
    if (percentage > 0) {
      progressOpacity.value = withTiming(1, {
        duration: 600,
        easing: Easing.inOut(Easing.cubic),
      });
      tipOpacity.value = withDelay(
        200,
        withTiming(1, {
          duration: 400,
          easing: Easing.inOut(Easing.cubic),
        }),
      );
    } else {
      progressOpacity.value = withDelay(
        200,
        withTiming(0, {
          duration: 400,
          easing: Easing.inOut(Easing.cubic),
        }),
      );
      tipOpacity.value = withTiming(0, {
        duration: 600,
        easing: Easing.inOut(Easing.cubic),
      });
    }
  }, [percentage, progressOpacity, tipOpacity]);

  // Update progress when percentage changes
  useEffect(() => {
    if (percentage > 0) {
      progress.value = withTiming(percentage / 100, {
        duration: 800,
        easing: Easing.out(Easing.cubic),
      });
      tipRotation.value = withTiming(
        (percentage / 100) * Math.PI * 2, // Convert percentage to radians
        {
          duration: 800,
          easing: Easing.out(Easing.cubic),
        },
      );
      cappedProgress.value = withTiming(Math.min(progress.value, 100), {
        duration: 800,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      progress.value = withTiming(0, {
        duration: 1000,
        easing: Easing.inOut(Easing.cubic),
      });
      tipRotation.value = withTiming(0, {
        duration: 1000,
        easing: Easing.inOut(Easing.cubic),
      });
      cappedProgress.value = withTiming(0, {
        duration: 1000,
        easing: Easing.inOut(Easing.cubic),
      });
    }
  }, [cappedProgress, percentage, progress, tipRotation]);

  const tipTransform = useDerivedValue(() => {
    return [{ rotate: tipRotation.value }];
  });

  const tipGradientTransform = useDerivedValue(() => {
    return [{ rotate: -tipRotation.value }];
  });

  // Gradient colors
  // const gradientColors = [color, "#3d8bb4", "#3d8bb4", color];

  return (
    <View style={[styles.container, { height: size, width: size }]}>
      <Canvas style={styles.canvas}>
        <Group
          origin={{ x: center, y: center }}
          transform={[{ rotate: -Math.PI / 2 }]}
        >
          {/* Background circle */}
          <Path
            color={trackColor}
            end={1}
            opacity={trackOpacity}
            path={path}
            strokeCap="round"
            strokeJoin="round"
            strokeWidth={strokeWidth}
            style="stroke"
          />

          {/* Optional: Add a center circle for better aesthetics */}
          {/*<Path*/}
          {/*  color={color}*/}
          {/*  path={Skia.Path.Make().addCircle(center, center, radius / 2)}*/}
          {/*  style="fill"*/}
          {/*/>*/}

          {/* Tip group, rotated around center */}
          <Group opacity={progressOpacity}>
            {/* Progress circle */}
            <Path
              color={color}
              end={progress}
              path={path}
              strokeCap="round"
              strokeJoin="round"
              strokeWidth={strokeWidth}
              style="stroke"
            >
              <SweepGradient
                c={vec(center, center)}
                colors={colors}
                end={360}
                origin={{ x: center, y: center }}
                start={0}
              />
            </Path>
          </Group>
          <Group
            clip={clipRect}
            opacity={tipOpacity}
            origin={{ x: center, y: center }}
            transform={tipTransform}
          >
            <Path color={color} path={tipPath} style="fill">
              <SweepGradient
                c={vec(center, center)}
                colors={colors}
                end={360}
                origin={{ x: center, y: center }}
                start={0}
                transform={tipGradientTransform}
              />
              <Paint>
                <Shadow blur={5} color="rgba(0, 0, 0, 0.7)" dx={0} dy={0} />
              </Paint>
            </Path>
          </Group>
        </Group>
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProgressCircle;
