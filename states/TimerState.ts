import AsyncStorage from "@react-native-async-storage/async-storage";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage: any = createJSONStorage(() => AsyncStorage);

export interface TimerState {
  isOn: boolean;
  startDuration: null | number; // in seconds
  startEpoch: null | number; // epoch time in milliseconds
  updatedAt: null | number;
}

export const timerStateAtom = atomWithStorage<TimerState>(
  "timer-state",
  {
    isOn: false,
    startDuration: null,
    startEpoch: null,
    updatedAt: null, // Default to current time
  },
  storage,
);

export const durationAtom = atomWithStorage<number>(
  "timer-duration",
  0,
  storage,
);

const targetDurationDefault = 15 * 60; // Default to 25 minutes in seconds

export const targetDurationAtom = atomWithStorage<number>(
  "timer-target-duration",
  targetDurationDefault,
  storage,
);

export const focusedProjectIdAtom = atomWithStorage<null | string>(
  "timer-focused-project",
  null,
  storage,
);
