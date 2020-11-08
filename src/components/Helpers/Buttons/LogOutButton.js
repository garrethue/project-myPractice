import React from "react";
import { connect } from "react-redux";
import { Button, useColorMode } from "@chakra-ui/core";
import mapStoreToProps from "../../../redux/mapStoreToProps";

const LogOutButton = (props) => {
  const { colorMode } = useColorMode();
  return (
    <Button
      isDisabled={props.store.isAtTimer}
      marginLeft={2}
      color="white"
      bg="transparent"
      variant="ghost"
      _hover={{ color: "white", bg: "button" }}
      onClick={() => props.dispatch({ type: "LOGOUT" })}
    >
      Log Out
    </Button>
  );
};

export default connect(mapStoreToProps)(LogOutButton);
