import { ApiEndpoints } from "../../constants/api/user";
import axiosInstance from "../interceptor";

export const userAPI = {
    getBannerDashboard: () => {
        return axiosInstance.get(ApiEndpoints.getBanner.url);
    },
}