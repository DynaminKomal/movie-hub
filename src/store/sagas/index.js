import { all } from "redux-saga/effects";
import userSagas from './users/index'

export default function* watchAll() {
  yield all([
    ...userSagas
  ]);
}
