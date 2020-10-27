const practiceDetails = (state = [], action) => {
  switch (action.type) {
    case "GET_PRACTICE_DETAILS": //this loads in the details of a practice for a given user
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
export default practiceDetails;
