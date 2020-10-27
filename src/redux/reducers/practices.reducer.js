const allPracticersForUser = (state = [], action) => {
  switch (action.type) {
    case "SET_PRACTICES": //this loads in all the practices for a given user
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
export default allPracticersForUser;
