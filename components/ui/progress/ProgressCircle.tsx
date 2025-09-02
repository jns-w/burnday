import {
  Canvas,
  Group,
  interpolateColors,
  LinearGradient,
  Paint,
  Path,
  PathOp,
  Shadow,
  Skia,
  SweepGradient,
  vec,
} from "@shopify/react-native-skia";
import React, { JSX, useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { THEME } from "@/styles/Constants";
import { darken, hexToRGBA, scale } from "@/utils/Display";

interface ProgressCircleProps {
  color: string;
  colors?: string[]; // Optional, not used in this example
  middleCircle?: boolean;
  middleCircleColor?: string;
  percentage: number; // Value between 0 and 100
  size: number;
  strokeWidth: number;
  trackColor?: string;
  trackOpacity?: number; // Opacity of the track color
}

function ProgressCircle({
  color = "#0090FF",
  colors = ["#0090FF", "#3d8bb4", "#3d8bb4", "#0090FF"], // Default gradient colors
  middleCircleColor = "#bebebe",
  percentage = 0,
  size = 100,
  strokeWidth = 10,
  trackColor = THEME.dark.bg2,
  trackOpacity = 0.2,
}: ProgressCircleProps): JSX.Element {
  // Calculate radius and center
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  // Create circular path using Skia
  const trackPath = useMemo(() => {
    const p = Skia.Path.Make();
    p.addCircle(center, center, radius);
    return p;
  }, [radius, center]);

  // Create fixed circular path for the front tip of progress
  const tipPath = useMemo(() => {
    const p = Skia.Path.Make();
    const tipRadius = strokeWidth / 2; // Match progress arc thickness
    p.addCircle(center + radius, center, tipRadius); // Positioned at (radius, 0) relative to group origin
    return p;
  }, [center, radius, strokeWidth]);

  const tipShadowClip = useMemo(() => {
    // create rectangle path for front half of tip
    const p = Skia.Path.Make();
    p.addRect(
      Skia.XYWHRect(
        center + radius - strokeWidth / 2,
        center,
        strokeWidth,
        strokeWidth * 1.05,
      ),
    );
    // remove tip shape from rectangle using a circle
    const circleClip = Skia.Path.Make();
    const tipRadius = strokeWidth / 2;
    circleClip.addCircle(center + radius, center, tipRadius);
    p.op(circleClip, PathOp.Difference);

    return p;
  }, [center, radius, strokeWidth]);

  const backTipPath = useMemo(() => {
    const p = Skia.Path.Make();
    const tipRadius = strokeWidth / 2;
    p.addCircle(center + radius, center, tipRadius);
    return p;
  }, [center, radius, strokeWidth]);

  const backTipShadowClip = useMemo(() => {
    // create rectangle path for front half of tip
    const p = Skia.Path.Make();
    p.addRect(
      Skia.XYWHRect(
        center + radius - strokeWidth / 2,
        center - strokeWidth,
        strokeWidth,
        strokeWidth * 1.05,
      ),
    );
    // remove tip shape from rectangle using a circle
    const circleClip = Skia.Path.Make();
    const tipRadius = strokeWidth / 2;
    circleClip.addCircle(center + radius, center, tipRadius);
    p.op(circleClip, PathOp.Difference);

    return p;
  }, [center, radius, strokeWidth]);

  // Animated progress value
  const progress = useSharedValue(0);
  const cappedProgress = useSharedValue(0);
  const tipRotation = useSharedValue(0);
  const progressOpacity = useSharedValue(0);

  // color handling
  const prevColor = useSharedValue(middleCircleColor);
  const targetColor = useSharedValue(middleCircleColor);
  const colorAnimationProgress = useSharedValue(0);
  // Trigger animation when the color prop changes
  useEffect(() => {
    prevColor.value = targetColor.value; // Set previous color
    targetColor.value = color; // Set new target color
    colorAnimationProgress.value = 0; // Reset animation
    colorAnimationProgress.value = withSpring(1, {
      duration: 500,
    });
  }, [
    color,
    colorAnimationProgress,
    middleCircleColor,
    prevColor,
    targetColor,
  ]);

  // Animated style with interpolated color
  // Compute interpolated color using useDerivedValue
  const animatedColor = useDerivedValue(() => {
    return interpolateColors(
      colorAnimationProgress.value,
      [0, 1],
      [prevColor.value, targetColor.value],
    );
  });

  useEffect(() => {
    if (percentage > 0) {
      progressOpacity.value = withTiming(1, {
        duration: 600,
        easing: Easing.inOut(Easing.cubic),
      });
    } else {
      progressOpacity.value = withDelay(
        200,
        withTiming(0, {
          duration: 400,
          easing: Easing.inOut(Easing.cubic),
        }),
      );
    }
  }, [percentage, progressOpacity]);

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

  return (
    <View style={[styles.container, { height: size, width: size }]}>
      <Canvas style={styles.canvas}>
        <Group
          origin={{ x: center, y: center }}
          transform={[{ rotate: -Math.PI / 2 }]}
        >
          {/* Progress back tip */}
          <Group
            blendMode="overlay"
            clip={backTipShadowClip}
            opacity={progressOpacity}
            origin={{ x: center, y: center }}
          >
            <Shadow
              blur={scale(3)}
              color={hexToRGBA(darken(color, 0.45), 0.5)}
              dx={0}
              dy={0}
              inner={false}
              shadowOnly={true}
            />
            <Path path={backTipPath} style="fill">
              <Paint color="#FFF" />
            </Path>
          </Group>
          {/* Track circle */}
          <Path
            color={trackColor}
            end={1}
            opacity={trackOpacity}
            path={trackPath}
            strokeCap="round"
            strokeJoin="round"
            strokeWidth={strokeWidth}
            style="stroke"
          />
          {/*  Center Circle */}
          <Path
            color={animatedColor}
            opacity={trackOpacity}
            path={Skia.Path.Make().addCircle(center, center, radius / 1.3)}
            style="fill"
          />
          {/* Progress circle */}
          <Group opacity={progressOpacity}>
            <Path
              color={color}
              end={progress}
              path={trackPath}
              strokeCap="round"
              strokeJoin="round"
              strokeWidth={strokeWidth}
              style="stroke"
            >
              <SweepGradient
                c={vec(center, center)}
                colors={colors}
                origin={{ x: center, y: center }}
                transform={tipTransform}
              />
            </Path>
          </Group>
          {/*Tip Shadow*/}
          <Group
            blendMode="overlay"
            clip={tipShadowClip}
            opacity={progressOpacity}
            origin={{ x: center, y: center }}
            transform={tipTransform}
          >
            <Path path={tipPath} style="fill">
              <Paint color={"#FFF"} />
            </Path>
            <Shadow
              blur={scale(3)}
              color={hexToRGBA(darken(color, 0.25), 0.5)}
              dx={0}
              dy={0}
              inner={false}
              shadowOnly={false}
            />
          </Group>
        </Group>
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
  },
});

export default ProgressCircle;
