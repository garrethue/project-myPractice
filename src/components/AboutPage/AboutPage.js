import React, { useState, useEffect } from "react";
import { Howl } from "howler";
import { connect } from "react-redux";
import axios from "axios";

function Timer(props) {
  const [internalTimeInSec, setInternalTime] = useState(30); //props.total_time garret: this should come from the database --> TOTAL TIME IN SECONDS!
  const [isActive, setIsActive] = useState(false); //currently timing (isActive) or is paused (!isActive)
  const [displayTime, setDisplayTime] = useState(formatTime()); //this piece of state is for formatting the timer
  const [bell] = useState(
    new Howl({
      src: [
        "./sounds/bell-1.wav",
        "./sounds/bell-1.mp3",
        //PATH: "/Users/garret.larson/Desktop/node-projects/yogarretsapp/server/sounds/output.mp3",
      ],
    })
  );
  const [timesToRingBell, setTimesToRingBell] = useState(
    props.timesToRingBellArr
  );
  const [poseList, setPoseList] = useState(props.poseList); //bring in names of poses
  const [currentPose, setCurrentPose] = useState(props.poseList[0]);
  const [poseListIndex, setPoseListIndex] = useState(1); //this allows one to iterate through the array to display the correct counter

  function toggleTimer() {
    setIsActive(!isActive);
  }

  function stopTimer() {
    //implement this as a STOP practice
    setIsActive(false);
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
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // if hours > 0, show it, if the minutes are > 0, show them, else only show the seconds
    let timeToDisplay = `${seconds}`;
    //hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
    if (hours > 0) {
      timeToDisplay = `${hours}:${minutes}:${seconds}`;
    } else if (minutes > 0) {
      timeToDisplay = `${minutes}:${seconds}`;
    }

    return timeToDisplay;
  }

  useEffect(() => {
    //getAudio(); //Garret: anytime this is called, the client makes a req to the server for the audio file!
    console.log(poseList);
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setInternalTime((internalTimeInSec) => internalTimeInSec - 1);
      }, 1000); //the 1000 defines how long each interval should be

      setDisplayTime(formatTime()); //where formatting time occurs on DOM
      if (internalTimeInSec === 0) {
        //Practice is over!
        bell.play();
        stopTimer();
      } else if (timesToRingBell.includes(internalTimeInSec)) {
        bell.play();
        setCurrentPose(poseList[poseListIndex]);
        setPoseListIndex((poseListIndex) => poseListIndex + 1);
      }
    } else if (!isActive && internalTimeInSec !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, internalTimeInSec]);

  return (
    <div className="app">
      <div className="newTime">Timer: {displayTime}</div>
      <div className="currentPose">
        {isActive && `currentPose: ${currentPose}`}
      </div>
      <div className="row">
        <button
          className={`button button-primary button-primary-${
            isActive ? "active" : "inactive"
          }`}
          onClick={toggleTimer}
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button className="button" onClick={stopTimer}>
          Stop
        </button>
      </div>
    </div>
  );
}

const mapReduxStateToProps = (store) => {
  //get necessary data

  let test_data = [
    {
      pose_name: "triangle pose",
      pose_time: 20,
    },
    {
      pose_name: "tree pose",
      pose_time: 20,
    },
    {
      pose_name: "downward dog",
      pose_time: 10,
    },
    {
      pose_name: "corpse pose",
      pose_time: 10,
    },
  ];
  const poseTimes = getPoseTimes(test_data); //GAR --> should be store.currentPractice
  const TOTAL_TIME = getTotalPracticeTime(poseTimes);
  const arrOfInvertedPoseTimes = invertPoseTimes(TOTAL_TIME, poseTimes);
  const poseList = getPoseList(test_data);

  return {
    total_time: TOTAL_TIME,
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
