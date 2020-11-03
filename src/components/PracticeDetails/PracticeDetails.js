import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Text,
  Box,
  Button,
  useColorMode,
  Skeleton,
} from "@chakra-ui/core";
import mapStoreToProps from "../../redux/mapStoreToProps";
import TimeFormatter from "../Helpers/TimeFormatter";
import GetTotalTime from "../Helpers/GetTotalTime";
import BackButton from "../Helpers/Buttons/BackButton";

function PracticeDetails(props) {
  const handleDeletePractice = (practiceId) => {
    if (window.confirm("Are you sure you want to delete this practice?")) {
      props.dispatch({ type: "LOADING" });
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
        w="60rem"
        padding={2}
        justifyContent="center"
        alignItems="center"
        templateColumns="1fr"
      >
        <Skeleton isLoaded={!props.store.isLoading}>
          <Text
            paddingRight={2}
            paddingLeft={2}
            bg="black"
            textAlign="right"
            color="white"
            fontWeight="bold"
            fontSize="2.5rem"
          >
            Total Time:{" "}
            {TimeFormatter(GetTotalTime(props.store.practiceDetails, false))}
          </Text>
        </Skeleton>
      </Grid>
      <Grid
        w="100%"
        padding={2}
        justifyContent="center"
        alignItems="center"
        templateColumns="repeat(2, 1fr)"
        gap={3}
      >
        <Skeleton isLoaded={!props.store.isLoading}>
          <Box
            fontWeight="bold"
            fontSize="2rem"
            textAlign="center"
            bg="brand.600"
          >
            Pose
          </Box>
        </Skeleton>
        <Skeleton isLoaded={!props.store.isLoading}>
          <Box
            fontWeight="bold"
            fontSize="2rem"
            textAlign="center"
            bg="brand.600"
          >
            Duration
          </Box>
        </Skeleton>
        {props.store.practiceDetails.map((poseObj) => {
          return (
            <>
              <Skeleton isLoaded={!props.store.isLoading}>
                <Box fontSize="1.2rem" textAlign="center" bg="black">
                  <Text fontWeight="bold" color="white">
                    {poseObj.pose_name}
                  </Text>
                </Box>
              </Skeleton>
              <Skeleton isLoaded={!props.store.isLoading}>
                <Box textAlign="center" bg="black">
                  <Text fontSize="1.2rem" fontWeight="bold" color="white">
                    {poseObj.pose_time} seconds
                  </Text>
                </Box>
              </Skeleton>
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
          isDisabled={props.store.isLoading}
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
          isDisabled={props.store.isLoading}
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
          isDisabled={props.store.isLoading}
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
