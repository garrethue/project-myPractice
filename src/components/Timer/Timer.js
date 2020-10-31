import React, { useState, useEffect } from "react";
import { Howl } from "howler";
import { connect } from "react-redux";
import axios from "axios";
import BackButton from "../Helpers/Buttons/BackButton";
import { Grid, Box, Button, Text, useColorMode } from "@chakra-ui/core";

function Timer(props) {
  //the time driver
  const [internalTimeInSec, setInternalTime] = useState(props.total_time); //props.total_time garret: this should come from the database --> TOTAL TIME IN SECONDS!
  //isActive will toggle on/off the timer
  const [isActive, setIsActive] = useState(false); //currently timing (isActive) or is paused (!isActive)
  //displayTime is what is shown on the DOM
  const [displayTime, setDisplayTime] = useState(formatTime()); //this piece of state is for formatting the timer
  //bell contains the mp3 audio file to signal pose transitions
  const [bell] = useState(
    new Howl({
      src: [
        "./sounds/bell-1.wav",
        "./sounds/bell-1.mp3",
        //PATH: "/Users/garret.larson/Desktop/node-projects/yogarretsapp/server/sounds/output.mp3",
      ],
    })
  );
  //timesToRingBell is an array of integers that are used to signal transitions by playing the bell mp3 file
  const [timesToRingBell, setTimesToRingBell] = useState(
    props.timesToRingBellArr
  );
  //poseList is an array of pose names that are used in conjunction with currentPose and poseListIndex to render the current pose in the practice
  const [poseList, setPoseList] = useState(props.poseList);
  const [currentPose, setCurrentPose] = useState(props.poseList[0]);
  const [poseListIndex, setPoseListIndex] = useState(0); //this allows one to iterate through the array to display the correct counter
  const [isStopped, setIsStopped] = useState(false);

  const { colorMode } = useColorMode();
  const color = { light: "white", dark: "white" };

  //turns on/off the timer
  function toggleTimer() {
    setIsActive(!isActive);
  }

  function quitPractice() {
    //implement this as a STOP practice
    if (
      internalTimeInSec !== props.total_time &&
      window.confirm("Are you a quitter?")
    ) {
      // go back to home page?
      toggleTimer();
      props.history.push("/all-practices");
    }
  }

  function formatTime() {
    // Quotient-Remainder Theorem: Given any integer, n, and positive, integer, d,
    // I can find integers q and r s.t.
    // n = dq + r where r is between 0 and d-1
    let hours = Math.floor(internalTimeInSec / 3600); // n div d
    let remainingSeconds = internalTimeInSec % 3600; // n mod d
    let minutes = Math.floor(remainingSeconds / 60); // n div d
    let seconds = remainingSeconds % 60;

    // conditional rendering: when the hours, minutes and seconds to display are less than 10, add an extra 0 for normal looking display
    minutes = hours > 0 && minutes < 10 ? "0" + minutes : minutes;
    seconds = minutes > 0 && seconds < 10 ? "0" + seconds : seconds;

    // if hours > 0, show it, if the minutes are > 0, show them, else only show the seconds
    let timeToDisplay = `${seconds} seconds`;
    //hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
    if (hours > 0) {
      timeToDisplay = `${hours}:${minutes}:${seconds}`;
    } else if (minutes > 0) {
      timeToDisplay = `${minutes}:${seconds}`;
    }

    return timeToDisplay;
  }
  //are you ready? <button> Yes - let's do this!</button>
  useEffect(() => {
    //getAudio(); //Garret: anytime this is called, the client makes a req to the server for the audio file!
    console.log(poseList);
    console.log(timesToRingBell);
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setInternalTime((internalTimeInSec) => internalTimeInSec - 1);
      }, 1000); //the 1000 defines how long each interval should be

      setDisplayTime(formatTime()); //where formatting time occurs on DOM
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
    <Grid justifyContent="center">
      <Box w="65rem" textAlign="center">
        <Text
          marginTop={5}
          paddingLeft={3}
          paddingRight={3}
          bg="black"
          textAlign="center"
          color="white"
          fontWeight="bold"
          fontSize="60px"
          marginBottom={5}
        >
          Time Remaining: {displayTime}
        </Text>
      </Box>
      <Box className="currentPose">
        <Text
          paddingLeft={3}
          paddingRight={3}
          bg="black"
          textAlign="center"
          color="white"
          fontWeight="bold"
          fontSize="40px"
          marginBottom={5}
        >
          {!isStopped && internalTimeInSec !== 0
            ? `Current Pose: ${currentPose}`
            : `Congratulations! You finished your practice!`}
        </Text>
      </Box>
      <Box textAlign="center" className="row">
        {internalTimeInSec !== 0 ? (
          <>
            <Button
              marginRight={3}
              size="lg"
              bg="black"
              color={color[colorMode]}
              variantColor="green"
              onClick={toggleTimer}
            >
              {isActive ? "Pause" : "Start"}
            </Button>
            <Button
              marginLeft={3}
              size="sm"
              bg="black"
              color={color[colorMode]}
              variantColor="red"
              onClick={quitPractice}
            >
              I Quit
            </Button>
          </>
        ) : (
          <BackButton viewTitle="All Practices" toWhere="/all-practices" />
        )}
      </Box>
    </Grid>
  );
}

const mapReduxStateToProps = ({ practiceDetails }) => {
  //get necessary data
  const poseList = getPoseList(practiceDetails);
  const poseTimes = getPoseTimes(practiceDetails);
  const totalTime = getTotalPracticeTime(poseTimes);
  const arrOfInvertedPoseTimes = invertPoseTimes(totalTime, poseTimes);

  console.log(arrOfInvertedPoseTimes);

  return {
    total_time: totalTime,
    timesToRingBellArr: arrOfInvertedPoseTimes,
    poseList: poseList,
  };
};

// HELPER FUNCTIONS FOR MANIPULATING STORE
const getPoseTimes = (arrOfCurrentPracticeObjs) => {
  return arrOfCurrentPracticeObjs.map((poseObj) => {
    return poseObj.pose_time;
  });
};

const getPoseList = (arrOfCurrentPracticeObjs) => {
  return arrOfCurrentPracticeObjs.map((poseObj) => {
    return poseObj.pose_name;
  });
};

const invertPoseTimes = (totalTime, arrOfPoseTimes) => {
  // declare accumulator and array of inverse pose times
  // this is for proper calling of the bell to signal the next pose
  // ex, First pose starts at the starting time of the practice (ie, the TOTAL_TIME)
  // The second pose starts at the TOTAL_TIME - DURATION_OF_FIRST_POSE

  let inversePoseTimesArr = [totalTime];
  let accumulator = arrOfPoseTimes[0];

  for (let i = 1; i < arrOfPoseTimes.length; i++) {
    const element = arrOfPoseTimes[i];
    const inversePoseTime = totalTime - accumulator;
    inversePoseTimesArr.push(inversePoseTime);
    accumulator += element;
  }
  return inversePoseTimesArr;
};

const getTotalPracticeTime = (arrofPoseTimes) => {
  return arrofPoseTimes.reduce((accumulator, time) => {
    return accumulator + time;
  }, 0);
};

export default connect(mapReduxStateToProps)(Timer);
