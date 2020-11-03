import React from "react";
import { Box, Grid, Text } from "@chakra-ui/core";

const AppTitle = () => (
  <Grid marginTop={6} justifyContent="center">
    <Box
      bg="transparent"
      rounded="md"
      paddingLeft={3}
      paddingRight={3}
      border="2px"
      borderColor="brand.800"
      borderBottom="transparent"
      borderTop="transparent"
    >
      <Text
        fontFamily="Courier"
        textAlign="center"
        fontWeight="bold"
        fontSize="45px"
      >
        myPractice
      </Text>
    </Box>
  </Grid>
);

export default AppTitle;
