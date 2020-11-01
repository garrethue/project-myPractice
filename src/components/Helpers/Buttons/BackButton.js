import React from "react";
import { Button, useColorMode } from "@chakra-ui/core";
import { withRouter } from "react-router-dom";

function BackButton(props) {
  const goToPractices = (toWhere) => {
    props.history.push(toWhere);
  };
  const { colorMode } = useColorMode();
  const colorObj = { light: "white", dark: "white" };
  return (
    <Button
      bg="black"
      color="white"
      size="lg"
      color={colorObj[colorMode]}
      variantColor="teal"
      onClick={() => goToPractices(props.toWhere)}
    >
      Back to {props.viewTitle}
    </Button>
  );
}
export default withRouter(BackButton);
