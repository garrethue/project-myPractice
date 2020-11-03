import React from "react";
import { connect } from "react-redux";
import { Button, useColorMode } from "@chakra-ui/core";

const LogOutButton = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const borderColor = { light: "yellow.600", dark: "brand.900" };

  return (
    <Button
      marginLeft={2}
      // variantColor="yellow"
      // bg="transparent"
      // border="1px"
      // borderColor={borderColor[colorMode]}
      // borderTopColor="transparent"
      // borderBottomColor="transparent"

      border="1px"
      variantColor="yellow"
      color="yellow"
      borderColor={borderColor[colorMode]}
      borderTop="transparent"
      borderBottom="transparent"
      bg="transparent"
      onClick={() => props.dispatch({ type: "LOGOUT" })}
    >
      Log Out
    </Button>
  );
};

// This component doesn't need 'mapStateToProps'
// because it doesn't care what the current state is.
// No matter what the redux state is, this button will always be a log out button
// this component still needs 'connect' though, because it is going to dispatch a redux action
export default connect()(LogOutButton);
