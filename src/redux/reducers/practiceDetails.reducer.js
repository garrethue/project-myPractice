// this reducer holds all of the details of a given practice for a given user
const practiceDetails = (state = [], action) => {
  switch (action.type) {
    case "GET_PRACTICE_DETAILS":
      return action.payload;
    default:
      return state;
  }
};

export default practiceDetails;
