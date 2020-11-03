import React from "react";
import { connect } from "react-redux";
import { Button, useColorMode } from "@chakra-ui/core";

const LogOutButton = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const borderColor = { light: "yellow.600", dark: "brand.900" };

  return (
    <Button
      opacity={0.9}
      marginLeft={2}
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

export default connect()(LogOutButton);
