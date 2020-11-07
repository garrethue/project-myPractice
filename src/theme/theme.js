import { theme } from "@chakra-ui/core";

// Let's say you want to add custom colors
const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    white: "#fbf9fa",
    black: "black", //
    header: "#171717",
    button: "#171717",
    brand: {
      900: "#f0c9bf", //cotton candy
      800: "#649cd2", //baby blue
      700: "#FDFFCF", //cream color
      600: "#fcfbce", //yellow
      500: "#808080", //beautiful grey
    },
  },
  fonts: {
    body: "P22 Johnston Underground, sans-serif",
    heading: "P22 Johnston Underground, sans-serif",
    mono: "P22 Johnston Underground, sans-serif",
  },
};

export default customTheme;
