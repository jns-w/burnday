// noinspection JSUnusedGlobalSymbols

import { Dimensions } from "react-native";

export const { width } = Dimensions.get("window");
const baseWidth = 375; // Base width for scaling

export function darken(hex: string, factor: number) {
  hex = hex.replace("#", "");
  // Parse hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Apply darkening factor (clamp to 0-255)
  const darkenedR = Math.max(0, Math.min(255, Math.round(r * factor)));
  const darkenedG = Math.max(0, Math.min(255, Math.round(g * factor)));
  const darkenedB = Math.max(0, Math.min(255, Math.round(b * factor)));

  // Convert back to hex
  return `#${darkenedR.toString(16).padStart(2, "0")}${darkenedG
    .toString(16)
    .padStart(2, "0")}${darkenedB.toString(16).padStart(2, "0")}`;
}

export function hexToRGBA(hex: string, alpha: number) {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function scale(size: number) {
  return Math.round((width / baseWidth) * size);
}
