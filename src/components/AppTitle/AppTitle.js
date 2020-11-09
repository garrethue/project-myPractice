import React from "react";
import { Box, Grid, Text } from "@chakra-ui/core";

const AppTitle = () => (
  <Grid
    marginTop={6}
    justifyContent="center"
    columnGap={0}
    gridTemplateColumns="0.1fr 1fr"
  >
    <Text fontFamily="Barcelony, san serif" textAlign="right" fontSize="45px">
      my
    </Text>
    <Text
      fontFamily="P22 Johnston Underground, san serif"
      textAlign="center"
      fontSize="45px"
    >
      Practice
    </Text>
  </Grid>
);

export default AppTitle;
