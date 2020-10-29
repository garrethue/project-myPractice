import React from "react";
import { Button } from "@chakra-ui/core";
import { withRouter } from "react-router-dom";

function BackButton(props) {
  const goToPractices = () => {
    props.history.push("/all-practices");
  };
  return (
    <Button bg="black" color="white" onClick={goToPractices}>
      Back to Practices
    </Button>
  );
}
export default withRouter(BackButton);
