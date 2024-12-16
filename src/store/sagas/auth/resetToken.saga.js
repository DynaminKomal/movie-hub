import { call, put, takeLatest } from "redux-saga/effects";
import { resetTokenAPI } from "../../../services/auth/index"
import { resetToken, RESET_TOKEN } from "../../actions/auth/resetToken.action"
import { saveAuthToken, storeInLocalStorage } from "../../../utils/localstorage";

function* handleResetToken(action) {
    try {
        const { data: resData } = yield call(resetTokenAPI.patchResetToken, action.payload);
        const data = resData?.data;
        if (resData.status === "success") {
            yield put(resetToken.success({
                status: resData?.status,
                message: resData?.message,
                data: data?.data,
                statusCode: resData?.statusCode
            }));
            console.log("data.data", data.data)
            //storing the data in localstore after login apin success
            storeInLocalStorage.storeFirstName(data.data.firstName);
            storeInLocalStorage.storeEmail(data.data.email);
            storeInLocalStorage.storeProfileImage(data.data.profileImage);
            saveAuthToken(data.token);
        } else {
            yield put(resetToken.failure({
                status: resData?.status,
                message: resData?.message,
                data: data,
                statusCode: resData?.statusCode
            }));
        }

    } catch (e) {
        const { data: resData } = e
        yield put(resetToken.failure({
            status: resData?.status,
            message: resData?.message,
            data: resData?.data?.data,
            statusCode: resData?.statusCode
        }));
    }
}

function* resetTokenSaga() {
    yield takeLatest(RESET_TOKEN.REQUEST, handleResetToken);
}

export default resetTokenSaga;
