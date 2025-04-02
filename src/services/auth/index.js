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

export const resetTokenAPI = {
    patchResetToken: (data) => {
        return axiosInstance.patch(ApiEndpoints.resetToken.url, data);
    },
}

export const signUpdAPI = {
    postSignup: (data) => {
        return axiosInstance.post(ApiEndpoints.signup.url, data);
    },
}

export const validateCodeAPI = {
    postValidateCode: (data) => {
        console.log("data", data)
        return axiosInstance.post(ApiEndpoints.validateCode.url, data);
    },
}