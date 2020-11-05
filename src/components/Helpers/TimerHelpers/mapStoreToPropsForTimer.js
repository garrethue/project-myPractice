const mapStoreToPropsForTimer = ({ user, practiceDetails }) => {
  //get necessary data
  const poseList = getPoseList(practiceDetails);
  const poseTimes = getPoseTimes(practiceDetails);
  const totalTime = getTotalPracticeTime(poseTimes);
  const arrOfInvertedPoseTimes = invertPoseTimes(totalTime, poseTimes);
  const arrPromptTimes = offSetPoseTimes(arrOfInvertedPoseTimes);

  return {
    user,
    total_time: totalTime,
    timesToRingBellArr: arrOfInvertedPoseTimes,
    poseList: poseList,
    timesToPromptUser: arrPromptTimes,
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

const offSetPoseTimes = (invertedArrOfPoseTimes) => {
  return invertedArrOfPoseTimes.map((time) => time + 12);
};

export default mapStoreToPropsForTimer;
