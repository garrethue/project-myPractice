import axios from "axios";
import { takeEvery } from "redux-saga/effects";

function* fetchPractices(action) {
  try {
    console.log("here i am!");
    const response = yield axios.get("/api/practices/all-for-user/");
    console.log(response);
    //yield put({ type: 'SET_MOVIES_AND_GENRES', payload: response.data });
  } catch (error) {
    console.error(error);
  }
}

function* fetchPracticesSaga() {
  yield takeEvery("FETCH_PRACTICES", fetchPractices);
}

export default fetchPracticesSaga;
