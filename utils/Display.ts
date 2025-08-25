import { Dimensions } from "react-native";

export const { height, width } = Dimensions.get("window");
const baseWidth = 375; // Base width for scaling

export function hexToRGBA(hex, alpha) {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function scale(size: number) {
  return Math.round((width / baseWidth) * size);
}
