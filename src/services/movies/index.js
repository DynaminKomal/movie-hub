import { ApiEndpoints } from "../../constants/api/movie";
import axiosInstance from "../interceptor";

export const movieAPI = {
    getBannerDashboard: () => {
        return axiosInstance.get(ApiEndpoints.getBanner.url);
    },
}