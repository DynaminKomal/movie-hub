import { ApiEndpoints } from "../../constants/api/auth";
import axiosInstance from "../interceptor";

export const loginAPI = {
    postLogin: () => {
        return axiosInstance.post(ApiEndpoints.login.url);
    },
}