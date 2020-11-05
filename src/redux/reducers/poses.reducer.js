// this reducer holds all of the available poses a user can choose from when creating or editing a practice
const allPoses = (state = [], action) => {
  switch (action.type) {
    case "SET_POSES":
      return action.payload;
    default:
      return state;
  }
};

export default allPoses;
