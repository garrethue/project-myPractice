function* fetchPracticesSaga(action) {
  try {
    const response = yield axios.get("/get-movies-and-genres/");
    console.log(response);
    //yield put({ type: 'SET_MOVIES_AND_GENRES', payload: response.data });
  } catch (error) {
    console.error(error);
  }
}
