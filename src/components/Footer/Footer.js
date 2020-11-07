import React from "react";
import { Box, Text, useColorMode } from "@chakra-ui/core";
import "./Footer.css";

const Footer = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "black", dark: "#000000d9" };

  return (
    <Box mb={2} ml={2} className="footer">
      <Box opacity={0.85} rounded={2} w="8rem" bg={bgColor[colorMode]}>
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
