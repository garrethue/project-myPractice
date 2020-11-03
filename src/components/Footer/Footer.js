import React from "react";
import { Box, Grid, Text } from "@chakra-ui/core";
import "./Footer.css";

const Footer = () => (
  <Box className="footer">
    <Box opacity={0.3} bg="transparent" padding={3}>
      <Text
        fontFamily="mudrakshar, courier"
        textAlign="left"
        fontWeight="bold"
        fontSize="1.4rem"
      >
        YOGARRET d PRODUCTIONS
      </Text>
    </Box>
  </Box>
);

export default Footer;
