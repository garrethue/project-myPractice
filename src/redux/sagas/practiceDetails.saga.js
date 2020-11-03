import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchPracticeDetails(action) {
  const practice_id = action.payload;
  try {
    const response = yield axios.get(`/api/practices/details/${practice_id}`);
    yield put({ type: "GET_PRACTICE_DETAILS", payload: response.data });
    yield put({ type: "NOT_LOADING" }); //removes skeleton effect
  } catch (error) {
    console.error(error);
  }
}

function* fetchPracticeDetailsSaga() {
  yield takeEvery("FETCH_PRACTICE_DETAILS", fetchPracticeDetails);
}

export default fetchPracticeDetailsSaga;
