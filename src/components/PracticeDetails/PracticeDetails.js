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
        bg="blue.500"
        margin={5}
        padding={2}
        justifyContent="center"
        alignItems="center"
        templateColumns="repeat(2, 1fr)"
        gap={2}
      >
        <Box textAlign="center" bg="green.500">
          Pose
        </Box>
        <Box textAlign="center" bg="green.500">
          Duration
        </Box>
        {props.store.practiceDetails.map((poseObj) => {
          return (
            <>
              <Box textAlign="center" bg="yellow.500">
                {poseObj.pose_name}
              </Box>
              <Box textAlign="center" bg="yellow.500">
                {poseObj.pose_time}
              </Box>
            </>
          );
        })}
      </Grid>
      <Grid
        bg="blue.500"
        margin={5}
        padding={2}
        justifyContent="center"
        alignItems="center"
        templateColumns="repeat(3, 1fr)"
        gap={2}
      >
        <Button>Start</Button> <Button>Edit</Button> <Button>Delete</Button>
      </Grid>
    </div>
  );
}

export default connect(mapStoreToProps)(withRouter(PracticeDetails));
