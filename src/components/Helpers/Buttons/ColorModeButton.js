import React from "react";
import { connect } from "react-redux";
import { Button, useColorMode, Icon } from "@chakra-ui/core";

const ColorModeButton = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const borderColor = { light: "yellow.600", dark: "brand.900" };
  return (
    <Button
      rounded="full"
      marginLeft={2}
      border="2px"
      variantColor="yellow"
      color="yellow"
      borderColor={borderColor[colorMode]}
      borderTop="transparent"
      borderBottom="transparent"
      bg="transparent"
      onClick={toggleColorMode}
    >
      {colorMode === "light" ? <Icon name="moon" /> : <Icon name="sun" />}
    </Button>
  );
};

// This component doesn't need 'mapStateToProps'
// because it doesn't care what the current state is.
// No matter what the redux state is, this button will always be a log out button
// this component still needs 'connect' though, because it is going to dispatch a redux action
export default connect()(ColorModeButton);
