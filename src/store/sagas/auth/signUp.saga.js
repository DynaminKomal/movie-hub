import { call, put, takeLatest } from "redux-saga/effects";
import { signUpdAPI } from "../../../services/auth/index"
import { signUp, SIGNUP } from "../../actions/auth/signup.action"

function* handleSignup(action) {
    try {
        const { data: resData } = yield call(signUpdAPI.postSignup, action.payload);
        const data = resData?.data;
        yield put(signUp.success({
            status: resData?.status,
            message: resData?.message,
            data: data?.data,
            statusCode: resData?.statusCode
        }));

    } catch (e) {
        const { data: resData } = e
        yield put(signUp.failure({
            status: resData?.status,
            message: resData?.message,
            data: resData?.data?.data,
            statusCode: resData?.statusCode
        }));
    }
}

function* signupSaga() {
    yield takeLatest(SIGNUP.REQUEST, handleSignup);
}

export default signupSaga;
