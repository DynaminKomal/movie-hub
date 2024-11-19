import { call, put, takeLatest } from "redux-saga/effects";
import { loginAPI } from "../../../services/auth/index"
import { login, LOGIN } from "../../actions/auth/login.action"

function* handleLogin(action) {
    try {
        const { data: resData } = yield call(loginAPI.postLogin, action.payload);
        yield put(login.success({
            status: resData?.status,
            message: resData?.message,
            data: resData?.data,
            statusCode: resData?.statusCode
        }));
    } catch (e) {
        const { data: resData } = e
        yield put(login.failure({
            status: resData?.status,
            message: resData?.message,
            data: resData?.data,
            statusCode: resData?.statusCode
        }));
    }
}

function* loginSaga() {
    yield takeLatest(LOGIN.REQUEST, handleLogin);
}

export default loginSaga;
