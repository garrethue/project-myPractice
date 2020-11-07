import { theme } from "@chakra-ui/core";

// Let's say you want to add custom colors
const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      900: "#fce675",
      800: "#b8144d",
      700: "#55d6be",
      600: "#06837f",
    },
  },
  // fonts: {
  //   body: "Lato, sans-serif",
  //   heading: "Georgia, serif",
  //   mono: "Menlo, monospace",
  // },
};

export default customTheme;
