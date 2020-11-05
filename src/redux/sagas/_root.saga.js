import { all } from "redux-saga/effects";
import loginSaga from "./login.saga";
import registrationSaga from "./registration.saga";
import userSaga from "./user.saga";
import fetchPracticesSaga from "./practices.saga";
import fetchPracticeDetails from "./practiceDetails.saga";
import deleteAPracticeSaga from "./deletePractice.saga";
import fetchAvailablePosesSaga from "./poses.saga";

// rootSaga is the primary saga.
// bundles up all of the other sagas so our project can use them.
// this is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user

export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    fetchPracticesSaga(),
    fetchPracticeDetails(),
    deleteAPracticeSaga(),
    fetchAvailablePosesSaga(),
  ]);
}
