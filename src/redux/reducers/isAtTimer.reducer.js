// this reducer signals whether or not the application is at the timer component
const isAtTimer = (state = false, action) => {
  switch (action.type) {
    case "AT_TIMER":
      return true;
    case "NOT_AT_TIMER":
      return false;
    default:
      return state;
  }
};

export default isAtTimer;
