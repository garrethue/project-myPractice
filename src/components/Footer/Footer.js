import React from "react";
import { Box, Text, useColorMode } from "@chakra-ui/core";
import "./Footer.css";

const Footer = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "#6f6f6f", dark: "#6f6f6f" };

  return (
    <Box mb={2} ml={2} className="footer">
      <Text
        boxShadow="lg"
        rounded={2}
        w="8rem"
        bg={bgColor[colorMode]}
        paddingLeft={1}
        fontFamily="Bjorn Light"
        textAlign="left"
        fontSize="1.1rem"
        color="brand.600"
      >
        yoGarret Productions
      </Text>
    </Box>
  );
};

export default Footer;
