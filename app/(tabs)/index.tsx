import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import { useAtom } from "jotai";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useInterval } from "usehooks-ts";

import TimerOptionsBottomSheet from "@/components/bottom-sheets/timer/TimerOptionsBottomSheet";
import ProgressCircle from "@/components/ui/progress/ProgressCircle";
import { useTheme } from "@/context/ThemeContext";
import {
  durationAtom,
  targetDurationAtom,
  timerStateAtom,
} from "@/states/TimerState";
import { COLORS, Theme, TYPOGRAPHY } from "@/styles/Constants";
import { scale } from "@/utils/Display";
import { formatDuration } from "@/utils/Time";

// noinspection JSUnusedGlobalSymbols
export default function TimerScreen() {
  const { theme } = useTheme();
  const styles = createThemedStyles(theme);
  const [duration, setDuration] = useAtom(durationAtom);
  const [timerState, setTimerState] = useAtom(timerStateAtom);
  const [target] = useAtom(targetDurationAtom);

  async function handleKeepAwake() {
    // This function can be used to keep the screen awake if needed
    await activateKeepAwakeAsync();
  }

  async function handleDeactivateKeepAwake() {
    // This function can be used to deactivate the keep awake feature
    await deactivateKeepAwake();
  }

  async function toggleTimer() {
    if (timerState.isOn) {
      await pauseTimer();
    } else {
      await startTimer();
    }
  }

  async function startTimer() {
    const currentTime = Date.now();
    await setTimerState({
      isOn: true,
      startDuration: duration,
      startEpoch: currentTime,
      updatedAt: currentTime,
    });
    await handleKeepAwake();
  }

  async function pauseTimer() {
    await setTimerState((prev) => ({
      ...prev,
      isOn: false,
      updatedAt: Date.now(),
    }));
    await handleDeactivateKeepAwake();
  }

  async function resetTimer() {
    await setDuration(0);
    await setTimerState({
      isOn: false,
      startDuration: 0,
      startEpoch: null,
      updatedAt: null,
    });
    await handleDeactivateKeepAwake();
  }

  useInterval(
    async () => {
      if (timerState.startEpoch === null || timerState.startDuration === null)
        return;
      const elapsedSeconds = (Date.now() - timerState.startEpoch) / 1000;
      const newDuration = Math.round(timerState.startDuration + elapsedSeconds);
      await setDuration(newDuration);
    },
    timerState.isOn ? 1000 : null,
  );

  return (
    <View style={styles.screenWrapper}>
      <View style={styles.container}>
        <View style={styles.progressWrapper}>
          <ProgressCircle
            color={timerState.isOn ? theme.focus : theme.inactive}
            colors={
              timerState.isOn ? theme.gradient.focus : theme.gradient.pause
            }
            percentage={(duration / target) * 100}
            size={scale(250)}
            strokeWidth={scale(30)}
            trackColor={"#e0e0e0"}
            trackOpacity={timerState.isOn ? 0.5 : 0.3}
          />
          <View style={styles.timerTextContainer}>
            <Text style={styles.timerText}>{formatDuration(duration)}</Text>
          </View>
        </View>
        <Pressable
          onPress={() => toggleTimer()}
          style={{
            marginVertical: 20,
          }}
        >
          <Text style={styles.text}>Toggle On/Off</Text>
        </Pressable>
        <Pressable
          onPress={() => resetTimer()}
          style={{
            marginVertical: 20,
          }}
        >
          <Text style={styles.text}>Reset</Text>
        </Pressable>

        <TimerOptionsBottomSheet />
      </View>
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
    progressWrapper: {
      position: "relative",
    },
    screenWrapper: {
      ...StyleSheet.absoluteFillObject,
    },
    text: {
      color: theme.text,
      marginBottom: scale(50),
    },
    timerText: {
      ...TYPOGRAPHY.mono,
      color: "#FFF",
      fontSize: scale(15),
    },
    timerTextContainer: {
      alignItems: "center",
      height: "100%",
      justifyContent: "center",
      position: "absolute",
      width: scale(250),
    },
  });
}
