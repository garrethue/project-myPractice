import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Text, Box, Button, useColorMode } from "@chakra-ui/core";
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

  const { colorMode } = useColorMode();
  const color = { light: "white", dark: "white" };

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
              <Box fontSize="18px" textAlign="center" bg="black">
                <Text fontWeight="bold" color="white">
                  {poseObj.pose_name}
                </Text>
              </Box>
              <Box textAlign="center" bg="black">
                <Text fontSize="18px" fontWeight="bold" color="white">
                  {poseObj.pose_time}
                </Text>
              </Box>
            </>
          );
        })}
      </Grid>
      <Grid
        marginTop={5}
        marginLeft={5}
        marginRight={5}
        justifyContent="center"
        alignItems="center"
        templateColumns="repeat(3, 1fr)"
        gap={2}
      >
        <Button
          bg="black"
          color="white"
          bg="black"
          color={color[colorMode]}
          variantColor="green"
          onClick={goToTimer}
        >
          Start
        </Button>
        <Button
          bg="black"
          color="white"
          bg="black"
          color={color[colorMode]}
          variantColor="yellow"
          onClick={goToEdit}
        >
          Edit
        </Button>{" "}
        <Button
          bg="black"
          color="white"
          bg="black"
          color={color[colorMode]}
          variantColor="red"
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
