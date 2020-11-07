import React from "react";
import { Box, Text, useColorMode } from "@chakra-ui/core";
import "./Footer.css";

const Footer = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "black", dark: "header" };

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
        color="white"
      >
        yoGarret Productions
      </Text>
    </Box>
  );
};

export default Footer;
