import React, { useState, useEffect } from "react";
import { Howl } from "howler";
import { connect } from "react-redux";
import BackButton from "../Helpers/Buttons/BackButton";
import {
  Grid,
  Box,
  Button,
  Text,
  useColorMode,
  CircularProgress,
  CircularProgressLabel,
  useToast,
} from "@chakra-ui/core";
import getAudio from "../Helpers/TimerHelpers/GetAudio";
import QuitButton from "../Helpers/Buttons/QuitButton";
import formatTime from "../Helpers/TimerHelpers/formatTime";
import mapStoreToPropsForTimer from "../Helpers/TimerHelpers/mapStoreToPropsForTimer";

function Timer(props) {
  const [internalTimeInSec, setInternalTime] = useState(props.total_time); //the time driver
  const [isActive, setIsActive] = useState(false); //isActive will toggle on/off the timer
  const [displayTime, setDisplayTime] = useState(formatTime(internalTimeInSec)); //this piece of state is for formatting the timer
  const [bell] = useState(
    new Howl({
      src: [
        "./sounds/bell-1.wav",
        "./sounds/bell-1.mp3",
        //PATH: "/Users/garret.larson/Desktop/node-projects/yogarretsapp/server/sounds/output.mp3",
      ],
      volume: 0.9,
    })
  );
  const [timesToRingBell] = useState(props.timesToRingBellArr); //timesToRingBell is an array of integers that are used to signal transitions by playing the bell mp3 file
  const [promptUserTimes] = useState(props.timesToPromptUser); //when the internal timer reaches a number in this array, the prompt will play
  const [poseList] = useState(props.poseList); //poseList is an array of pose names that are used in conjunction with currentPose and poseListIndex to render the current pose in the practice
  const [currentPose, setCurrentPose] = useState(props.poseList[0]);
  const [poseListIndex, setPoseListIndex] = useState(0); //this allows one to iterate through the array to display the correct counter
  const { colorMode } = useColorMode();
  const color = { light: "white", dark: "white" };
  const toast = useToast();

  function turnOnTimer() {
    setIsActive(true);
  }
  function turnOffTimer() {
    setIsActive(false);
  }

  function toggleTimer() {
    //turns on/off the timer
    if (internalTimeInSec === props.total_time) {
      toast({
        position: "bottom",
        duration: 5000,
        render: () => (
          <Box m={3} rounded={3} color="white" p={5} bg="black">
            {" "}
            <Text fontSize="lg" fontWeight="bold">
              Find your mat!
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              Your practice is starting in the next 10 seconds!
            </Text>
          </Box>
        ),
      });
      setTimeout(() => setIsActive(!isActive), 10000);
    } else {
      setIsActive(!isActive);
    }
  }
  function quitPractice() {
    props.dispatch({ type: "NOT_AT_TIMER" });
    props.history.push("/all-practices");
  }
  function renderTimer() {
    return (
      <Box marginTop={5} w="100%">
        <Text
          shadow="lg"
          boxShadow="lg"
          textShadow="lg"
          rounded={3}
          padding={3}
          bg="black"
          textAlign="center"
          color="white"
          fontSize="2rem"
          marginBottom={3}
        >
          Time Remaining: <Text>{displayTime}</Text>
        </Text>
        <Text
          shadow="lg"
          boxShadow="lg"
          textShadow="lg"
          rounded={3}
          padding={3}
          bg="black"
          textAlign="center"
          color="white"
          fontSize="2rem"
        >
          {internalTimeInSec !== 0 ? (
            <>
              Current Pose: <Text>{currentPose}</Text>
            </>
          ) : (
            <>
              <Text>Congratulations {props.user.first_name}!</Text>
              <Text>You finished your practice!</Text>
            </>
          )}
        </Text>
        <Box textAlign="center">
          {internalTimeInSec !== 0 ? (
            <Box margin={0}>
              <Button
                shadow="lg"
                boxShadow="lg"
                textShadow="lg"
                marginRight={3}
                size="lg"
                bg="black"
                color={color[colorMode]}
                variantColor="green"
                onClick={toggleTimer}
              >
                {isActive ? "Pause" : "Start"}
              </Button>
              <QuitButton
                buttonHeader={"Quit Practice"}
                buttonDescription={"I Quit"}
                buttonMessage={"Are you a quitter?"}
                onClickFunc={quitPractice}
                turnOnTimer={turnOnTimer}
                turnOffTimer={turnOffTimer}
              />
            </Box>
          ) : (
            <BackButton viewTitle="All Practices" toWhere="/all-practices" />
          )}
        </Box>
      </Box>
    );
  }
  function getProgressValue() {
    return (internalTimeInSec / props.total_time) * 100;
  }
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setInternalTime((internalTimeInSec) => internalTimeInSec - 1);
      }, 1000); //the 1000 defines how long each interval should be

      setDisplayTime(formatTime(internalTimeInSec)); //where formatting time occurs on DOM

      //get prompts for user
      if (promptUserTimes.includes(internalTimeInSec)) {
        let indexOfNextPose = poseListIndex; // the index of the next pose is already set due to line 184, thus I do not have to do poseListIndex + 1 to get next pose
        let nextPose = poseList[indexOfNextPose];
        getAudio(nextPose);
      }

      //check if practice is over OR if it is time to ring next bell
      if (internalTimeInSec === 0) {
        //Practice is over!
        bell.play();
        toggleTimer();
      } else if (timesToRingBell.includes(internalTimeInSec)) {
        bell.play();
        if (poseListIndex > 0) {
          //avoids the pose changing upon starting the practice
          setCurrentPose(poseList[poseListIndex]);
        }
        setPoseListIndex((poseListIndex) => poseListIndex + 1);
      }
    } else if (!isActive && internalTimeInSec !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, internalTimeInSec]);

  return (
    <Grid marginBottom={5} justifyContent="center">
      {internalTimeInSec === props.total_time && !isActive ? (
        <Box textAlign="center">
          <Text
            shadow="lg"
            boxShadow="lg"
            textShadow="lg"
            rounded={3}
            marginTop={5}
            paddingLeft={3}
            paddingRight={3}
            bg="brand.800"
            textAlign="center"
            color="white"
            fontSize="4rem"
            marginBottom={10}
          >
            Are you ready {props.user.first_name}?
          </Text>
          <Button
            shadow="lg"
            boxShadow="lg"
            textShadow="lg"
            w="40%"
            size="lg"
            bg="black"
            color={color[colorMode]}
            variantColor="green"
            onClick={toggleTimer}
          >
            Ready!
          </Button>
        </Box>
      ) : (
        <CircularProgress
          marginTop={8}
          marginBottom={8}
          color="teal"
          thickness="0.05"
          size="40rem"
          value={getProgressValue()}
        >
          <CircularProgressLabel>{renderTimer()}</CircularProgressLabel>
        </CircularProgress>
      )}
    </Grid>
  );
}

export default connect(mapStoreToPropsForTimer)(Timer);
