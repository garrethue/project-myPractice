import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Box, Button } from "@chakra-ui/core";
import mapStoreToProps from "../../redux/mapStoreToProps";

function PracticeDetails(props) {
  console.log(props.store);
  return (
    <div>
      <Button>Start</Button>
      <br />
      <button>Edit</button>
      <br />
      <button>Delete</button>
    </div>
  );
}

export default connect(mapStoreToProps)(withRouter(PracticeDetails));
