import { call, put, takeLatest } from "redux-saga/effects";
import { validateCodeAPI } from "../../../services/auth/index"
import { validateCode, VALIDATE_CODE } from "../../actions/auth/auth.actions"

function* handleValidateCode(action) {
    try {
        const { data: resData } = yield call(validateCodeAPI.postValidateCode, action.payload);
        const data = resData?.data;
        yield put(validateCode.success({
            status: resData?.status,
            message: resData?.message,
            data: data?.data,
            statusCode: resData?.statusCode
        }));

    } catch (e) {
        const { data: resData } = e
        yield put(validateCode.failure({
            status: resData?.status,
            message: resData?.message,
            data: resData?.data?.data,
            statusCode: resData?.statusCode
        }));
    }
}

function* validateCodeSaga() {
    yield takeLatest(VALIDATE_CODE.REQUEST, handleValidateCode);
}

export default validateCodeSaga;
