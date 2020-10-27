const allPoses = (state = [], action) => {
  switch (action.type) {
    case "SET_POSES":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
export default allPoses;
