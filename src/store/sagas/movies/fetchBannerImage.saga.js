import { call, put, takeLatest } from "redux-saga/effects";
import { movieAPI } from "../../../services/movies/index"
import { fetchBanner, FETCH_BANNER } from "../../actions/movies/fetchBanner.action"

function* handleGetBannerImage() {
    try {
        const { data: resData } = yield call(movieAPI.getBannerDashboard);  
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
