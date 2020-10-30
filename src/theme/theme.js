import { theme } from "@chakra-ui/core";

// Let's say you want to add custom colors
const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      900: "#fce675",
      800: "#fe938c",
      700: "#55d6be",
    },
  },
};

export default customTheme;
