import React from "react";
import { Box, Text, useColorMode } from "@chakra-ui/core";
import "./Footer.css";

const Footer = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "black", dark: "#000000d9" };

  return (
    <Box opacity={0.9} mb={2} ml={2} className="footer">
      <Box rounded={2} bg={bgColor[colorMode]}>
        <Text
          paddingLeft={1}
          fontFamily="Bjorn Light"
          textAlign="left"
          fontSize="1.1rem"
          color="brand.600"
        >
          yoGarret Productions
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
