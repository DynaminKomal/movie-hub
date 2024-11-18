import { all } from "redux-saga/effects";
import moviesSagas from './movies/index'

export default function* watchAll() {
  yield all([
    ...moviesSagas
  ]);
}
