import React from "react";
import { Button, useColorMode } from "@chakra-ui/core";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import { connect } from "react-redux";

function BackButton(props) {
  const goToPractices = (toWhere) => {
    props.history.push(toWhere);
  };
  const { colorMode } = useColorMode();
  const colorObj = { light: "white", dark: "white" };
  const bgColor = { light: "header", dark: "black" };

  return (
    <Button
      isDisabled={props.store.isLoading}
      bg={bgColor[colorMode]}
      color="white"
      size="lg"
      shadow="lg"
      boxShadow="lg"
      textShadow="lg"
      color={colorObj[colorMode]}
      _hover={{ color: "black", bg: "white", transition: "0.5s" }}
      onClick={() => goToPractices(props.toWhere)}
    >
      Back to {props.viewTitle}
    </Button>
  );
}
export default connect(mapStoreToProps)(withRouter(BackButton));
