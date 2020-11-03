import React from "react";
import { connect } from "react-redux";
import { Button, useColorMode, Icon } from "@chakra-ui/core";

const ColorModeButton = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const borderColor = { light: "yellow.600", dark: "brand.900" };
  return (
    <Button
      size="md"
      opacity={0.75}
      marginLeft={2}
      variantColor="yellow"
      color="white"
      borderColor={borderColor[colorMode]}
      bg="transparent"
      onClick={toggleColorMode}
    >
      {colorMode === "light" ? <Icon name="moon" /> : <Icon name="sun" />}
    </Button>
  );
};

export default connect()(ColorModeButton);
