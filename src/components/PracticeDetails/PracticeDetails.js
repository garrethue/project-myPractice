import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Text, Box, Button } from "@chakra-ui/core";
import mapStoreToProps from "../../redux/mapStoreToProps";
import TimeFormatter from "../Helpers/TimeFormatter";
import GetTotalTime from "../Helpers/GetTotalTime";
import BackButton from "../Helpers/Buttons/BackButton";

function PracticeDetails(props) {
  const handleDeletePractice = (practiceId) => {
    if (window.confirm("Are you sure you want to delete this practice?")) {
      props.dispatch({ type: "DELETE_A_PRACTICE", payload: practiceId });
      props.history.push("/all-practices");
    }
    //push user back to ALL PRACTICES! AFTER GETTING UPDATED LIST!
  };

  const goToTimer = () => {
    props.history.push("/timer");
  };

  const goToEdit = () => {
    props.history.push("/edit");
  };

  console.log(props.store);
  return (
    <Grid justifyContent="center">
      <Box marginTop={5} marginBottom={5} w="50%">
        <BackButton viewTitle="All Practices" toWhere="/all-practices" />
      </Box>
      <Grid
        w="100%"
        padding={2}
        justifyContent="center"
        alignItems="center"
        templateColumns="repeat(2, 1fr)"
        gap={3}
      >
        <Text
          paddingRight={2}
          paddingLeft={2}
          bg="black"
          textAlign="right"
          color="white"
          fontWeight="bold"
          fontSize="30px"
        >
          Total Time:{" "}
          {TimeFormatter(GetTotalTime(props.store.practiceDetails, false))}
        </Text>
        <Box />
        <Box
          fontWeight="bold"
          fontSize="30px"
          textAlign="center"
          bg="brand.700"
        >
          Pose
        </Box>
        <Box
          fontWeight="bold"
          fontSize="30px"
          textAlign="center"
          bg="brand.700"
        >
          Duration
        </Box>
        {props.store.practiceDetails.map((poseObj) => {
          return (
            <>
              <Box textAlign="center" bg="black">
                {poseObj.pose_name}
              </Box>
              <Box textAlign="center" bg="black">
                {poseObj.pose_time}
              </Box>
            </>
          );
        })}
      </Grid>
      <Grid
        margin={5}
        padding={2}
        justifyContent="center"
        alignItems="center"
        templateColumns="repeat(3, 1fr)"
        gap={2}
      >
        <Button onClick={goToTimer}>Start</Button>
        <Button onClick={goToEdit}>Edit</Button>{" "}
        <Button
          onClick={() =>
            handleDeletePractice(props.store.practiceDetails[0].practice_id)
          }
        >
          Delete
        </Button>
      </Grid>
    </Grid>
  );
}

export default connect(mapStoreToProps)(withRouter(PracticeDetails));
