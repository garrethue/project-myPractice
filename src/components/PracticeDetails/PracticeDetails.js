import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Box, Button } from "@chakra-ui/core";
import mapStoreToProps from "../../redux/mapStoreToProps";

function PracticeDetails(props) {
  const handleDeletePractice = (practiceId) => {
    if (window.confirm("Are you sure you want to delete this practice?")) {
      props.dispatch({ type: "DELETE_A_PRACTICE", payload: practiceId });
      props.history.push("/all-practices");
    }
    //push user back to ALL PRACTICES! AFTER GETTING UPDATED LIST!
  };

  const goToEdit = () => {
    props.history.push("/edit");
  };

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
        <Button>Start</Button>
        <Button onClick={goToEdit}>Edit</Button>{" "}
        <Button
          onClick={() =>
            handleDeletePractice(props.store.practiceDetails[0].practice_id)
          }
        >
          Delete
        </Button>
      </Grid>
    </div>
  );
}

export default connect(mapStoreToProps)(withRouter(PracticeDetails));
