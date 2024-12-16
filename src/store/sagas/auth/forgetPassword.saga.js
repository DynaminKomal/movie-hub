import { call, put, takeLatest } from "redux-saga/effects";
import { forgetPasswordAPI } from "../../../services/auth/index"
import { forgetPassword, FORGET_PASSWORD } from "../../actions/auth/forgetPassword.action"

function* handleForgetPassword(action) {
    try {
        const { data: resData } = yield call(forgetPasswordAPI.postForgetPassword, action.payload);
        const data = resData?.data;
        yield put(forgetPassword.success({
            status: resData?.status,
            message: resData?.message,
            data: data?.data,
            statusCode: resData?.statusCode
        }));

    } catch (e) {
        const { data: resData } = e
        yield put(forgetPassword.failure({
            status: resData?.status,
            message: resData?.message,
            data: resData?.data?.data,
            statusCode: resData?.statusCode
        }));
    }
}

function* forgetPasswordSaga() {
    yield takeLatest(FORGET_PASSWORD.REQUEST, handleForgetPassword);
}

export default forgetPasswordSaga;
