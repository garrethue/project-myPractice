import React from "react";
import { Box, Grid, Text } from "@chakra-ui/core";

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const Footer = () => (
  <Grid marginTop={20} justifyContent="center">
    <Box
      bg="transparent"
      rounded="md"
      padding={2}
      border="2px"
      borderColor="brand.700"
      borderBottom="transparent"
      borderTop="transparent"
    >
      <Text
        fontFamily="monospace"
        textAlign="center"
        fontWeight="bold"
        fontSize="1.2rem"
      >
        &copy; yoGarret Productions
      </Text>
    </Box>
  </Grid>
);

export default Footer;
