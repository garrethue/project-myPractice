import React from "react";
import { connect } from "react-redux";
import { Button, useColorMode } from "@chakra-ui/core";
import mapStoreToProps from "../../../redux/mapStoreToProps";

const LogOutButton = (props) => {
  const { colorMode } = useColorMode();
  const borderColor = { light: "yellow.600", dark: "brand.900" };

  return (
    <Button
      isDisabled={props.store.isAtTimer}
      opacity={0.85}
      marginLeft={2}
      border="1px"
      variantColor="yellow"
      color="white"
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

export default connect(mapStoreToProps)(LogOutButton);
