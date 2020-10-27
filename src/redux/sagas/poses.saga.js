import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchAvailablePoses(action) {
  //   try {
  //     const response = yield axios.get(`/api/poses`);
  //     yield put({ type: "GET_PRACTICE_DETAILS", payload: response.data });
  //   } catch (error) {
  //     console.error(error);
  //   }
}

function* fetchAvailablePosesSaga() {
  yield takeEvery("FETCH_AVAILABLE_POSES", fetchAvailablePoses);
}

export default fetchAvailablePosesSaga;
