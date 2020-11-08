import React from "react";
import { Box, Grid, Text } from "@chakra-ui/core";

const AppTitle = () => (
  <Grid
    marginTop={6}
    justifyContent="center"
    columnGap={0}
    gridTemplateColumns="0.1fr 1fr"
  >
    <Text fontFamily="Barcelony" textAlign="right" fontSize="40px">
      my
    </Text>
    <Text
      fontFamily="P22 Johnston Underground"
      textAlign="center"
      fontSize="40px"
    >
      Practice
    </Text>
  </Grid>
);

export default AppTitle;
