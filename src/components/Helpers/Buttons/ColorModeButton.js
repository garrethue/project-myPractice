import React from "react";
import { connect } from "react-redux";
import { Button, useColorMode, Icon } from "@chakra-ui/core";

const ColorModeButton = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      size="md"
      rounded="full"
      opacity={0.5}
      marginLeft={2}
      color="white"
      bg="transparent"
      variant="ghost"
      _hover={{ color: "black", bg: "white" }}
      onClick={toggleColorMode}
    >
      {colorMode === "light" ? <Icon name="moon" /> : <Icon name="sun" />}
    </Button>
  );
};

export default connect()(ColorModeButton);
