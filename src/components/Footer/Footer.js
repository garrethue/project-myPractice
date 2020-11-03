import React from "react";
import { Box, Grid, Text } from "@chakra-ui/core";
import "./Footer.css";

const Footer = () => (
  <Box marginTop={10} className="footer">
    <Box opacity={0.3} bg="transparent" padding={3}>
      <Text
        paddingLeft={1}
        fontFamily="mudrakshar, courier"
        textAlign="left"
        fontWeight="bold"
        fontSize="1rem"
      >
        YOGARRET d PRODUCTIONS
      </Text>
    </Box>
  </Box>
);

export default Footer;
