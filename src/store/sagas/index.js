import { all } from "redux-saga/effects";
import moviesSagas from './movies/index'
import authSagas from './auth/index'

export default function* watchAll() {
  yield all([
    ...authSagas,
    ...moviesSagas

  ]);
}
