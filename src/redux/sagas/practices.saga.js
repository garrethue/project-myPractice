import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchPractices(action) {
  try {
    const response = yield axios.get("/api/practices/all/");
    yield put({ type: "SET_PRACTICES", payload: response.data });
    yield put({ type: "NOT_LOADING" });
  } catch (error) {
    console.error(error);
  }
}

function* fetchPracticesSaga() {
  yield takeEvery("FETCH_PRACTICES", fetchPractices);
}

export default fetchPracticesSaga;
