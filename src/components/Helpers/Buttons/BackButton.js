import React from "react";
import { Button, useColorMode } from "@chakra-ui/core";
import { withRouter } from "react-router-dom";

function BackButton(props) {
  // "/all-practices"

  const goToPractices = (toWhere) => {
    props.history.push(toWhere);
  };
  const { colorMode } = useColorMode();
  const color = { light: "white", dark: "white" };

  console.log(props.toWhere);
  return (
    <Button
      bg="black"
      color="white"
      bg="black"
      size="lg"
      color={color[colorMode]}
      variantColor="teal"
      onClick={() => goToPractices(props.toWhere)}
    >
      Back to {props.viewTitle}
    </Button>
  );
}
export default withRouter(BackButton);
