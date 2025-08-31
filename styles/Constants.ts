import { ViewStyle } from "react-native";

import { scale } from "@/utils/Display";

export type Colors = typeof COLORS;
export type Theme = ThemeMap[keyof ThemeMap];
export type ThemeMap = typeof THEME;
export type ThemeName = keyof typeof THEME;
export type Typography = typeof TYPOGRAPHY;

export const THEME = {
  dark: {
    bg1: "#181A20",
    bg2: "#262A34",
    border: "#282933",
    colorful: {
      1: "#A06AF9",
      2: "#FBA3FF",
      3: "#8E96FF",
      4: "#94F0F0",
      5: "#8ed984",
      6: "#efd275",
      7: "#FF968E",
    },
    colorfulGradient: {
      1: ["#A06AF9", "#FBA3FF"],
      2: ["#FBA3FF", "#ea8eff"],
      3: ["#8E96FF", "#6a7eff"],
      4: ["#94F0F0", "#40a6d2"],
      5: ["#A5F59C", "#ebff6a"],
      6: ["#FFDD72", "#eaa851"],
      7: ["#FF968E", "#ff806a"],
    },
    focus: "#6200EE",
    gradient: {
      1: ["#FFB8E0", "#BE9EFF", "#88C0FC", "#86FF99"],
      9: ["#353843", "#181A20"],
      bg: ["#EF88ED", "#7269E3", "#8350DB", "#181A20"],
      focus: ["#6200EE", "#47c0ec", "#6200EE"],
      pause: ["#5E6272", "#393c48", "#5E6272"],
      rest: ["#7fb21e", "#27b027", "#7fb21e"],
      restOvertime: ["#a20f2b", "#c22e1c", "#a20f2b"],
    },
    inactive: "#5E6272",
    name: "dark",
    primary: "#246BFD",
    rest: "#F5F5F5",
    secondary: "#6200EE",
    text: "#FFF",
  },
  light: {
    bg1: "#eeeeee",
    bg2: "#dcdcdc",
    border: "#e1e1e1",
    focus: "#ee5822",
    gradient: {
      1: ["#FFB8E0", "#BE9EFF", "#88C0FC", "#86FF99"],
      9: ["#353843", "#181A20"],
      bg: ["#EF88ED", "#7269E3", "#8350DB", "#181A20"],
      focus: ["#eabb83", "#ee5822", "#eabb83"],
      pause: ["#a4a9b6", "#7a7f91", "#a4a9b6"],
      rest: ["#7fb21e", "#27b027", "#7fb21e"],
      restOvertime: ["#a20f2b", "#c22e1c", "#a20f2b"],
    },
    inactive: "#838898",
    name: "light",
    primary: "#1d52c0",
    secondary: "#4500a9",
    text: "#131313",
  },
};

export const COLORS = {
  error: {
    0: "#FEEFF2",
    25: "#FADAE1",
    50: "#ED8296",
    100: "#DF1C41",
    200: "#95122B",
    300: "#710E21",
  },
  gray: {
    0: "#F8F9F8",
    25: "#F6F8FA",
    50: "#ECEFF3",
    100: "#DFE1E6",
    200: "#C1C7CF",
    300: "#A4ABB8",
    400: "#808897",
    500: "#666D80",
    600: "#353849",
    700: "#272835",
    800: "#1A1B25",
    900: "#0D0D12",
  },
  primary: {
    50: "#FFF7ED",
    100: "#FFEDD5",
    200: "#FED7AA",
    300: "#FDBA74",
    400: "#FB923C",
    500: "#F97316",
    600: "#EA580C",
    700: "#C2410C",
    800: "#9A3412",
    900: "#7C2D12",
  },
  sky: {
    0: "#EFFBFF",
    25: "#D1F0F9",
    50: "#7EDCF1",
    100: "#33CFFF",
    200: "#106A97",
    300: "#0C4D6E",
  },
  success: {
    0: "#EFFEFA",
    25: "#DDF2EE",
    50: "#9DE0D3",
    100: "#40C4AA",
    200: "#287F6E",
    300: "#174E43",
  },
  warning: {
    0: "#FFF6E0",
    25: "#F9ECCB",
    50: "#FBD982",
    100: "#FFBD4C",
    200: "#956321",
    300: "#5B3D1E",
  },
  white: "#FFFFFF",
  whiteMild: "#BEBEBE",
};

export const TYPOGRAPHY = {
  bodyL: {
    fontFamily: "Inter-Medium",
    fontSize: scale(14),
    letterSpacing: 0,
    lineHeight: scale(16),
  },
  bodyS: {
    fontFamily: "Inter-Regular",
    fontSize: scale(13),
    letterSpacing: 0,
    lineHeight: scale(24),
  },
  bodyXS: {
    fontFamily: "Inter-Regular",
    fontSize: scale(12),
    letterSpacing: 0,
    lineHeight: scale(16),
  },
  buttonL: {
    fontFamily: "Inter-Bold",
    fontSize: scale(16),
    letterSpacing: 0,
    lineHeight: scale(24),
  },
  h0: {
    fontFamily: "Poppins-SemiBold",
    fontSize: scale(60),
    letterSpacing: 0,
    lineHeight: scale(64),
  },
  h1: {
    fontFamily: "Poppins-SemiBold",
    fontSize: scale(48),
    letterSpacing: 0,
    lineHeight: scale(56),
  },
  h2: {
    fontFamily: "Poppins-SemiBold",
    fontSize: scale(40),
    letterSpacing: 0,
    lineHeight: scale(48),
  },
  h3: {
    fontFamily: "Poppins-SemiBold",
    fontSize: scale(36),
    letterSpacing: 0,
    lineHeight: scale(40),
  },
  h4: {
    fontFamily: "Poppins-SemiBold",
    fontSize: scale(32),
    letterSpacing: 0,
    lineHeight: scale(40),
  },
  h5: {
    fontFamily: "Poppins-SemiBold",
    fontSize: scale(24),
    letterSpacing: 0,
    lineHeight: scale(32),
  },
  h6: {
    fontFamily: "Poppins-SemiBold",
    fontSize: scale(20),
    letterSpacing: 0,
    lineHeight: scale(24),
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: scale(18),
    letterSpacing: 0,
    lineHeight: scale(24),
  },
  titleL: {
    fontFamily: "Poppins-SemiBold",
    fontSize: scale(20),
    lineHeight: scale(24),
  },
  titleM: {
    fontFamily: "Inter-Semibold",
    fontSize: scale(16),
    lineHeight: scale(24),
  },
  titleS: {
    fontFamily: "Inter-Semibold",
    fontSize: scale(14),
    lineHeight: scale(24),
  },
  titleXL: {
    fontFamily: "Poppins-SemiBold",
    fontSize: scale(24),
    lineHeight: scale(32),
  },
  titleXS: {
    fontFamily: "Inter-Bold",
    fontSize: scale(10),
    lineHeight: scale(16),
  },
};

export const SPACING = {
  l: scale(16),
  lg: scale(24),
  md: scale(12),
  sm: scale(8),
  xl: scale(32),
  xs: scale(4),
};

export const RADIUS = {
  full: 9999,
  l: scale(12),
  lg: scale(16),
  md: scale(8),
  sm: scale(4),
  xl: scale(24),
};

export const UTILS = {
  center: {
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  screenDefault: {
    alignItems: "center",
    backgroundColor: "transparent",
    flex: 1,
    paddingHorizontal: scale(20),
    paddingTop: scale(24),
    width: "100%",
  },
  screenPadding: {
    paddingHorizontal: scale(20),
    paddingTop: scale(24),
  },
} as const;
