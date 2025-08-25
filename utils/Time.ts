import { intervalToDuration } from "date-fns";

interface FormatDurationOptions {
  displayHours?: boolean;
  showAbbreviation?: boolean;
}

export const padded = (
  num: number | undefined,
  paddingCount: number,
): string => {
  if (!num) return "00";
  const numLength = num.toString().length;
  if (numLength < paddingCount) {
    let numberStr = num.toString();
    for (let i = 0; i < paddingCount - numLength; i++) {
      numberStr = "0" + numberStr;
    }
    return numberStr;
  }
  return num.toString();
};

export function formatDuration(duration: null | number): string;
export function formatDuration(
  duration: null | number,
  options: FormatDurationOptions,
): string;
export function formatDuration(
  duration: null | number,
  options: FormatDurationOptions = {},
): string {
  if (duration === null || duration === undefined) return "";
  if (duration < 0) return "";

  const { displayHours = false, showAbbreviation = false } = options;

  const durationObj = intervalToDuration({ end: duration * 1000, start: 0 });
  const hours = durationObj.hours || 0;
  const minutes = durationObj.minutes || 0;
  const seconds = durationObj.seconds || 0;

  const showHours = displayHours || (hours != undefined && hours > 0);

  if (showAbbreviation) {
    return `${showHours ? hours + "h" : ""}${padded(minutes, 2)}m${hours > 0 ? "" : padded(seconds, 2) + "s"}`;
  } else if (showHours) {
    return `${hours}:${padded(minutes, 2)}:${padded(seconds, 2)}`;
  } else {
    return `${minutes}:${padded(seconds, 2)}`;
  }
}
