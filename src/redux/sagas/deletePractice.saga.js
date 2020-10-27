import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* deletePractice(action) {
  const practice_id = action.payload;
  try {
    const response = yield axios.delete(`/api/practices/delete/${practice_id}`);
    yield put({ type: "FETCH_PRACTICES" });
  } catch (error) {
    console.error(error);
  }
}

function* deleteAPracticeSaga() {
  yield takeEvery("DELETE_A_PRACTICE", deletePractice);
}

export default deleteAPracticeSaga;
