import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Box, Button } from "@chakra-ui/core";
import mapStoreToProps from "../../redux/mapStoreToProps";

function PracticeDetails(props) {
  console.log(props.store);
  return (
    <div>
      <Grid
        bg="blue"
        margin={5}
        justifyContent="center"
        alignItems="center"
        templateColumns="repeat(2, 1fr)"
        gap={4}
      >
        {props.store.practiceDetails.map((poseObj) => {
          return (
            <>
              <Box>{poseObj.pose_name}</Box>
              <Box>{poseObj.pose_time}</Box>
            </>
          );
        })}
      </Grid>
      <Button>Start</Button> <Button>Edit</Button> <Button>Delete</Button>
    </div>
  );
}

export default connect(mapStoreToProps)(withRouter(PracticeDetails));
