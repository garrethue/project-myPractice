const getTotalTime = (practiceDetailsReducer) => {
  return practiceDetailsReducer.reduce((sum, poseObj) => {
    return sum + Number(poseObj.pose_time); // wrap poseObj.pose_time with Number() as insurance
  }, 0); // return total seconds
};

export default getTotalTime;
