import { Theme } from "styled-system";

export const theme: Theme = {
  breakpoints: ["40em", "52em", "64em"],
  space: [0, 4, 8, 16, 32],
  fontSizes: [12, 14, 16, 20, 24, 32],
};

type ThemeType = typeof theme;

export { ThemeType };
