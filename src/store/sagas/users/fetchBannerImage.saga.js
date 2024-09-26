import { call, put, takeLatest } from "redux-saga/effects";
import { userAPI } from "../../../services/users/index"
import { fetchBanner, FETCH_BANNER } from "../../actions/user/fetchBanner.action"

function* handleGetBannerImage() {
    try {
        const { data: resData } = yield call(userAPI.getBannerDashboard);  
        yield put(fetchBanner.success({
            status: resData?.status,
            message: resData?.message,
            data: resData?.data
        }));
    } catch (e) {
        const { data: resData } = e
        yield put(fetchBanner.failure({
            status: resData?.status,
            message: resData?.message,
            data: resData?.data
        }));
    }
}

function* fetchBannerImageSaga() {
    yield takeLatest(FETCH_BANNER.REQUEST, handleGetBannerImage);
}

export default fetchBannerImageSaga;
