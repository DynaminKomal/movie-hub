import { call, put, takeLatest } from "redux-saga/effects";
import { loginAPI } from "../../../services/auth/index"
import { login, LOGIN } from "../../actions/auth/login.action"
import { saveAuthToken, storeInLocalStorage } from "../../../utils/localstorage";

function* handleLogin(action) {
    try {
        const { data: resData } = yield call(loginAPI.postLogin, action.payload);
        const data = resData?.data;
        if (resData.status === "success") {
            yield put(login.success({
                status: resData?.status,
                message: resData?.message,
                data: data?.data,
                statusCode: resData?.statusCode
            }));
            //storing the data in localstore after login apin success
            storeInLocalStorage.storeFirstName(data.data.firstName);
            storeInLocalStorage.storeEmail(data.data.email);
            storeInLocalStorage.storeProfileImage(data.data.profileImage);
            saveAuthToken(data.token);
        } else {
            console.log("call in else")
            yield put(login.failure({
                status: resData?.status,
                message: resData?.message,
                data: data,
                statusCode: resData?.statusCode
            }));
        }

    } catch (e) {
        const { data: resData } = e
        yield put(login.failure({
            status: resData?.status,
            message: resData?.message,
            data: resData?.data?.data,
            statusCode: resData?.statusCode
        }));
    }
}

function* loginSaga() {
    yield takeLatest(LOGIN.REQUEST, handleLogin);
}

export default loginSaga;
