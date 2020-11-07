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
import DeletePracticeButton from "../Helpers/Buttons/DeletePracticeButton";

function PracticeDetails(props) {
  const handleDeletePractice = (practiceId) => {
    props.dispatch({ type: "LOADING" });
    props.dispatch({ type: "DELETE_A_PRACTICE", payload: practiceId });
    props.history.push("/all-practices"); //push user back to ALL PRACTICES! AFTER GETTING UPDATED LIST!
  };

  const { colorMode } = useColorMode();
  const color = { light: "white", dark: "white" };
  const bgColor = { light: "#0000004a", dark: "transparent" };

  const goToTimer = () => {
    props.dispatch({ type: "AT_TIMER" });
    props.history.push("/timer");
  };

  const goToEdit = () => {
    props.history.push("/edit");
  };

  console.log(props.store);
  return (
    <Grid marginBottom={10} justifyContent="center">
      <Box marginTop={5} marginBottom={5} w="50%">
        <BackButton viewTitle="All Practices" toWhere="/all-practices" />
      </Box>
      <Grid
        roundedTop={3}
        bg={bgColor[colorMode]}
        w="60rem"
        padding={2}
        justifyContent="center"
        alignItems="center"
        templateColumns="1fr"
      >
        <Skeleton isLoaded={!props.store.isLoading}>
          <Text
            pt={1}
            pb={1}
            pr={2}
            pl={2}
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
        bg={bgColor[colorMode]}
        w="100%"
        padding={2}
        roundedBottom={3}
        justifyContent="center"
        alignItems="center"
        templateColumns="repeat(2, 1fr)"
        gap={2}
      >
        <Skeleton isLoaded={!props.store.isLoading}>
          <Box
            fontWeight="bold"
            fontSize="2rem"
            textAlign="center"
            bg="brand.800"
            rounded={3}
          >
            Pose
          </Box>
        </Skeleton>
        <Skeleton isLoaded={!props.store.isLoading}>
          <Box
            fontWeight="bold"
            fontSize="2rem"
            textAlign="center"
            bg="brand.800"
            rounded={3}
          >
            Duration
          </Box>
        </Skeleton>
        {props.store.practiceDetails.map((poseObj) => {
          return (
            <>
              <Skeleton isLoaded={!props.store.isLoading}>
                <Text
                  rounded={3}
                  fontSize="1.2rem"
                  p={1}
                  textAlign="center"
                  bg="black"
                  color="white"
                >
                  {poseObj.pose_name}
                </Text>
              </Skeleton>
              <Skeleton isLoaded={!props.store.isLoading}>
                <Text
                  rounded={3}
                  p={1}
                  textAlign="center"
                  bg="black"
                  fontSize="1.2rem"
                  color="white"
                >
                  {poseObj.pose_time} seconds
                </Text>
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
          color={color[colorMode]}
          variantColor="yellow"
          onClick={goToEdit}
        >
          Edit
        </Button>
        <DeletePracticeButton
          isLoadingProp={props.store.isLoading}
          buttonHeader={"Delete Practice"}
          buttonDescription={"Delete"}
          buttonMessage={"Are you sure you want to delete this practice?"}
          onClickFunc={() =>
            handleDeletePractice(props.store.practiceDetails[0].practice_id)
          }
        />
      </Grid>
    </Grid>
  );
}

export default connect(mapStoreToProps)(withRouter(PracticeDetails));
