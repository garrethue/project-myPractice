import { theme } from "@chakra-ui/core";

// Let's say you want to add custom colors
const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    white: "#fbf9fa",
    // gray: ,
    brand: {
      900: "#72A534", //darker shade of green
      800: "#99BF71", //olive
      700: "#FDFFCF", //cream color
      600: "#F4EC96", //cream color darker
      500: "#F4C430", //orange-ish
      400: "#00CCBB", //ocean color
    },
  },
  fonts: {
    body: "P22 Johnston Underground, sans-serif",
    heading: "P22 Johnston Underground, sans-serif",
    mono: "P22 Johnston Underground, sans-serif",
  },
};

export default customTheme;
