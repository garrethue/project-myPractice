import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchAvailablePoses(action) {
  try {
    const response = yield axios.get("api/poses/all");
    yield put({ type: "SET_POSES", payload: response.data });
  } catch (error) {
    console.error(error);
  }
}

function* fetchAvailablePosesSaga() {
  yield takeEvery("FETCH_POSES", fetchAvailablePoses);
}

export default fetchAvailablePosesSaga;
