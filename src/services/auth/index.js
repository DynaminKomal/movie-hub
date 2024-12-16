import { ApiEndpoints } from "../../constants/api/auth";
import axiosInstance from "../interceptor";

export const loginAPI = {
    postLogin: (data) => {
        return axiosInstance.post(ApiEndpoints.login.url, data);
    },
}

export const forgetPasswordAPI = {
    postForgetPassword: (data) => {
        return axiosInstance.post(ApiEndpoints.forgetPassword.url, data);
    },
}