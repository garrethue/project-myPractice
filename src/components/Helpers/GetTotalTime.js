const getTotalTime = (practiceDetails, boolIsCreateOrEditComponent) => {
  if (boolIsCreateOrEditComponent) {
    //if the calling code is from the Create or Edit component
    return practiceDetails.reduce((sum, poseObj) => {
      return sum + Number(poseObj.time); //return total seconds
    }, 0);
  }
  return practiceDetails.reduce((sum, poseObj) => {
    return sum + Number(poseObj.pose_time); // wrap poseObj.pose_time with Number() as insurance
  }, 0); // return total seconds
};
export default getTotalTime;
