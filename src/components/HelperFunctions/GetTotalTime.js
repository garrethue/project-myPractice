const getTotalTime = (practiceDetailsReducer) => {
  return practiceDetailsReducer.reduce((sum, poseObj) => {
    return sum + poseObj.pose_time; //return total seconds
  }, 0);
};

export default getTotalTime;
