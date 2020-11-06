import { combineReducers } from "redux";
import errors from "./errors.reducer";
import user from "./user.reducer";
import practices from "./practices.reducer";
import practiceDetails from "./practiceDetails.reducer";
import poses from "./poses.reducer";
import isLoading from "./isLoading.reducer";
import isAtTimer from "./isAtTimer.reducer";

// rootReducer is the primary reducer for our entire project
// it bundles up all of the other reducers so our project can use them.
// this is imported in index.js as rootSaga

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  practices,
  practiceDetails,
  poses,
  isLoading,
  isAtTimer,
});

export default rootReducer;
